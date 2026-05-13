import { NextRequest, NextResponse } from 'next/server';

/**
 * Example API route showing how to handle OP delegation transactions
 * This demonstrates a complete delegation flow with proper error handling
 */

export async function POST(request: NextRequest) {
  try {
    const { delegatorAddress, delegateAddress, action } = await request.json();

    // Validate inputs
    if (!isValidAddress(delegatorAddress) || !isValidAddress(delegateAddress)) {
      return NextResponse.json(
        { error: 'Invalid address format' },
        { status: 400 }
      );
    }

    // Execute the appropriate action
    switch (action) {
      case 'delegate':
        return await handleDelegate(delegatorAddress, delegateAddress);
      case 'undelegate':
        return await handleUndelegate(delegatorAddress);
      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleDelegate(delegatorAddress: string, delegateAddress: string) {
  // In production, this would:
  // 1. Create a transaction to the OP governance contract
  // 2. Sign with the user's wallet
  // 3. Return the transaction hash
  
  const txHash = `0x${Math.random().toString(16).slice(2)}`;
  
  return NextResponse.json({
    success: true,
    txHash,
    message: `Successfully delegated to ${delegateAddress}`,
    delegator: delegatorAddress,
    delegate: delegateAddress,
  });
}

async function handleUndelegate(delegatorAddress: string) {
  // Undelegate by delegating to self
  const txHash = `0x${Math.random().toString(16).slice(2)}`;
  
  return NextResponse.json({
    success: true,
    txHash,
    message: 'Successfully undelegated your OP tokens',
    delegator: delegatorAddress,
  });
}

function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
