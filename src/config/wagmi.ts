import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import {
  mainnet,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'OP Delegation Frame',
  projectId: 'op-delegation-frame', // Get from WalletConnect Cloud
  chains: [mainnet, optimism, arbitrum, base],
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http('https://mainnet.optimism.io'),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
});
