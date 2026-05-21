/**
 * @jest-environment node
 *
 * Tests for src/app/api/delegation-example/route.ts
 *
 * Covers the POST handler and the isValidAddress helper (indirectly).
 */

import { NextRequest } from 'next/server'
import { POST } from '@/src/app/api/delegation-example/route'

function makeRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/delegation-example', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

const VALID_DELEGATOR = '0x1234567890123456789012345678901234567890'
const VALID_DELEGATE = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'

// ---------------------------------------------------------------------------
// Valid delegate action
// ---------------------------------------------------------------------------

describe('POST /api/delegation-example – delegate action', () => {
  it('returns 200 with success payload for valid addresses', async () => {
    const req = makeRequest({
      delegatorAddress: VALID_DELEGATOR,
      delegateAddress: VALID_DELEGATE,
      action: 'delegate',
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.txHash).toMatch(/^0x/)
    expect(json.delegator).toBe(VALID_DELEGATOR)
    expect(json.delegate).toBe(VALID_DELEGATE)
    expect(typeof json.message).toBe('string')
  })
})

// ---------------------------------------------------------------------------
// Valid undelegate action
// ---------------------------------------------------------------------------

describe('POST /api/delegation-example – undelegate action', () => {
  it('returns 200 with success payload for valid addresses', async () => {
    const req = makeRequest({
      delegatorAddress: VALID_DELEGATOR,
      delegateAddress: VALID_DELEGATE,
      action: 'undelegate',
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.txHash).toMatch(/^0x/)
    expect(json.delegator).toBe(VALID_DELEGATOR)
  })
})

// ---------------------------------------------------------------------------
// Invalid address validation
// ---------------------------------------------------------------------------

describe('POST /api/delegation-example – address validation', () => {
  it('returns 400 when delegatorAddress is not a valid 0x address', async () => {
    const req = makeRequest({
      delegatorAddress: 'not-an-address',
      delegateAddress: VALID_DELEGATE,
      action: 'delegate',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Invalid address format')
  })

  it('returns 400 when delegateAddress is not a valid 0x address', async () => {
    const req = makeRequest({
      delegatorAddress: VALID_DELEGATOR,
      delegateAddress: 'bad',
      action: 'delegate',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Invalid address format')
  })

  it('returns 400 when address is too short', async () => {
    const req = makeRequest({
      delegatorAddress: '0x1234',
      delegateAddress: VALID_DELEGATE,
      action: 'delegate',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 when address is too long', async () => {
    const req = makeRequest({
      delegatorAddress: '0x12345678901234567890123456789012345678901',
      delegateAddress: VALID_DELEGATE,
      action: 'delegate',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 when address contains non-hex characters', async () => {
    const req = makeRequest({
      delegatorAddress: '0xgggggggggggggggggggggggggggggggggggggggg',
      delegateAddress: VALID_DELEGATE,
      action: 'delegate',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('accepts addresses with uppercase hex characters', async () => {
    const req = makeRequest({
      delegatorAddress: '0xABCDEFABCDEFABCDEFABCDEFABCDEFABCDEFABCD',
      delegateAddress: VALID_DELEGATE,
      action: 'delegate',
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
  })
})

// ---------------------------------------------------------------------------
// Unknown action
// ---------------------------------------------------------------------------

describe('POST /api/delegation-example – unknown action', () => {
  it('returns 400 for an unrecognised action', async () => {
    const req = makeRequest({
      delegatorAddress: VALID_DELEGATOR,
      delegateAddress: VALID_DELEGATE,
      action: 'transfer',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Unknown action')
  })
})

// ---------------------------------------------------------------------------
// Malformed body → 500
// ---------------------------------------------------------------------------

describe('POST /api/delegation-example – malformed body', () => {
  it('returns 500 when the request body is not valid JSON', async () => {
    const req = new NextRequest(
      'http://localhost/api/delegation-example',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'not json',
      }
    )
    const res = await POST(req)
    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json.error).toBe('Internal server error')
  })
})
