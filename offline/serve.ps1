param([int]$Port = 8765)

$ErrorActionPreference = 'Stop'
$root = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot 'app'))
$listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, $Port)
$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.js'   = 'text/javascript; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.json' = 'application/json; charset=utf-8'
  '.svg'  = 'image/svg+xml'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.mp4'  = 'video/mp4'
  '.ico'  = 'image/x-icon'
}

try {
  $listener.Start()
  $url = "http://127.0.0.1:$Port/?present=1"
  Write-Host "AI Native is available at $url"
  Write-Host 'Keep this window open. Press Ctrl+C here to stop.'
  Start-Process $url

  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $reader = [IO.StreamReader]::new($stream, [Text.Encoding]::ASCII, $false, 1024, $true)
      $request = $reader.ReadLine()
      while (($line = $reader.ReadLine()) -ne '') {
        if ($null -eq $line) { break }
      }

      $requestPath = '/'
      if ($request -match '^(GET|HEAD) ([^ ]+) HTTP/') { $requestPath = $Matches[2] }
      $requestPath = [Uri]::UnescapeDataString(($requestPath -split '\?')[0]).TrimStart('/')
      if ([string]::IsNullOrWhiteSpace($requestPath)) { $requestPath = 'index.html' }

      $file = [IO.Path]::GetFullPath((Join-Path $root $requestPath.Replace('/', [IO.Path]::DirectorySeparatorChar)))
      if (-not $file.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path $file -PathType Leaf)) {
        $status = '404 Not Found'
        $body = [Text.Encoding]::UTF8.GetBytes('Not found')
        $contentType = 'text/plain; charset=utf-8'
      } else {
        $status = '200 OK'
        $body = [IO.File]::ReadAllBytes($file)
        $extension = [IO.Path]::GetExtension($file).ToLowerInvariant()
        if ($mime.ContainsKey($extension)) { $contentType = $mime[$extension] } else { $contentType = 'application/octet-stream' }
      }

      $headers = "HTTP/1.1 $status`r`nContent-Type: $contentType`r`nContent-Length: $($body.Length)`r`nCache-Control: no-cache`r`nConnection: close`r`n`r`n"
      $headerBytes = [Text.Encoding]::ASCII.GetBytes($headers)
      $stream.Write($headerBytes, 0, $headerBytes.Length)
      if ($request -notmatch '^HEAD ') { $stream.Write($body, 0, $body.Length) }
      $stream.Flush()
    } finally {
      $client.Close()
    }
  }
} catch {
  Write-Error $_
  exit 1
} finally {
  $listener.Stop()
}
