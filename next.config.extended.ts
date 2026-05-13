import type { Config } from 'next';

const config: Config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=600',
          },
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
      {
        source: '/api/frame/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/html',
          },
        ],
      },
    ];
  },
  env: {
    NEXT_PUBLIC_OPTIMISM_RPC_URL: process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL,
    NEXT_PUBLIC_DELEGATE_CONTRACT: process.env.NEXT_PUBLIC_DELEGATE_CONTRACT,
    NEXT_PUBLIC_OP_TOKEN_ADDRESS: process.env.NEXT_PUBLIC_OP_TOKEN_ADDRESS,
  },
};

export default config;
