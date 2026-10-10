@echo off
title AI Native - The Experience - Bratislava
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1" -StartPath "/v2/?present=1"
if errorlevel 1 (
  echo.
  echo The local server could not start. See README_OFFLINE.md.
  pause
)
