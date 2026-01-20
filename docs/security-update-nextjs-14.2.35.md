# Next.js Security Update - December 2025

## Overview

This document explains the critical security vulnerabilities addressed by updating Next.js to version 14.2.35. These vulnerabilities affect React Server Components (RSC) in Next.js applications using the App Router.

## Affected Versions

- **Next.js 13.3+** through **14.2.34** (using App Router with React Server Components)
- Applications using the **Pages Router** are NOT affected, but upgrading is still recommended

## Security Vulnerabilities Fixed

### CVE-2025-55182 (Critical) - React2Shell Remote Code Execution

**Severity:** Critical

**Description:** An unauthenticated remote code execution (RCE) vulnerability in the React Server Components "Flight" protocol. Attackers with network access can exploit this by sending crafted HTTP requests to the server, allowing arbitrary code execution.

**Impact:**
- Complete server compromise
- Unauthorized access to sensitive data
- Ability to execute arbitrary commands on the server

**Risk:** Public proof-of-concept exploits are available, and active scanning has been observed in the wild.

### CVE-2025-55183 (Medium) - Source Code Exposure

**Severity:** Medium

**Description:** A specially crafted request could cause a Server Function to leak the compiled source code of other server functions.

**Impact:**
- Exposure of business logic
- Potential disclosure of hardcoded secrets (if not using environment variables)
- Intellectual property leakage

### CVE-2025-55184 (High) - Denial of Service

**Severity:** High

**Description:** Specially crafted requests could hang the server through an infinite loop, causing a denial of service for all future users.

**Impact:**
- Complete service unavailability
- Server resource exhaustion
- Impact on all application users

### CVE-2025-67779 - Additional DoS Fix

**Severity:** High

**Description:** An addendum to CVE-2025-55184 after the initial patch was found incomplete. This vulnerability is now fully addressed in version 14.2.35.

**Impact:** Same as CVE-2025-55184 if left unpatched.

## Upgrade Instructions

### Step 1: Update Next.js

Update your `package.json` to use Next.js version 14.2.35 or higher:

```json
{
  "dependencies": {
    "next": "14.2.35"
  }
}
```

### Step 2: Install Updates

Using pnpm (recommended for this project):
```bash
pnpm install
```

Or using npm:
```bash
npm install next@14.2.35
```

### Step 3: Update React (if needed)

Ensure you're using compatible React versions. Update to React 19.0.3 or higher if you're on React 19.x:

```bash
pnpm add react@latest react-dom@latest
```

### Step 4: Test Your Application

After updating, thoroughly test your application:

```bash
# Run linting
pnpm lint

# Build the application
pnpm build

# Start the development server
pnpm dev
```

### Step 5: Deploy

Once testing is complete, deploy your updated application to production immediately.

## Verification Steps

### Quick Verification

Run the automated verification script:

```bash
./scripts/verify-security-update.sh
```

This script will check:
- Next.js version is 14.2.35 or higher
- React and React DOM are installed
- ESLint passes without errors

### Manual Verification

If you prefer to verify manually, follow these steps:

### 1. Verify Package Versions

Check that the correct versions are installed:

```bash
pnpm list next react react-dom
```

Expected output should show:
- `next@14.2.35` or higher
- `react@18.x` or `react@19.0.3+`

### 2. Check Build Success

Ensure the application builds without errors:

```bash
pnpm run build
```

The build should complete successfully with no errors related to React Server Components.

### 3. Test Server Functions

If your application uses Server Actions or Server Functions:

1. Test that all server actions work correctly
2. Verify that no source code is exposed in responses
3. Confirm that the server doesn't hang on edge cases

### 4. Monitor Application Logs

After deployment, monitor your application logs for:
- Unusual request patterns
- Server errors or timeouts
- Any suspicious activity

### 5. Security Scanning

Run security vulnerability scans on your dependencies:

```bash
pnpm audit
```

Or use tools like:
- Snyk: `npx snyk test`
- npm audit: `npm audit`

## Important Security Notes

⚠️ **Critical Information:**

1. **No Workarounds:** There are no workarounds for these vulnerabilities. Upgrading is the only solution.

2. **WAF Not Sufficient:** Web Application Firewalls (WAF) or network restrictions do NOT replace patching. These vulnerabilities require only unauthenticated HTTP access.

3. **Immediate Action Required:** These are critical vulnerabilities with public exploits. Update immediately.

4. **Secrets Exposure:** If you had hardcoded secrets in server functions (not environment variables), they may have been exposed. Consider rotating any sensitive credentials.

5. **Multiple Patches Required:** If you previously applied patches for CVE-2025-55184, you must still upgrade to 14.2.35+ due to CVE-2025-67779.

## Additional Resources

- [Next.js Official Security Advisory](https://nextjs.org/blog/security-update-2025-12-11)
- [React Security Advisory](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components)
- [CVE-2025-55182 Details](https://www.vulncheck.com/blog/cve-2025-55182-react-nextjs)
- [Snyk Security Advisory](https://snyk.io/blog/security-advisory-critical-rce-vulnerabilities-react-server-components/)

## Timeline

- **December 3, 2025:** Vulnerabilities disclosed
- **December 11, 2025:** Next.js 14.2.35 released with fixes
- **January 2026:** This documentation created and update applied

## Contact

For security concerns or questions about this update, please:
- Open an issue in the [Optimism Developer Support GitHub](https://github.com/ethereum-optimism/developers)
- Join the [Optimism Discord](https://discord.gg/optimism) #dev-support channel

---

**Last Updated:** January 2026  
**Document Version:** 1.0
