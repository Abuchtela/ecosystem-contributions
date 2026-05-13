import { NextRequest, NextResponse } from 'next/server';
import { getVotingHistory } from '@/lib/contract';

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const delegateAddress = body.inputText || '';

  if (!delegateAddress) {
    const frameHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${BASE_URL}/api/frame/image?action=3" />
          <meta property="fc:frame:button:1" content="Back to Delegation" />
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

  try {
    const history = await getVotingHistory(delegateAddress);
    
    const historyText = history
      .slice(0, 3)
      .map((v) => `${v.proposalTitle}: ${v.delegateVote.toUpperCase()}`)
      .join('\n');

    const frameHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${BASE_URL}/api/frame/image?action=3" />
          <meta property="fc:frame:button:1" content="Subscribe to Updates" />
          <meta property="fc:frame:button:1:action" content="post" />
          <meta property="fc:frame:button:1:target" content="${BASE_URL}/api/frame/subscribe" />
          <meta property="fc:frame:button:2" content="Back" />
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
