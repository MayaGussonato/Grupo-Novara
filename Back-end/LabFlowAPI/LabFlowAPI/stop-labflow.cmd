@echo off
REM Encerra qualquer instancia da LabFlowAPI que esteja segurando bin\Debug\net10.0\LabFlowAPI.exe
REM Uso: stop-labflow.cmd  (ou "stop-labflow.cmd & dotnet run")

taskkill /F /IM LabFlowAPI.exe >nul 2>&1
if errorlevel 1 (
    echo Nenhuma instancia da LabFlowAPI estava rodando.
) else (
    echo LabFlowAPI encerrada.
)

exit /b 0
