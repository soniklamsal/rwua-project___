@echo off
echo Clearing Next.js cache and restarting...

REM Kill any running Node processes
taskkill /F /IM node.exe 2>nul

REM Remove .next directory
if exist .next (
    echo Removing .next directory...
    rmdir /s /q .next
)

REM Remove node_modules/.cache if it exists
if exist node_modules\.cache (
    echo Removing node_modules cache...
    rmdir /s /q node_modules\.cache
)

echo Cache cleared!
echo.
echo Now run: npm run dev
pause
