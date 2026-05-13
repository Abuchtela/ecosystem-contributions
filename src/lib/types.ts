// Types for OP Delegation Frame

export interface DelegateInfo {
  address: string;
  name?: string;
  votingHistoryPercentage: number;
  yesVotePercentage: number;
  noVotePercentage: number;
  proposalsVoted: number;
  totalProposals: number;
  followers?: number;
  bio?: string;
}

export interface DelegationState {
  delegator: string;
  delegate: string;
  amount: string;
  timestamp: number;
}

export interface VotingRecord {
  proposalId: string;
  proposalTitle: string;
  delegateVote: 'yes' | 'no' | 'abstain';
  votedAt: number;
  blockNumber: number;
}

export interface FrameState {
  action: 'initial' | 'delegate' | 'undelegate' | 'voting-history' | 'subscribe';
  delegateAddress?: string;
  delegatorAddress?: string;
  error?: string;
}
