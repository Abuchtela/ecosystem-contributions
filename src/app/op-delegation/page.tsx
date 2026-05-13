'use client';

import { useState, useEffect } from 'react';
import { DelegateInfo, VotingRecord } from '@/lib/types';
import {
  getDelegateInfo,
  getCurrentDelegation,
  getVotingHistory,
  delegateVotes,
  undelegateVotes,
  subscribeToUpdates,
} from '@/lib/contract';

export default function OPDelegationPage() {
  const [delegateAddress, setDelegateAddress] = useState('');
  const [currentDelegate, setCurrentDelegate] = useState<string | null>(null);
  const [delegateInfo, setDelegateInfo] = useState<DelegateInfo | null>(null);
  const [votingHistory, setVotingHistory] = useState<VotingRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'delegate' | 'history' | 'info'>('delegate');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  // Fetch current delegation on mount
  useEffect(() => {
    const fetchCurrentDelegation = async () => {
      // In production, get the user's wallet address
      const mockUserAddress = '0x1234567890123456789012345678901234567890';
      const delegate = await getCurrentDelegation(mockUserAddress);
      setCurrentDelegate(delegate);
    };

    fetchCurrentDelegation();
  }, []);

  const handleFetchDelegateInfo = async () => {
    if (!delegateAddress) return;

    setLoading(true);
    try {
      const info = await getDelegateInfo(delegateAddress);
      setDelegateInfo(info);

      const history = await getVotingHistory(delegateAddress);
      setVotingHistory(history);

      setActiveTab('info');
    } catch (error) {
      console.error('Error fetching delegate info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelegate = async () => {
    if (!delegateAddress) return;

    setLoading(true);
    try {
      const mockUserAddress = '0x1234567890123456789012345678901234567890';
      const tx = await delegateVotes(mockUserAddress, delegateAddress, '0');
      setTxHash(tx);
      setCurrentDelegate(delegateAddress);
      setActiveTab('info');
    } catch (error) {
      console.error('Error delegating:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUndelegate = async () => {
    setLoading(true);
    try {
      const mockUserAddress = '0x1234567890123456789012345678901234567890';
      const tx = await undelegateVotes(mockUserAddress);
      setTxHash(tx);
      setCurrentDelegate(null);
      setDelegateInfo(null);
      setVotingHistory([]);
    } catch (error) {
      console.error('Error undelegating:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!currentDelegate || subscribed) return;

    setLoading(true);
    try {
      const mockUserAddress = '0x1234567890123456789012345678901234567890';
      const success = await subscribeToUpdates(mockUserAddress, currentDelegate);
      if (success) {
        setSubscribed(true);
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-orange-500 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-500 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">🗳️ OP Delegation Frame</h1>
            <p className="text-lg opacity-90">Delegate your OP tokens directly in Farcaster</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Current Delegation Status */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Current Delegation</p>
              <p className="text-lg font-semibold text-gray-900">
                {currentDelegate
                  ? currentDelegate.slice(0, 6) + '...' + currentDelegate.slice(-4)
                  : 'Not delegated'}
              </p>
            </div>

            {/* Transaction Status */}
            {txHash && (
              <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Transaction Submitted</p>
                <p className="text-xs font-mono text-green-700 break-all">{txHash}</p>
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('delegate')}
                className={`pb-2 px-4 font-semibold transition-colors ${
                  activeTab === 'delegate'
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Delegate
              </button>
              {currentDelegate && (
                <>
                  <button
                    onClick={() => setActiveTab('info')}
                    className={`pb-2 px-4 font-semibold transition-colors ${
                      activeTab === 'info'
                        ? 'text-red-600 border-b-2 border-red-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Info
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`pb-2 px-4 font-semibold transition-colors ${
                      activeTab === 'history'
                        ? 'text-red-600 border-b-2 border-red-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Voting History
                  </button>
                </>
              )}
            </div>

            {/* Tab Content */}
            {activeTab === 'delegate' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delegate Address
                  </label>
                  <input
                    type="text"
                    value={delegateAddress}
                    onChange={(e) => setDelegateAddress(e.target.value)}
                    placeholder="0x..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleFetchDelegateInfo}
                    disabled={loading || !delegateAddress}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Loading...' : 'View Delegate Info'}
                  </button>

                  <button
                    onClick={handleDelegate}
                    disabled={loading || !delegateAddress}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Delegating...' : '✓ Delegate'}
                  </button>
                </div>

                {currentDelegate && (
                  <button
                    onClick={handleUndelegate}
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Undelegating...' : '↩️ Undelegate'}
                  </button>
                )}
              </div>
            )}

            {activeTab === 'info' && delegateInfo && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Address</p>
                    <p className="text-sm font-mono truncate">{delegateInfo.address}</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Voting Activity</p>
                    <p className="text-lg font-semibold">
                      {delegateInfo.votingHistoryPercentage}%
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Proposals Voted</p>
                    <p className="text-lg font-semibold">
                      {delegateInfo.proposalsVoted}/{delegateInfo.totalProposals}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Yes Votes</p>
                    <p className="text-lg font-semibold">{delegateInfo.yesVotePercentage}%</p>
                  </div>
                </div>

                {delegateInfo.followers && (
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Followers</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {(delegateInfo.followers / 1000).toFixed(1)}k
                    </p>
                  </div>
                )}

                <button
                  onClick={handleSubscribe}
                  disabled={loading || subscribed}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 transition-colors"
                >
                  {subscribed ? '✓ Subscribed to Updates' : '🔔 Subscribe to Voting Updates'}
                </button>
              </div>
            )}

            {activeTab === 'history' && votingHistory.length > 0 && (
              <div className="space-y-3">
                {votingHistory.map((record) => (
                  <div key={record.proposalId} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{record.proposalTitle}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Proposal #{record.proposalId}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          record.delegateVote === 'yes'
                            ? 'bg-green-100 text-green-700'
                            : record.delegateVote === 'no'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {record.delegateVote === 'yes' ? '✓ Yes' : record.delegateVote === 'no' ? '✗ No' : 'Abstain'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(record.votedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              Increase OP governance accessibility • Optimize votable supply • Reduce capture risk
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
