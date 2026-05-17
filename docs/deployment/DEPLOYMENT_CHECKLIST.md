# OP Delegation Frame - Deployment Checklist

## Pre-Deployment Verification

### Code Quality
- [ ] All TypeScript types are correct: `pnpm tsc --noEmit`
- [ ] No ESLint errors: `pnpm lint`
- [ ] All imports are correct
- [ ] No console.log statements left (except for development)
- [ ] Environment variables are defined

### Testing
- [ ] All pages load without errors
- [ ] Frame works in framedev.xyz
- [ ] Wallet connection works
- [ ] Delegation button works (testnet)
- [ ] Voting history displays correctly
- [ ] Responsive design verified on mobile/tablet/desktop
- [ ] Error states display properly
- [ ] Loading states work

### Build
- [ ] `pnpm run prebuild` succeeds
- [ ] `pnpm build` succeeds
- [ ] No build warnings (only info messages okay)
- [ ] `.next` folder is generated
- [ ] Build size is reasonable (< 500MB)

### Environment
- [ ] `.env.local` is populated with correct values
- [ ] `.env.local` is in `.gitignore`
- [ ] All required environment variables are defined
- [ ] No hardcoded secrets in code
- [ ] RPC endpoints are tested and working

### Security
- [ ] Input validation is in place
- [ ] Rate limiting is configured
- [ ] CORS headers are set
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Wallet interactions are signed properly

## Deployment Targets

### Option 1: Vercel (Recommended)

**Pre-deployment:**
- [ ] Code is pushed to GitHub
- [ ] Repository is public or Vercel has access
- [ ] GitHub account is connected to Vercel

**Vercel Setup:**
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select the `ecosystem-contributions` repository
4. Configure:
   - Build Command: `pnpm run prebuild && pnpm build`
   - Install Command: `pnpm install --frozen-lockfile`
   - Output Directory: `.next`
5. Add Environment Variables:
   ```
   OPTIMISM_RPC_URL=https://mainnet.optimism.io
   NEXT_PUBLIC_OPTIMISM_RPC_URL=https://mainnet.optimism.io
   NEXT_PUBLIC_DELEGATE_CONTRACT=0x489aa610671495d07cc33da88b482406e1d6b44b
   NEXT_PUBLIC_OP_TOKEN_ADDRESS=0x4200000000000000000000000000000000000042
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<your_id>
   ```
6. Click "Deploy"
7. Wait for deployment to complete (typically 2-5 minutes)

**Post-deployment:**
- [ ] Visit https://your-project.vercel.app
- [ ] Verify all pages load
- [ ] Test frame at https://your-project.vercel.app/api/frame
- [ ] Update frame links in documentation

### Option 2: Docker Compose

**Pre-deployment:**
- [ ] Docker installed
- [ ] Docker Compose installed (v2+)
- [ ] Linux/Mac server with port 3000 access

**Setup:**
```bash
# 1. Create .env file
cat > .env << EOF
OPTIMISM_RPC_URL=https://mainnet.optimism.io
NEXT_PUBLIC_OPTIMISM_RPC_URL=https://mainnet.optimism.io
NEXT_PUBLIC_DELEGATE_CONTRACT=0x489aa610671495d07cc33da88b482406e1d6b44b
NEXT_PUBLIC_OP_TOKEN_ADDRESS=0x4200000000000000000000000000000000000042
EOF

# 2. Start containers
docker-compose up -d

# 3. Verify deployment
docker-compose ps
curl http://localhost:3000/op-delegation
```

**Post-deployment:**
- [ ] Application is running: `docker-compose logs -f op-delegation`
- [ ] Health check passes: `docker-compose ps` (status should be "healthy")
- [ ] Accessible at your domain

### Option 3: AWS ECS

**Pre-deployment:**
- [ ] AWS account with ECS access
- [ ] Docker image pushed to ECR
- [ ] ECS cluster created
- [ ] Load balancer configured

**Deployment:**
1. Create ECS task definition with Docker image
2. Configure environment variables
3. Deploy to ECS cluster
4. Verify health checks passing

### Option 4: Railway

**Setup:**
1. Go to https://railway.app/dashboard
2. Click "New Project"
3. Select "GitHub Repo"
4. Select `ecosystem-contributions` repository
5. Configure environment variables (same as Vercel)
6. Deploy

**Post-deployment:**
- [ ] Railway deployment succeeds
- [ ] Custom domain is set up
- [ ] Health checks are passing

## Post-Deployment

### Verification

```bash
# 1. Test main page
curl -s https://your-domain.com/op-delegation | grep -q "OP Delegation" && echo "✓ Main page works"

# 2. Test frame endpoint
curl -s https://your-domain.com/api/frame | grep -q "fc:frame" && echo "✓ Frame endpoint works"

# 3. Test API endpoints
curl -s https://your-domain.com/api/frame/image?action=0 | head -c 4 | grep -q "svg" && echo "✓ Image generation works"
```

### Monitoring

- [ ] Set up error tracking (Sentry, Rollbar)
- [ ] Enable performance monitoring
- [ ] Set up uptime monitoring
- [ ] Configure log aggregation (ELK, Datadog)
- [ ] Enable application metrics

### Documentation Updates

- [ ] Update README with production URL
- [ ] Update frame URL in all references
- [ ] Document any breaking changes
- [ ] Update API documentation
- [ ] Add deployment guide to docs

### Domain & DNS

- [ ] Custom domain is configured
- [ ] SSL certificate is valid
- [ ] DNS records point to deployment
- [ ] HTTPS is enforced

### GitHub Actions

- [ ] CI/CD pipeline is set up
- [ ] Tests run on every commit
- [ ] Preview deployments work on PRs
- [ ] Production deployment is automated

## Rollback Plan

If deployment fails:

```bash
# Vercel
# - Go to Vercel dashboard
# - Select previous deployment
# - Click "Redeploy"

# Docker Compose
docker-compose down
git checkout previous-version
docker-compose up -d

# AWS/Railway
# - Use their rollback features in dashboard
# - Or redeploy previous image tag
```

## Performance Benchmarks

After deployment, verify:

| Metric | Target | Actual |
|--------|--------|--------|
| First Paint | < 1s | __ |
| Largest Contentful Paint | < 2.5s | __ |
| Cumulative Layout Shift | < 0.1 | __ |
| Time to Interactive | < 3s | __ |
| API Response Time | < 200ms | __ |
| Image Load Time | < 500ms | __ |

## Success Criteria

Deployment is successful when:

✅ Application loads without errors
✅ All pages are functional
✅ Wallet connection works
✅ Frame is accessible
✅ Frame works in Farcaster
✅ No JavaScript errors in console
✅ Performance is acceptable
✅ All tests pass
✅ Monitoring is active
✅ Team can access and test

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next
pnpm install --frozen-lockfile
pnpm run prebuild
pnpm build
```

### Deployment Hangs

- Check logs for errors
- Verify environment variables
- Check disk space
- Verify network connectivity

### Runtime Errors

```bash
# Check application logs
# Vercel: https://vercel.com/dashboard/project/logs
# Docker: docker-compose logs op-delegation
# AWS: CloudWatch logs
```

### Performance Issues

- Enable caching
- Optimize images
- Code splitting
- Database query optimization
- CDN configuration

## Support Contacts

- **Vercel Support**: support@vercel.com
- **Docker Issues**: https://github.com/moby/moby/issues
- **AWS Support**: https://console.aws.amazon.com/support
- **Optimism Team**: https://discord.gg/optimism

---

**Deployment Date**: ___________
**Deployed To**: ___________
**Status**: [ ] In Progress [ ] Complete [ ] Rolled Back
