@echo off
chcp 65001 >nul 2>&1
title VNiDT Website - Cai dat
echo ============================================================
echo    VNiDT Website - Script Cai dat cho Windows Server 2019
echo ============================================================
echo.

:: Check admin rights
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [LOI] Vui long chay script nay voi quyen Administrator!
    echo       Click phai file install.bat ^> "Run as administrator"
    pause
    exit /b 1
)

:: Check Node.js
echo [1/5] Kiem tra Node.js...
where node >nul 2>&1
if %errorLevel% neq 0 (
    echo [LOI] Node.js chua duoc cai dat!
    echo.
    echo Huong dan:
    echo   1. Tai Node.js LTS tai: https://nodejs.org/
    echo   2. Cai dat voi default options
    echo   3. Khoi dong lai Command Prompt
    echo   4. Chay lai script nay
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo       Node.js %NODE_VERSION% - OK

:: Set installation directory
set INSTALL_DIR=C:\vnidt-website
echo.
echo [2/5] Tao thu muc cai dat: %INSTALL_DIR%

if exist "%INSTALL_DIR%" (
    echo       Thu muc da ton tai, se cap nhat...
) else (
    mkdir "%INSTALL_DIR%"
)

:: Copy files
echo.
echo [3/5] Sao chep files...

:: Copy backend dist
xcopy /E /I /Y "dist" "%INSTALL_DIR%\dist" >nul 2>&1
echo       - dist/ (backend compiled) - OK

:: Copy prisma
xcopy /E /I /Y "prisma" "%INSTALL_DIR%\prisma" >nul 2>&1
echo       - prisma/ (database schema) - OK

:: Copy public (frontend)
xcopy /E /I /Y "public" "%INSTALL_DIR%\public" >nul 2>&1
echo       - public/ (frontend website) - OK

:: Copy package files
copy /Y "package.json" "%INSTALL_DIR%\package.json" >nul 2>&1
copy /Y "package-lock.json" "%INSTALL_DIR%\package-lock.json" >nul 2>&1
echo       - package.json - OK

:: Copy ecosystem config
copy /Y "ecosystem.config.js" "%INSTALL_DIR%\ecosystem.config.js" >nul 2>&1
echo       - ecosystem.config.js - OK

:: Copy generated (Prisma client)
if exist "generated" (
    xcopy /E /I /Y "generated" "%INSTALL_DIR%\generated" >nul 2>&1
    echo       - generated/ (Prisma client) - OK
)

:: Setup .env
if not exist "%INSTALL_DIR%\.env" (
    copy /Y ".env.production" "%INSTALL_DIR%\.env" >nul 2>&1
    echo       - .env (cau hinh) - CREATED
    echo.
    echo [QUAN TRONG] Hay chinh sua file %INSTALL_DIR%\.env
    echo              de cap nhat mat khau email SMTP_PASS
) else (
    echo       - .env (cau hinh) - DA TON TAI, giu nguyen
)

:: Copy database if not exists
if not exist "%INSTALL_DIR%\dev.db" (
    if exist "dev.db" (
        copy /Y "dev.db" "%INSTALL_DIR%\dev.db" >nul 2>&1
        echo       - dev.db (database) - OK
    )
) else (
    echo       - dev.db (database) - DA TON TAI, giu nguyen
)

:: Install production dependencies
echo.
echo [4/5] Cai dat dependencies (chi production)...
echo       Dang cai dat, vui long cho...
cd /d "%INSTALL_DIR%"
call npm ci --omit=dev --ignore-scripts >nul 2>&1
if %errorLevel% neq 0 (
    echo       Dang thu lai voi npm install...
    call npm install --omit=dev >nul 2>&1
)

:: Generate Prisma client
echo       Tao Prisma client...
call npx prisma generate >nul 2>&1
echo       Dependencies - OK

:: Copy scripts
echo.
echo [5/5] Tao scripts dieu khien...

:: Create start script
(
echo @echo off
echo chcp 65001 ^>nul 2^>^&1
echo title VNiDT Website - Dang chay
echo echo ============================================================
echo echo    VNiDT Website Server
echo echo ============================================================
echo echo.
echo echo Dang khoi dong server tren port 3000...
echo echo Nhan Ctrl+C de dung server
echo echo.
echo cd /d "%%~dp0"
echo node dist\src\main.js
echo pause
) > "%INSTALL_DIR%\start.bat"
echo       - start.bat - OK

:: Create start-background script using PowerShell
(
echo @echo off
echo chcp 65001 ^>nul 2^>^&1
echo title VNiDT - Khoi dong Background
echo echo ============================================================
echo echo    VNiDT Website - Khoi dong Background
echo echo ============================================================
echo echo.
echo cd /d "%%~dp0"
echo echo Dang khoi dong server nen...
echo start /B node dist\src\main.js ^> logs\server.log 2^>^&1
echo echo.
echo echo [OK] Server da khoi dong o background!
echo echo      URL: http://localhost:3000
echo echo      Log: %%~dp0logs\server.log
echo echo.
echo echo De dung server, chay: stop.bat
echo timeout /t 5
) > "%INSTALL_DIR%\start-background.bat"
echo       - start-background.bat - OK

:: Create stop script
(
echo @echo off
echo chcp 65001 ^>nul 2^>^&1
echo echo Dang dung VNiDT server...
echo for /f "tokens=5" %%%%a in ('netstat -ano ^^^| findstr ":3000" ^^^| findstr "LISTENING"') do (
echo     echo Dung process PID: %%%%a
echo     taskkill /F /PID %%%%a ^>nul 2^>^&1
echo ^)
echo echo [OK] Server da dung.
echo timeout /t 3
) > "%INSTALL_DIR%\stop.bat"
echo       - stop.bat - OK

:: Create status script
(
echo @echo off
echo chcp 65001 ^>nul 2^>^&1
echo echo ============================================================
echo echo    VNiDT Website - Trang thai
echo echo ============================================================
echo echo.
echo netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"
echo if %%errorlevel%% equ 0 (
echo     echo.
echo     echo [OK] Server DANG CHAY tren port 3000
echo     echo      Truy cap: http://localhost:3000
echo ^) else (
echo     echo [CANH BAO] Server KHONG CHAY
echo     echo            Chay start.bat de khoi dong
echo ^)
echo echo.
echo pause
) > "%INSTALL_DIR%\status.bat"
echo       - status.bat - OK

:: Create logs directory
if not exist "%INSTALL_DIR%\logs" mkdir "%INSTALL_DIR%\logs"

:: Create Windows Service installer script
(
echo @echo off
echo chcp 65001 ^>nul 2^>^&1
echo title VNiDT - Cai dat Windows Service
echo echo ============================================================
echo echo    VNiDT Website - Cai dat Windows Service
echo echo ============================================================
echo echo.
echo net session ^>nul 2^>^&1
echo if %%errorLevel%% neq 0 (
echo     echo [LOI] Can quyen Administrator!
echo     pause
echo     exit /b 1
echo ^)
echo echo Dang cai dat node-windows...
echo cd /d "%%~dp0"
echo call npm install node-windows --save ^>nul 2^>^&1
echo echo Dang tao Windows Service...
echo node install-service.js
echo echo.
echo echo [OK] VNiDT Website da duoc cai dat nhu Windows Service!
echo echo      Service se tu dong chay khi khoi dong may chu.
echo echo.
echo echo Quan ly service:
echo echo   - Mo "Services" (services.msc^)
echo echo   - Tim "VNiDT Website"
echo echo   - Start / Stop / Restart
echo echo.
echo pause
) > "%INSTALL_DIR%\install-service.bat"
echo       - install-service.bat - OK

echo.
echo ============================================================
echo    CAI DAT HOAN TAT!
echo ============================================================
echo.
echo Thu muc cai dat: %INSTALL_DIR%
echo.
echo Cac buoc tiep theo:
echo   1. Chinh sua file: %INSTALL_DIR%\.env
echo      - SMTP_PASS: Nhap Google App Password
echo      - PORT: Thay doi port neu can (mac dinh: 3000)
echo.
echo   2. Khoi dong server:
echo      - Chay: %INSTALL_DIR%\start.bat
echo      - Hoac: %INSTALL_DIR%\start-background.bat
echo.
echo   3. Truy cap website: http://localhost:3000
echo   4. Trang admin: http://localhost:3000/admin.html
echo   5. API Docs: http://localhost:3000/api/docs
echo.
echo   6. (Tuy chon) Cai dat Windows Service:
echo      - Chay: %INSTALL_DIR%\install-service.bat
echo      - Server se tu dong chay khi khoi dong may chu
echo.
pause
