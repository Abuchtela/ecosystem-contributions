/**
 * @jest-environment node
 *
 * Tests for src/app/api/frame/image/route.ts
 *
 * Covers the GET handler and the SVG image generation logic.
 */

import { NextRequest } from 'next/server'
import { GET } from '@/src/app/api/frame/image/route'

function makeRequest(params: Record<string, string> = {}): NextRequest {
  const url = new URL('http://localhost/api/frame/image')
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  return new NextRequest(url.toString())
}

// ---------------------------------------------------------------------------
// Response shape
// ---------------------------------------------------------------------------

describe('GET /api/frame/image', () => {
  it('returns status 200', async () => {
    const res = await GET(makeRequest())
    expect(res.status).toBe(200)
  })

  it('sets Content-Type to image/svg+xml', async () => {
    const res = await GET(makeRequest())
    expect(res.headers.get('Content-Type')).toBe('image/svg+xml')
  })

  it('sets Cache-Control header', async () => {
    const res = await GET(makeRequest())
    expect(res.headers.get('Cache-Control')).toContain('max-age=300')
  })

  it('returns a valid SVG string', async () => {
    const res = await GET(makeRequest())
    const body = await res.text()
    expect(body).toContain('<svg')
    expect(body).toContain('</svg>')
  })
})

// ---------------------------------------------------------------------------
// generateFrameImage action variants
// ---------------------------------------------------------------------------

describe('GET /api/frame/image – action messages', () => {
  it('default action (no params) renders the default title', async () => {
    const res = await GET(makeRequest())
    const body = await res.text()
    expect(body).toContain('OP Delegation Frame')
  })

  it('action=1 renders the delegation-sent title', async () => {
    const res = await GET(makeRequest({ action: '1' }))
    const body = await res.text()
    expect(body).toContain('Delegation Sent')
  })

  it('action=1 with delegate address includes the address in subtitle', async () => {
    const delegate = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
    const res = await GET(makeRequest({ action: '1', delegate }))
    const body = await res.text()
    expect(body).toContain(delegate)
  })

  it('action=1 with no delegate address falls back to "address"', async () => {
    const res = await GET(makeRequest({ action: '1' }))
    const body = await res.text()
    expect(body).toContain('address')
  })

  it('action=2 renders the undelegated title', async () => {
    const res = await GET(makeRequest({ action: '2' }))
    const body = await res.text()
    expect(body).toContain('Undelegated')
  })

  it('action=3 renders the voting-history title', async () => {
    const res = await GET(makeRequest({ action: '3' }))
    const body = await res.text()
    expect(body).toContain('Voting History')
  })

  it('unknown action falls back to the default message', async () => {
    const res = await GET(makeRequest({ action: '99' }))
    const body = await res.text()
    expect(body).toContain('OP Delegation Frame')
  })

  it('action=0 renders the default title explicitly', async () => {
    const res = await GET(makeRequest({ action: '0' }))
    const body = await res.text()
    expect(body).toContain('OP Delegation Frame')
  })
})
