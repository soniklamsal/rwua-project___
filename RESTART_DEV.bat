@echo off
echo Restarting development server...

REM Kill any running Node processes
taskkill /F /IM node.exe 2>nul

REM Remove .next directory
if exist .next (
    rmdir /s /q .next
)

echo Starting dev server...
npm run dev
