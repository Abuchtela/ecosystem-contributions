@echo off
REM Setup script for OP Delegation Frame (Windows)
REM This script installs all dependencies and prepares the project for development

setlocal enabledelayedexpansion

echo.
echo 🚀 Setting up OP Delegation Frame...
echo.

REM Check Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js %NODE_VERSION%

REM Check npm
where npm >nul 2>nul
if errorlevel 1 (
    echo ❌ npm is not installed
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✓ npm %NPM_VERSION%

REM Install pnpm globally if not present
where pnpm >nul 2>nul
if errorlevel 1 (
    echo 📦 Installing pnpm...
    call npm install -g pnpm
)

for /f "tokens=*" %%i in ('pnpm --version') do set PNPM_VERSION=%%i
echo ✓ pnpm %PNPM_VERSION%

REM Install project dependencies
echo 📦 Installing dependencies...
call pnpm install

REM Copy environment file if it doesn't exist
if not exist .env.local (
    echo 📝 Creating .env.local file...
    (
        echo OPTIMISM_RPC_URL=https://mainnet.optimism.io
        echo NEXT_PUBLIC_OPTIMISM_RPC_URL=https://mainnet.optimism.io
        echo NEXT_PUBLIC_DELEGATE_CONTRACT=0x489aa610671495d07cc33da88b482406e1d6b44b
        echo NEXT_PUBLIC_OP_TOKEN_ADDRESS=0x4200000000000000000000000000000000000042
        echo NEXT_PUBLIC_FARCASTER_HUB_URL=https://hub-api.farcaster.cast
        echo NODE_ENV=development
    ) > .env.local
    echo ✓ .env.local created
)

REM Run build checks
echo 🔍 Type checking...
call pnpm tsc --noEmit || true

echo 🏗️ Building project...
call pnpm run prebuild && pnpm build || true

echo.
echo ✅ Setup complete!
echo.
echo 📚 Next steps:
echo    1. Start development server: pnpm dev
echo    2. Open http://localhost:3000/op-delegation
echo    3. Test the frame at http://localhost:3000/api/frame
echo.
echo 🔗 Documentation:
echo    - README: OP_DELEGATION_README.md
echo    - Setup Guide: OP_DELEGATION_SETUP.md
echo    - Integration: INTEGRATION_GUIDE.md
echo    - Deployment: DEPLOYMENT_CHECKLIST.md
echo.

pause
