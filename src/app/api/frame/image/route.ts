import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action') || '0';
  const delegate = searchParams.get('delegate') || '';

  // Create a simple SVG image for the frame
  // In production, you'd use a proper image generation library
  const imageContent = generateFrameImage(action, delegate);

  return new NextResponse(imageContent, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'max-age=300',
    },
  });
}

function generateFrameImage(action: string, delegate: string): string {
  const messages: { [key: string]: { title: string; subtitle: string } } = {
    '0': {
      title: 'OP Delegation Frame',
      subtitle: 'Delegate your OP tokens directly in Farcaster',
    },
    '1': {
      title: '🗳️ Delegation Sent!',
      subtitle: `Delegated to ${delegate || 'address'}`,
    },
    '2': {
      title: '↩️ Undelegated',
      subtitle: 'Your delegation has been removed',
    },
    '3': {
      title: '📊 Voting History',
      subtitle: 'Delegate voting statistics and breakdown',
    },
  };

  const msg = messages[action] || messages['0'];

  return `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FF0420;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FF6B35;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <rect width="1200" height="630" fill="url(#grad1)"/>
      
      <!-- Content -->
      <g>
        <text x="600" y="200" font-size="72" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial, sans-serif">
          ${msg.title}
        </text>
        
        <text x="600" y="320" font-size="48" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="Arial, sans-serif">
          ${msg.subtitle}
        </text>
        
        <text x="600" y="500" font-size="32" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="Arial, sans-serif">
          OP Mainnet Governance
        </text>
      </g>
    </svg>
  `;
}
