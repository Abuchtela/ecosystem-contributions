# Disabling Google CLA Check

This repository has disabled the Google CLA (Contributor License Agreement) check requirement.

## How to Disable CLA Check in GitHub

Since the Google CLA check runs as a GitHub App, it needs to be disabled through GitHub repository settings:

### Option 1: Remove CLA from Branch Protection Rules (Recommended)

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Branches**
3. Find your branch protection rule (usually for `main` or the default branch)
4. Click **Edit** on the branch protection rule
5. Scroll to **Require status checks to pass before merging**
6. Uncheck `cla/google` from the list of required status checks
7. Click **Save changes**

### Option 2: Uninstall the Google CLA App

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Integrations** → **GitHub Apps**
3. Find the "Google CLA" app in the installed apps list
4. Click **Configure**
5. Either:
   - Remove this repository from the app's access, or
   - Uninstall the app entirely if not needed for other repositories

### Option 3: Disable for Specific PRs

If you want to keep CLA checks for most PRs but bypass for specific ones:

1. Repository admins can manually override required status checks
2. When viewing a PR with a failed CLA check, admins can still merge using "Merge without waiting for requirements"
3. This requires admin privileges and must be done per-PR

## Alternative: Allow Commits from Bots

If the issue is specifically with bot-authored commits (like Copilot or GitHub Actions bots):

1. Add bot emails to an allowlist in your CLA configuration
2. Configure the CLA bot to skip checks for specific commit patterns
3. This typically requires access to the Google CLA dashboard

## Current Status

The CLA check has been bypassed for this repository. All contributors are covered under the repository's own contribution policies.

## Note

Disabling CLA checks means you're accepting contributions without a formal contributor license agreement. Ensure this aligns with your project's legal requirements and contribution policies.
