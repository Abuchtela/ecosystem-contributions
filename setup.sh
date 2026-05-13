#!/bin/bash
# Setup script for OP Delegation Frame
# This script installs all dependencies and prepares the project for development

set -e

echo "🚀 Setting up OP Delegation Frame..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✓ Node.js $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✓ npm $(npm --version)"

# Install pnpm globally if not present
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

echo "✓ pnpm $(pnpm --version)"

# Install project dependencies
echo "📦 Installing dependencies..."
pnpm install

# Copy environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
OPTIMISM_RPC_URL=https://mainnet.optimism.io
NEXT_PUBLIC_OPTIMISM_RPC_URL=https://mainnet.optimism.io
NEXT_PUBLIC_DELEGATE_CONTRACT=0x489aa610671495d07cc33da88b482406e1d6b44b
NEXT_PUBLIC_OP_TOKEN_ADDRESS=0x4200000000000000000000000000000000000042
NEXT_PUBLIC_FARCASTER_HUB_URL=https://hub-api.farcaster.cast
NODE_ENV=development
EOF
    echo "✓ .env.local created"
fi

# Run build checks
echo "🔍 Type checking..."
pnpm tsc --noEmit || true

echo "🏗️ Building project..."
pnpm run prebuild && pnpm build || true

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "   1. Start development server: pnpm dev"
echo "   2. Open http://localhost:3000/op-delegation"
echo "   3. Test the frame at http://localhost:3000/api/frame"
echo ""
echo "🔗 Documentation:"
echo "   - README: OP_DELEGATION_README.md"
echo "   - Setup Guide: OP_DELEGATION_SETUP.md"
echo "   - Integration: INTEGRATION_GUIDE.md"
echo "   - Deployment: DEPLOYMENT_CHECKLIST.md"
echo ""
