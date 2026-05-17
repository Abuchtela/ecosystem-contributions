# OP Delegation Frame - Integration Guide

## 🔌 Wallet Integration

This guide explains how to integrate WalletConnect and perform on-chain delegations.

### Setup WalletConnect

1. **Get Project ID**
   ```bash
   # Visit https://cloud.walletconnect.com
   # Create a new project
   # Copy your Project ID
   ```

2. **Install Dependencies**
   ```bash
   pnpm add @rainbow-me/rainbowkit wagmi viem @tanstack/react-query
   ```

3. **Update Environment Variables**
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
   ```

### Use Wallet Components

```tsx
import { WalletConnectButton, DelegateButton } from '@/components/WalletConnect';

export default function Page() {
  const [delegateAddress, setDelegateAddress] = useState('');

  return (
    <div>
      <WalletConnectButton />
      <input
        value={delegateAddress}
        onChange={(e) => setDelegateAddress(e.target.value)}
        placeholder="0x..."
      />
      <DelegateButton delegateAddress={delegateAddress} />
    </div>
  );
}
```

### Smart Contract Integration

The delegation is performed using the OP token's `delegate(address)` function:

```solidity
// OP Token Contract
function delegate(address delegatee) external
```

**Contract Details:**
- Address: `0x4200000000000000000000000000000000000042`
- Network: Optimism Mainnet
- Function: `delegate(address delegatee)`

### Real Blockchain Calls

To replace mock data with real blockchain data:

```typescript
import { createPublicClient, http } from 'viem';
import { optimism } from 'viem/chains';

const publicClient = createPublicClient({
  chain: optimism,
  transport: http(process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL),
});

export async function getCurrentDelegation(delegatorAddress: string) {
  const result = await publicClient.readContract({
    address: '0x4200000000000000000000000000000000000042',
    abi: [
      {
        inputs: [{ name: 'account', type: 'address' }],
        name: 'delegates',
        outputs: [{ name: '', type: 'address' }],
        type: 'function',
      },
    ],
    functionName: 'delegates',
    args: [delegatorAddress as `0x${string}`],
  });
  return result;
}
```

### Testing Transactions

Use testnet first:

```typescript
// For testing, use Optimism Sepolia testnet
const testnetConfig = getDefaultConfig({
  chains: [optimismSepolia], // Add to wagmi chains
  transports: {
    [optimismSepolia.id]: http('https://sepolia.optimism.io'),
  },
});
```

## 🚀 Deployment Configuration

### Vercel Deployment

**Environment Variables in Vercel Dashboard:**

```
OPTIMISM_RPC_URL=https://mainnet.optimism.io
NEXT_PUBLIC_OPTIMISM_RPC_URL=https://mainnet.optimism.io
NEXT_PUBLIC_DELEGATE_CONTRACT=0x489aa610671495d07cc33da88b482406e1d6b44b
NEXT_PUBLIC_OP_TOKEN_ADDRESS=0x4200000000000000000000000000000000000042
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

**Build Settings:**
- Build Command: `pnpm run prebuild && pnpm build`
- Install Command: `pnpm install --frozen-lockfile`
- Output Directory: `.next`

### Docker Deployment

```bash
# Build image
docker build -t op-delegation:latest .

# Run container
docker run -p 3000:3000 \
  -e OPTIMISM_RPC_URL=https://mainnet.optimism.io \
  -e NEXT_PUBLIC_OPTIMISM_RPC_URL=https://mainnet.optimism.io \
  op-delegation:latest
```

### Docker Compose

```bash
# Create .env file
cp .env.example .env

# Start services
docker-compose up -d

# View logs
docker-compose logs -f op-delegation
```

## 🔐 Security Checklist

- [ ] Never commit `.env` files
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting on API routes
- [ ] Validate all user inputs
- [ ] Use HTTPS in production
- [ ] Enable CORS for trusted origins only
- [ ] Implement request signing for sensitive operations
- [ ] Monitor contract interactions for anomalies

## 📊 Performance Optimization

### Caching Strategy

```typescript
// Cache voting history for 5 minutes
export const revalidate = 300;

export async function GET() {
  const data = await getVotingHistory();
  return NextResponse.json(data);
}
```

### Database Queries

For storing delegation history (optional):

```typescript
// Using Supabase example
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function recordDelegation(
  delegator: string,
  delegate: string,
  txHash: string
) {
  const { data, error } = await supabase
    .from('delegations')
    .insert([
      {
        delegator,
        delegate,
        tx_hash: txHash,
        created_at: new Date(),
      },
    ]);

  return { data, error };
}
```

## 📱 Farcaster Frame URL

After deployment, your frame URL will be:

```
https://your-domain.com/api/frame
```

Add to any Farcaster post to enable delegation directly from the social feed.

## 🧪 Testing Checklist

Before production deployment:

- [ ] Test wallet connection flow
- [ ] Test delegation on testnet
- [ ] Test undelegation
- [ ] Test voting history fetch
- [ ] Test subscription enrollment
- [ ] Verify RPC calls work
- [ ] Check error handling
- [ ] Monitor transaction confirmations
- [ ] Test with different wallet types
- [ ] Performance test under load

## 📞 Support

- **Farcaster Docs**: https://docs.farcaster.xyz
- **WalletConnect Docs**: https://docs.walletconnect.com
- **Optimism Docs**: https://docs.optimism.io
- **Wagmi Docs**: https://wagmi.sh
- **Rainbow Kit Docs**: https://www.rainbowkit.com

