import {
  getDelegateInfo,
  getCurrentDelegation,
  getVotingHistory,
  delegateVotes,
  undelegateVotes,
  subscribeToUpdates,
} from '@/src/lib/contract'

const MOCK_ADDRESS = '0x1234567890123456789012345678901234567890'
const MOCK_DELEGATE = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'

// ---------------------------------------------------------------------------
// getDelegateInfo
// ---------------------------------------------------------------------------

describe('getDelegateInfo', () => {
  it('returns an object whose address matches the input', async () => {
    const info = await getDelegateInfo(MOCK_ADDRESS)
    expect(info.address).toBe(MOCK_ADDRESS)
  })

  it('formats the name as a shortened address', async () => {
    const info = await getDelegateInfo(MOCK_ADDRESS)
    expect(info.name).toBe(
      MOCK_ADDRESS.slice(0, 6) + '...' + MOCK_ADDRESS.slice(-4)
    )
  })

  it('returns numeric fields within expected ranges', async () => {
    const info = await getDelegateInfo(MOCK_ADDRESS)
    expect(info.votingHistoryPercentage).toBeGreaterThanOrEqual(0)
    expect(info.votingHistoryPercentage).toBeLessThanOrEqual(100)
    expect(info.yesVotePercentage).toBeGreaterThanOrEqual(0)
    expect(info.yesVotePercentage).toBeLessThanOrEqual(100)
    expect(info.noVotePercentage).toBeGreaterThanOrEqual(0)
    expect(info.noVotePercentage).toBeLessThanOrEqual(100)
    expect(info.totalProposals).toBe(150)
    expect(info.proposalsVoted).toBeGreaterThanOrEqual(20)
    expect(info.proposalsVoted).toBeLessThanOrEqual(170)
  })

  it('includes optional followers field', async () => {
    const info = await getDelegateInfo(MOCK_ADDRESS)
    expect(typeof info.followers).toBe('number')
    expect(info.followers).toBeGreaterThanOrEqual(100)
  })
})

// ---------------------------------------------------------------------------
// getCurrentDelegation
// ---------------------------------------------------------------------------

describe('getCurrentDelegation', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns null when fetch throws an error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('network error'))
    const result = await getCurrentDelegation(MOCK_ADDRESS)
    expect(result).toBeNull()
  })

  it('returns null when the RPC result is "0x" (no delegation)', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ result: '0x' }),
    } as any)
    const result = await getCurrentDelegation(MOCK_ADDRESS)
    expect(result).toBeNull()
  })

  it('returns null when the RPC result is falsy', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ result: null }),
    } as any)
    const result = await getCurrentDelegation(MOCK_ADDRESS)
    expect(result).toBeNull()
  })

  it('returns a lowercase 0x-prefixed address when the RPC result is valid', async () => {
    const paddedHex =
      '0x000000000000000000000000abcdefabcdefabcdefabcdefabcdefabcdefabcd'
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ result: paddedHex }),
    } as any)
    const result = await getCurrentDelegation(MOCK_ADDRESS)
    expect(result).toMatch(/^0x[a-f0-9]{40}$/)
    expect(result).toBe('0xabcdefabcdefabcdefabcdefabcdefabcdefabcd')
  })
})

// ---------------------------------------------------------------------------
// getVotingHistory
// ---------------------------------------------------------------------------

describe('getVotingHistory', () => {
  it('returns an array of VotingRecord objects', async () => {
    const history = await getVotingHistory(MOCK_DELEGATE)
    expect(Array.isArray(history)).toBe(true)
    expect(history.length).toBeGreaterThan(0)
  })

  it('every record has required fields with correct types', async () => {
    const history = await getVotingHistory(MOCK_DELEGATE)
    for (const record of history) {
      expect(typeof record.proposalId).toBe('string')
      expect(typeof record.proposalTitle).toBe('string')
      expect(['yes', 'no', 'abstain']).toContain(record.delegateVote)
      expect(typeof record.votedAt).toBe('number')
      expect(typeof record.blockNumber).toBe('number')
    }
  })
})

// ---------------------------------------------------------------------------
// delegateVotes
// ---------------------------------------------------------------------------

describe('delegateVotes', () => {
  it('returns a string that starts with 0x', async () => {
    const txHash = await delegateVotes(MOCK_ADDRESS, MOCK_DELEGATE, '100')
    expect(txHash).toMatch(/^0x/)
  })

  it('returns a non-empty transaction hash string', async () => {
    const txHash = await delegateVotes(MOCK_ADDRESS, MOCK_DELEGATE, '100')
    expect(txHash.length).toBeGreaterThan(2)
  })
})

// ---------------------------------------------------------------------------
// undelegateVotes
// ---------------------------------------------------------------------------

describe('undelegateVotes', () => {
  it('returns a string that starts with 0x', async () => {
    const txHash = await undelegateVotes(MOCK_ADDRESS)
    expect(txHash).toMatch(/^0x/)
  })

  it('returns a non-empty transaction hash string', async () => {
    const txHash = await undelegateVotes(MOCK_ADDRESS)
    expect(txHash.length).toBeGreaterThan(2)
  })
})

// ---------------------------------------------------------------------------
// subscribeToUpdates
// ---------------------------------------------------------------------------

describe('subscribeToUpdates', () => {
  it('returns true on success', async () => {
    const result = await subscribeToUpdates(MOCK_ADDRESS, MOCK_DELEGATE)
    expect(result).toBe(true)
  })

  it('returns false when an exception is thrown internally', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    // Force console.log to throw to simulate an internal error path
    const logSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {
        throw new Error('simulated error')
      })
    const result = await subscribeToUpdates(MOCK_ADDRESS, MOCK_DELEGATE)
    expect(result).toBe(false)
    logSpy.mockRestore()
    consoleSpy.mockRestore()
  })
})
