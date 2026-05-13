# OP Delegation Frame - Setup & Deployment Guide

## 📋 Table of Contents
1. [Local Development](#local-development)
2. [Testing](#testing)
3. [Deployment](#deployment)
4. [Integration Guide](#integration-guide)
5. [Troubleshooting](#troubleshooting)

## 🏠 Local Development

### Prerequisites
- Node.js 18.17 or higher
- pnpm 8.0 or higher
- Git
- A text editor (VS Code recommended)

### Installation Steps

1. **Clone the repository**
   ```bash
   cd ~/.vscode/ecosystem-contributions
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Create environment file**
   ```bash
   # Create .env.local
   cat > .env.local << EOF
   OPTIMISM_RPC_URL=https://mainnet.optimism.io
   NEXT_PUBLIC_DELEGATE_CONTRACT=0x489aa610671495d07cc33da88b482406e1d6b44b
   EOF
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Access the application**
   - Web UI: http://localhost:3000/op-delegation
   - API Docs: http://localhost:3000/api/frame
   - Frame Preview: http://localhost:3000/api/frame/image

## 🧪 Testing

### Manual Testing - Web UI

1. Navigate to http://localhost:3000/op-delegation
2. Enter a delegate address (example):
   ```
   0xabcdefabcdefabcdefabcdefabcdefabcdefabcd
   ```
3. Test each feature:
   - [ ] View Delegate Info
   - [ ] Delegate button
   - [ ] Undelegate button
   - [ ] Voting history tab
   - [ ] Subscribe to updates

### Manual Testing - Farcaster Frame

1. **Using Framedev.xyz**
   - Go to https://framedev.xyz
   - Paste URL: `http://localhost:3000/api/frame`
   - Test frame interactions

2. **Using Farcaster Client (Beta)**
   - Post a frame from your cast composer
   - Use: `http://localhost:3000/api/frame`

3. **Test Scenarios**
   ```
   Scenario 1: Delegate
   - Click "🗳️ Delegate"
   - Enter delegate address
   - Verify success message
   
   Scenario 2: View History
   - Click "📊 Voting History"
   - Verify voting records appear
   
   Scenario 3: Subscribe
   - Click "🔔 Subscribe to Updates"
   - Verify subscription confirmation
   ```

### Automated Testing

```bash
# Run unit tests (when Jest is configured)
pnpm test

# Run type checking
pnpm tsc --noEmit

# Lint code
pnpm lint

# Build and check for errors
pnpm run prebuild && pnpm run build:unprocessed
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. **Connect repository**
   ```bash
   # Push to GitHub
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select the ecosystem-contributions repository
   - Vercel will auto-detect Next.js
   - Add environment variables in Vercel dashboard:
     ```
     OPTIMISM_RPC_URL=https://mainnet.optimism.io
     NEXT_PUBLIC_DELEGATE_CONTRACT=0x489aa610671495d07cc33da88b482406e1d6b44b
     ```
   - Deploy!

3. **Your Frame URL**
   ```
   https://<your-vercel-domain>.vercel.app/api/frame
   ```

### Option 2: Self-Hosted (Docker)

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy files
COPY . .

# Install dependencies
RUN pnpm install

# Build
RUN pnpm run prebuild && pnpm build

# Expose port
EXPOSE 3000

# Start
CMD ["pnpm", "start"]
```

**Deploy:**
```bash
# Build image
docker build -t op-delegation .

# Run container
docker run -p 3000:3000 -e OPTIMISM_RPC_URL=https://mainnet.optimism.io op-delegation
```

### Option 3: Railway, Netlify, or Other Platforms

All support Next.js deployments. Follow their respective documentation for:
1. Repository connection
2. Environment variables setup
3. Build command: `pnpm run prebuild && pnpm build`
4. Start command: `pnpm start`

## 🔗 Integration Guide

### Adding to Your Farcaster Post

**Method 1: Direct Frame Link**
```html
<meta property="fc:frame" content="vNext" />
<meta property="fc:frame:image" content="https://your-domain.com/api/frame/image" />
<meta property="fc:frame:button:1" content="Delegate" />
<meta property="fc:frame:button:1:action" content="post" />
<meta property="fc:frame:post_url" content="https://your-domain.com/api/frame" />
```

**Method 2: Using Warpcast Composer**
1. Open Farcaster/Warpcast
2. Create a new post
3. Add frame: `https://your-domain.com/api/frame`
4. Test with preview button
5. Publish!

### Integrating with Smart Contracts

To use actual blockchain data instead of mock data:

1. **Update `/lib/contract.ts`**
   ```typescript
   // Replace mock data with actual RPC calls
   import { createPublicClient, http } from 'viem';
   
   const publicClient = createPublicClient({
     transport: http(OPTIMISM_RPC_URL)
   });
   ```

2. **Implement contract calls**
   ```typescript
   export async function getCurrentDelegation(delegatorAddress: string) {
     const result = await publicClient.readContract({
       address: DELEGATE_CONTRACT,
       abi: DELEGATE_ABI,
       functionName: 'delegates',
       args: [delegatorAddress],
     });
     return result;
   }
   ```

3. **Add required dependencies**
   ```bash
   pnpm add viem wagmi
   ```

### Database Integration (Optional)

For storing subscriptions and user preferences:

```typescript
// Example: Using Supabase
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function subscribeToUpdates(delegator: string, delegate: string) {
  const { error } = await supabase
    .from('subscriptions')
    .insert([{ delegator, delegate, created_at: new Date() }]);
  
  if (error) throw error;
  return true;
}
```

## 🐛 Troubleshooting

### Issue: Frame not loading in Farcaster

**Solution:**
1. Check URL is publicly accessible
2. Verify frame metadata in browser dev tools:
   ```bash
   curl -I https://your-domain.com/api/frame
   ```
3. Test with framedev.xyz first

### Issue: RPC call fails

**Solution:**
1. Verify RPC URL is correct
2. Check rate limits: https://mainnet.optimism.io
3. Add fallback RPC: https://rpc.ankr.com/optimism

### Issue: Build fails with TypeScript errors

**Solution:**
```bash
# Clear cache
rm -rf .next

# Reinstall dependencies
pnpm install

# Check for type errors
pnpm tsc --noEmit

# Build again
pnpm build
```

### Issue: Tailwind styles not applied

**Solution:**
1. Ensure `globals.css` is imported in layout.tsx
2. Check `tailwind.config.ts` includes correct paths
3. Rebuild: `pnpm build`

## 📞 Support & Resources

- **Farcaster Docs**: https://docs.farcaster.xyz
- **Next.js Docs**: https://nextjs.org/docs
- **Optimism Docs**: https://docs.optimism.io
- **Frame Dev Tools**: https://framedev.xyz
- **OP Governance**: https://governance.optimism.io

## 🔐 Security Considerations

Before production deployment:

1. **Never commit private keys or secrets**
   ```bash
   echo ".env.local" >> .gitignore
   ```

2. **Validate all user inputs**
   ```typescript
   // Validate addresses, amounts, etc.
   if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
     throw new Error('Invalid address');
   }
   ```

3. **Rate limit API endpoints**
   ```typescript
   // Implement rate limiting
   import rateLimit from 'express-rate-limit';
   ```

4. **CORS configuration**
   ```typescript
   // Restrict to trusted origins only
   const allowedOrigins = ['https://warpcast.com'];
   ```

5. **Input sanitization**
   ```typescript
   // Sanitize any user-provided content
   import DOMPurify from 'dompurify';
   ```

## ✅ Deployment Checklist

Before going live:

- [ ] Environment variables set on hosting platform
- [ ] Build succeeds: `pnpm build`
- [ ] No TypeScript errors: `pnpm tsc --noEmit`
- [ ] Tests pass: `pnpm test` (if configured)
- [ ] Frame URL is publicly accessible
- [ ] Frame works in framedev.xyz
- [ ] Frame works in Farcaster
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Rate limiting enabled
- [ ] Security headers set

---

**Last Updated**: May 13, 2026
**Status**: Ready for Development
