@echo off
setlocal
cd /d "%~dp0"

set "LOCAL_NPM=%~dp0.tools\node-v24.15.0-win-x64\npm.cmd"

if exist "%LOCAL_NPM%" (
  set "NPM_CMD=%LOCAL_NPM%"
) else (
  set "NPM_CMD=npm"
)

"%NPM_CMD%" run build
pause
