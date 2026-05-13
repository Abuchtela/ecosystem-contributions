import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Parse the frame action from Farcaster
  const { trustedData } = body;
  const { frameButton, inputText, castId } = body;

  // Determine which action was taken
  const action = frameButton?.index;
  const delegateAddress = inputText || '';

  // Frame state (you can use Farcaster's image endpoint)
  const frameImageUrl = `${BASE_URL}/api/frame/image?action=${action}&delegate=${delegateAddress}`;
  
  let buttons: any[] = [];
  let inputPath = '';

  switch (action) {
    case 1:
      // User clicked "Delegate"
      buttons = [
        {
          label: '✓ Delegation Sent',
          action: 'post',
        },
        {
          label: 'Voting History',
          action: 'post',
          target: `${BASE_URL}/api/frame/voting-history`,
        },
      ];
      break;
      
    case 2:
      // User clicked "Undelegate"
      buttons = [
        {
          label: '✓ Undelegated',
          action: 'post',
        },
        {
          label: 'Back to Delegation',
          action: 'post',
          target: `${BASE_URL}/api/frame`,
        },
      ];
      break;
      
    case 3:
      // User clicked "Voting History"
      buttons = [
        {
          label: 'Delegate Again',
          action: 'post',
          target: `${BASE_URL}/api/frame`,
        },
        {
          label: 'Subscribe to Updates',
          action: 'post',
          target: `${BASE_URL}/api/frame/subscribe`,
        },
      ];
      break;
      
    default:
      // Initial state
      buttons = [
        {
          label: 'Delegate',
          action: 'post',
        },
        {
          label: 'Undelegate',
          action: 'post',
        },
        {
          label: 'Learn More',
          action: 'link',
          target: `${BASE_URL}/op-delegation`,
        },
      ];
      inputPath = 'Delegate to address...';
  }

  // Create the Frame HTML response
  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="og:title" content="OP Delegation Frame" />
        <meta property="og:description" content="Delegate your OP tokens directly in Farcaster" />
        <meta property="og:image" content="${frameImageUrl}" />
        
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${frameImageUrl}" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        
        ${inputPath ? `<meta property="fc:frame:input:text" content="${inputPath}" />` : ''}
        
        ${buttons.map((button, index) => `
          <meta property="fc:frame:button:${index + 1}" content="${button.label}" />
          <meta property="fc:frame:button:${index + 1}:action" content="${button.action}" />
          ${button.target ? `<meta property="fc:frame:button:${index + 1}:target" content="${button.target}" />` : ''}
        `).join('')}
        
        <meta property="fc:frame:post_url" content="${BASE_URL}/api/frame" />
      </head>
      <body></body>
    </html>
  `;

  return new NextResponse(frameHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

export async function GET(request: NextRequest) {
  const frameImageUrl = `${BASE_URL}/api/frame/image`;

  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="og:title" content="OP Delegation Frame" />
        <meta property="og:description" content="Delegate your OP tokens directly in Farcaster" />
        <meta property="og:image" content="${frameImageUrl}" />
        
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${frameImageUrl}" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        
        <meta property="fc:frame:input:text" content="Delegate to address (0x...)" />
        
        <meta property="fc:frame:button:1" content="🗳️ Delegate" />
        <meta property="fc:frame:button:1:action" content="post" />
        
        <meta property="fc:frame:button:2" content="↩️ Undelegate" />
        <meta property="fc:frame:button:2:action" content="post" />
        
        <meta property="fc:frame:button:3" content="📊 Voting History" />
        <meta property="fc:frame:button:3:action" content="post" />
        
        <meta property="fc:frame:post_url" content="${BASE_URL}/api/frame" />
      </head>
      <body></body>
    </html>
  `;

  return new NextResponse(frameHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
