# Security Policy

## Supported Versions

This project uses Next.js 14.2.35, which includes critical security patches for React Server Components vulnerabilities.

| Package | Version | Security Status |
| ------- | ------- | --------------- |
| Next.js | 14.2.35 | ✅ Patched |
| React | 18.3.1 | ✅ Secure |
| React DOM | 18.3.1 | ✅ Secure |

## Security Fixes Implemented

### December 2025 - React Server Components CVE Vulnerabilities

This project has been configured with Next.js 14.2.35, which includes fixes for the following critical vulnerabilities:

#### CVE-2025-55184 (Denial of Service)
- **Severity**: High (CVSS 7.5)
- **Impact**: Crafted requests to Server Function endpoints could trigger infinite loops, causing denial-of-service and high CPU usage
- **Status**: ✅ Fixed in Next.js 14.2.35

#### CVE-2025-55183 (Source Code Exposure)
- **Severity**: Medium (CVSS 5.3)
- **Impact**: Attackers could cause a Server Function to return compiled source code of other Server Functions, potentially exposing business logic or secrets
- **Status**: ✅ Fixed in Next.js 14.2.35

#### CVE-2025-67779 (Denial of Service)
- **Severity**: High (CVSS 7.5)
- **Impact**: Related to CVE-2025-55184, additional DoS vector
- **Status**: ✅ Fixed in Next.js 14.2.35

### CVE-2025-66478 & CVE-2025-55182 (React2Shell RCE)
- **Note**: These vulnerabilities affect Next.js 15.x, 16.x canary builds, and React 19.x. This project uses Next.js 14.2.35 (stable) with React 18.x, which is **NOT affected** by these vulnerabilities.

## Version Support Status

Next.js 14.2.35 is the final patch release for the 14.x line. Official support for Next.js 14.x ended in October 2025. For long-term security updates, consider migrating to:
- Next.js 15.x (current stable)
- Next.js 16.x LTS (when available)

However, 14.2.35 remains secure for the vulnerabilities disclosed as of December 2025.

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it by:

1. **Do not** open a public issue
2. Contact the maintainers directly through GitHub's security advisory feature
3. Provide details about the vulnerability, including:
   - Description of the issue
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

We will respond to security reports within 48 hours and work to address confirmed vulnerabilities promptly.

## Security Best Practices

When deploying this application:

1. **Keep dependencies updated**: Regularly check for security updates
2. **Use environment variables**: Never hardcode secrets or API keys
3. **Enable HTTPS**: Always use HTTPS in production
4. **Implement rate limiting**: Protect against DoS attacks
5. **Monitor logs**: Watch for suspicious activity
6. **Rotate secrets**: Regularly rotate API keys and credentials

## Security Audit

Last security audit: December 28, 2025
- ✅ No known vulnerabilities in Next.js 14.2.35
- ✅ No known vulnerabilities in React 18.3.1
- ✅ No known vulnerabilities in React DOM 18.3.1

Audit performed using GitHub Advisory Database.
