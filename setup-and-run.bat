@echo off
setlocal
cd /d "%~dp0"

set "LOCAL_NPM=%~dp0.tools\node-v24.15.0-win-x64\npm.cmd"
set "LOCAL_NODE=%~dp0.tools\node-v24.15.0-win-x64\node.exe"
set "LOCAL_VITE=%~dp0node_modules\vite\bin\vite.js"

if exist "%LOCAL_NPM%" (
  set "NPM_CMD=%LOCAL_NPM%"
) else (
  set "NPM_CMD=npm"
)

if not exist "node_modules" (
  echo Installing dependencies...
  "%NPM_CMD%" install
)

echo Starting HRV Stress Monitoring Product Demo...
echo.
echo Open this address in your browser:
echo http://127.0.0.1:5173/
echo.

if exist "%LOCAL_NODE%" if exist "%LOCAL_VITE%" (
  "%LOCAL_NODE%" "%LOCAL_VITE%" --host 127.0.0.1
) else (
  "%NPM_CMD%" run dev -- --host 127.0.0.1
)

pause
