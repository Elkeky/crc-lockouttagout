@echo off
title Push CRC Lockout to GitHub
cd /d "%~dp0"
echo ============================================================
echo   Uploading CRC Lockout project to GitHub...
echo ============================================================
echo.
git push origin main --force
echo.
echo ============================================================
echo   Done! Check the message above.
echo   If it asked for login, complete it in your browser.
echo ============================================================
pause
