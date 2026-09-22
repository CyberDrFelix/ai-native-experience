@echo off
title AI Native - The Experience
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
if errorlevel 1 (
  echo.
  echo The local server could not start. See README_OFFLINE.md.
  pause
)
