import { NextRequest, NextResponse } from 'next/server';
import { subscribeToUpdates } from '@/lib/contract';

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    // In production, get actual user address from Farcaster verified data
    const mockUserAddress = '0x1234567890123456789012345678901234567890';
    const mockDelegateAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';

    const success = await subscribeToUpdates(mockUserAddress, mockDelegateAddress);

    const frameHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${BASE_URL}/api/frame/image?action=1" />
          <meta property="fc:frame:button:1" content="View Voting History" />
          <meta property="fc:frame:button:1:action" content="post" />
          <meta property="fc:frame:button:1:target" content="${BASE_URL}/api/frame/voting-history" />
          <meta property="fc:frame:button:2" content="Unsubscribe" />
          <meta property="fc:frame:button:2:action" content="post" />
          <meta property="fc:frame:button:2:target" content="${BASE_URL}/api/frame" />
        </head>
      </html>
    `;

    return new NextResponse(frameHtml, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    const frameHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${BASE_URL}/api/frame/image?action=0" />
          <meta property="fc:frame:button:1" content="Try Again" />
          <meta property="fc:frame:button:1:action" content="post" />
          <meta property="fc:frame:button:1:target" content="${BASE_URL}/api/frame" />
        </head>
      </html>
    `;
    return new NextResponse(frameHtml, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}
