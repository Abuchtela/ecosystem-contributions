# ⚡ Quick Start - Deploy in 5 Minutes

Choose your deployment method and follow along.

---

## 🟢 VERCEL (Recommended - Easiest)

### Time: 5 minutes | Cost: Free tier available

**Step 1: Push to GitHub** (2 min)
```powershell
cd c:\Users\Aydenbomb\.vscode\ecosystem-contributions
git add .
git commit -m "OP Delegation Frame - Production Ready"
git push origin main
```

**Step 2: Deploy via Vercel** (3 min)
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select "ethereum-optimism/ecosystem-contributions"
4. Configure:
   - Framework: Next.js (auto-detect)
   - Build: `pnpm run prebuild && pnpm build`
   - Install: `pnpm install --frozen-lockfile`
   - Output: `.next`
5. Add Environment Variables:
   ```
   OPTIMISM_RPC_URL=https://mainnet.optimism.io
   NEXT_PUBLIC_OPTIMISM_RPC_URL=https://mainnet.optimism.io
   NEXT_PUBLIC_DELEGATE_CONTRACT=0x489aa610671495d07cc33da88b482406e1d6b44b
   NEXT_PUBLIC_OP_TOKEN_ADDRESS=0x4200000000000000000000000000000000000042
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<get_from_walletconnect>
   ```
6. Click "Deploy"
7. Wait 2-5 minutes

**✅ LIVE!** 
```
Web UI: https://your-domain.vercel.app/op-delegation
Frame: https://your-domain.vercel.app/api/frame
```

---

## 🐳 DOCKER (Self-Hosted)

### Time: 10 minutes | Cost: Your server costs

**Step 1: Build Image** (3 min)
```powershell
cd c:\Users\Aydenbomb\.vscode\ecosystem-contributions
docker build -t op-delegation:latest .
```

**Step 2: Run Container** (2 min)
```powershell
docker run -p 3000:3000 `
  -e OPTIMISM_RPC_URL=https://mainnet.optimism.io `
  -e NEXT_PUBLIC_OPTIMISM_RPC_URL=https://mainnet.optimism.io `
  op-delegation:latest
```

**Step 3: Access** (5 min)
- Local: http://localhost:3000/op-delegation
- Remote: http://your-server:3000/op-delegation
- Configure domain (optional)

**✅ LIVE!**

---

## 🚂 RAILWAY (Easy Alternative)

### Time: 5 minutes | Cost: Free tier + pay as you go

**Step 1: Sign Up**
Go to https://railway.app/dashboard

**Step 2: Create Project**
1. Click "New Project"
2. Select "GitHub Repo"
3. Choose "ethereum-optimism/ecosystem-contributions"

**Step 3: Add Variables**
In Railway dashboard:
```
OPTIMISM_RPC_URL=https://mainnet.optimism.io
NEXT_PUBLIC_OPTIMISM_RPC_URL=https://mainnet.optimism.io
NEXT_PUBLIC_DELEGATE_CONTRACT=0x489aa610671495d07cc33da88b482406e1d6b44b
NEXT_PUBLIC_OP_TOKEN_ADDRESS=0x4200000000000000000000000000000000000042
```

**Step 4: Deploy**
- Railway auto-deploys on push
- Gets automatic HTTPS

**✅ LIVE!**
```
URL: https://railway.app/project (auto-assigned)
```

---

## ☁️ AWS (Enterprise)

### Time: 30+ minutes | Cost: Pay as you go

**See**: DEPLOYMENT_READY.md → AWS ECS Option

Key steps:
1. Push Docker image to ECR
2. Create ECS task definition
3. Deploy to ECS cluster
4. Configure load balancer

---

## 🧪 Test Locally First (Optional)

Before deploying, test locally:

```powershell
# Install pnpm (if needed)
npm install -g pnpm

# Install deps
pnpm install

# Create .env.local
@"
OPTIMISM_RPC_URL=https://mainnet.optimism.io
NEXT_PUBLIC_OPTIMISM_RPC_URL=https://mainnet.optimism.io
NEXT_PUBLIC_DELEGATE_CONTRACT=0x489aa610671495d07cc33da88b482406e1d6b44b
NEXT_PUBLIC_OP_TOKEN_ADDRESS=0x4200000000000000000000000000000000000042
NODE_ENV=development
"@ | Out-File -FilePath .env.local -Encoding UTF8

# Run dev server
pnpm dev

# Visit http://localhost:3000/op-delegation
```

---

## 📋 Pre-Deployment Checklist

Before you deploy:

- [ ] All code is committed
- [ ] Environment variables prepared
- [ ] Deployment platform chosen
- [ ] WalletConnect ID obtained (if using wallet features)
- [ ] .env.local is in .gitignore
- [ ] All files look good locally (if tested)

---

## ✅ Post-Deployment Checklist

After you deploy:

- [ ] Web UI loads: https://your-domain/op-delegation
- [ ] Frame endpoint works: https://your-domain/api/frame
- [ ] Test in framedev.xyz
- [ ] Try delegating (with testnet if possible)
- [ ] Check for console errors
- [ ] Verify mobile responsive
- [ ] Share frame URL with community

---

## 📞 Need Help?

**Deployment issues?**
→ Read `DEPLOYMENT_CHECKLIST.md`

**Integration questions?**
→ Read `INTEGRATION_GUIDE.md`

**General setup?**
→ Read `OP_DELEGATION_SETUP.md`

**Quick reference?**
→ Read `OP_DELEGATION_QUICK_REFERENCE.md`

---

## 🎯 TL;DR

### Fastest Way (Recommended):

1. **Push to GitHub**
   ```
   git add .
   git commit -m "OP Delegation Frame"
   git push origin main
   ```

2. **Go to vercel.com/dashboard**
   - Import repo
   - Add 5 env vars
   - Deploy
   - Wait 5 minutes

3. **✅ Live!**

---

## 🚀 You're Ready!

Pick your platform above and follow the steps. You'll be live in minutes.

Questions? Check the documentation files.

**Go deploy! 🎉**
