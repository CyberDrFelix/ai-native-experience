# AI Native — Offline Dell Laptop Instructions

## Copy and extract

1. Copy `AI-Native-Experience-Offline.zip` to the Dell laptop.
2. Right-click the ZIP, choose **Extract All**, and extract it to a local folder such as `C:\AI-Native-Experience-Offline`.
3. Do not run the launcher from inside the ZIP preview.

## Start the experience

1. Open the extracted folder.
2. Double-click `START_AI_NATIVE.cmd`.
3. Keep the command window open. The default browser should open automatically at `http://127.0.0.1:8765/?present=1`.
4. Click once on the Digital Felix play control when Scene 01 reaches the welcome video.

No internet connection, Node.js installation, administrator access, or external service is required. Windows PowerShell, included with supported Windows installations, serves the files only to this laptop through `127.0.0.1`.

## Presentation mode

- The launch URL enters presentation mode automatically.
- Press `F` to request browser fullscreen.
- If browser chrome remains visible, press `F11` as the browser fallback.

## Stop

Return to the command window and press `Ctrl+C`, then close the window.

## If the browser does not open

1. Leave the command window running.
2. Open Microsoft Edge or Chrome manually.
3. Enter `http://127.0.0.1:8765/?present=1` in the address bar.

If port 8765 is already in use, open PowerShell in the extracted folder and run:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\serve.ps1 -Port 8877
```

Then open `http://127.0.0.1:8877/?present=1`.

If company policy blocks `.cmd` files, right-click `serve.ps1`, choose **Run with PowerShell**, and use the same browser address. If PowerShell itself is blocked by corporate policy, contact workplace IT before rehearsal; do not bypass the policy.
