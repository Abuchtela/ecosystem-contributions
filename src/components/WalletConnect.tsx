'use client';

import { useState } from 'react';
import { useAccount, useConnectModal } from '@rainbow-me/rainbowkit';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';

interface WalletConnectButtonProps {
  children?: React.ReactNode;
}

export function WalletConnectButton({ children }: WalletConnectButtonProps) {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        {address.slice(0, 6)}...{address.slice(-4)}
      </div>
    );
  }

  return (
    <button
      onClick={openConnectModal}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
    >
      {children || 'Connect Wallet'}
    </button>
  );
}

interface DelegateButtonProps {
  delegateAddress: string;
  disabled?: boolean;
  loading?: boolean;
}

export function DelegateButton({
  delegateAddress,
  disabled,
  loading,
}: DelegateButtonProps) {
  const { address } = useAccount();

  if (!address) {
    return null;
  }

  // Contract ABI for delegate function
  const delegateABI = [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'delegatee',
          type: 'address',
        },
      ],
      name: 'delegate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];

  const { config } = usePrepareContractWrite({
    address: '0x4200000000000000000000000000000000000042' as `0x${string}`,
    abi: delegateABI,
    functionName: 'delegate',
    args: [delegateAddress as `0x${string}`],
    enabled: !!delegateAddress && /^0x[a-fA-F0-9]{40}$/.test(delegateAddress),
  });

  const { write, isLoading } = useContractWrite(config);

  return (
    <button
      onClick={() => write?.()}
      disabled={disabled || isLoading || !write}
      className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors"
    >
      {loading || isLoading ? 'Delegating...' : '✓ Delegate'}
    </button>
  );
}
