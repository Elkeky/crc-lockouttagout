@echo off
title CRC Lockout - Local Server
cd /d "%~dp0"
echo ============================================================
echo   Starting local server for CRC Lockout...
echo   Your browser will open automatically!
echo ============================================================
echo.
npm run dev -- --open
pause
