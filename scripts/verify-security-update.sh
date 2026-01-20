#!/bin/bash
# Verification script for Next.js security update to 14.2.35
# This script verifies that the security fixes for CVE-2025-55182, CVE-2025-55183,
# CVE-2025-55184, and CVE-2025-67779 have been applied.

set -e

echo "=========================================="
echo "Next.js Security Update Verification"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check version
check_version() {
    local package=$1
    local min_version=$2
    local current_version=$(node -e "try { console.log(require('./node_modules/$package/package.json').version) } catch(e) { console.log('not-found') }")
    
    if [ "$current_version" = "not-found" ]; then
        echo -e "${RED}✗${NC} $package is not installed"
        return 1
    fi
    
    echo "  Current version: $current_version"
    
    # Simple version comparison for Next.js 14.2.x
    if [[ "$package" == "next" ]]; then
        if [[ "$current_version" == "14.2.35" ]] || [[ "$current_version" > "14.2.35" ]]; then
            echo -e "${GREEN}✓${NC} $package version is secure"
            return 0
        else
            echo -e "${RED}✗${NC} $package version is vulnerable. Please upgrade to 14.2.35 or higher"
            return 1
        fi
    fi
    
    echo -e "${GREEN}✓${NC} $package is installed"
    return 0
}

echo "1. Checking Next.js version..."
check_version "next" "14.2.35"
NEXT_CHECK=$?
echo ""

echo "2. Checking React version..."
check_version "react" "18.0.0"
REACT_CHECK=$?
echo ""

echo "3. Checking React DOM version..."
check_version "react-dom" "18.0.0"
REACT_DOM_CHECK=$?
echo ""

echo "4. Running ESLint..."
if pnpm lint > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} ESLint passed"
    LINT_CHECK=0
else
    echo -e "${RED}✗${NC} ESLint failed"
    LINT_CHECK=1
fi
echo ""

echo "=========================================="
echo "Summary"
echo "=========================================="

if [ $NEXT_CHECK -eq 0 ] && [ $REACT_CHECK -eq 0 ] && [ $REACT_DOM_CHECK -eq 0 ] && [ $LINT_CHECK -eq 0 ]; then
    echo -e "${GREEN}All checks passed!${NC}"
    echo ""
    echo "Your application has been successfully updated to address:"
    echo "  • CVE-2025-55182 (Critical): Remote Code Execution"
    echo "  • CVE-2025-55183 (Medium): Source Code Exposure"
    echo "  • CVE-2025-55184 (High): Denial of Service"
    echo "  • CVE-2025-67779 (High): Additional DoS Fix"
    echo ""
    echo "For more details, see: docs/security-update-nextjs-14.2.35.md"
    exit 0
else
    echo -e "${RED}Some checks failed. Please review the output above.${NC}"
    exit 1
fi
