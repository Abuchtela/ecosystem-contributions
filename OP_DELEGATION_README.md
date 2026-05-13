# OP Delegation Frame

A Farcaster frame and web application for delegating OP governance tokens directly from Farcaster, increasing governance accessibility and participation.

## 📋 Overview

**OP Delegation Frame** enables OP token holders to delegate their voting power to trusted community members directly through a Farcaster frame. This project addresses a key governance objective: increasing votable supply and reducing the ossification of delegate power.

### Features

- 🗳️ **Delegate Directly from Farcaster** — Cast a frame to delegate OP tokens without leaving the social platform
- 📊 **View Delegate Voting History** — See voting records, percentages, and proposals voted on
- 🔔 **Subscribe to Updates** — Get notified when your delegate votes on new proposals
- ↩️ **Easy Undelegation** — Remove your delegation with a single action
- 👥 **Delegate Profiles** — View delegate information, followers, and voting patterns

## 🏗️ Architecture

### Farcaster Frame (`/api/frame`)
- Interactive frame for delegation actions
- Supports input fields, buttons, and state transitions
- Generates dynamic SVG images with voting data

### Web Application (`/op-delegation`)
- Full-featured delegation interface
- Real-time delegate information
- Voting history timeline
- Subscription management

### Smart Contract Integration (`/lib/contract.ts`)
- OP token delegation (address: `0x4200000000000000000000000000000000000042`)
- Voting history queries
- Delegation state management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Visit `http://localhost:3000/op-delegation` to see the app.

### Farcaster Frame URL
Add this as a Farcaster frame to your post:
```
http://localhost:3000/api/frame
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── frame/
│   │       ├── route.ts          # Main frame endpoint
│   │       ├── image/
│   │       │   └── route.ts      # Frame image generation
│   │       ├── voting-history/
│   │       │   └── route.ts      # Voting history endpoint
│   │       └── subscribe/
│   │           └── route.ts      # Subscription endpoint
│   └── op-delegation/
│       └── page.tsx              # Main delegation UI
├── lib/
│   ├── types.ts                  # TypeScript interfaces
│   └── contract.ts               # Blockchain interactions
└── globals.css                   # Global styles
```

## 🔗 API Endpoints

### `POST /api/frame`
Handles Farcaster frame interactions. Supports:
- Initial frame load
- Delegation actions
- Undelegation
- Voting history queries

### `GET /api/frame/image`
Generates SVG images for frame states.

### `POST /api/frame/voting-history`
Returns delegate voting history within the frame.

### `POST /api/frame/subscribe`
Subscribes user to delegate voting updates.

## 🧪 Testing

Test the frame using:
- **Farcaster Devtools** — https://framedev.xyz
- **Web UI** — `http://localhost:3000/op-delegation`

### Example Frame Test
```
URL: http://localhost:3000/api/frame
Delegate Address: 0xabcdefabcdefabcdefabcdefabcdefabcdefabcd
```

## ⚙️ Configuration

Environment variables (add to `.env.local`):
```env
OPTIMISM_RPC_URL=https://mainnet.optimism.io
NEXT_PUBLIC_DELEGATE_CONTRACT=0x489aa610671495d07cc33da88b482406e1d6b44b
```

## 🎯 Why This Matters

1. **Increases Governance Accessibility** — Lower barrier to delegation
2. **Boosts Votable Supply** — More OP tokens participate in governance
3. **Reduces Capture Risk** — Enables new delegates to emerge
4. **Improves Voter Mobility** — Community members can build delegate platforms

## 🔄 Future Enhancements

- [ ] Live blockchain data integration (migrate from mock data)
- [ ] Farcaster Frame v2 native features
- [ ] Email/Discord notifications for voting updates
- [ ] Delegate leaderboards
- [ ] Multi-signature delegation support
- [ ] Historical delegate comparison
- [ ] Real-time voting analytics

## 📚 Resources

- [Farcaster Frames Documentation](https://docs.farcaster.xyz/developers/frames/overview)
- [OP Governance](https://governance.optimism.io)
- [Optimism Mainnet RPC](https://mainnet.optimism.io)

## 🤝 Contributing

This is an ecosystem contribution to Optimism. To contribute:

1. Fork the [ecosystem-contributions](https://github.com/ethereum-optimism/ecosystem-contributions) repo
2. Create a feature branch
3. Submit a pull request

## 📄 License

Licensed under the MIT License - see LICENSE file for details.

---

**Status**: Project Idea → In Development
**Effort**: Small
**Skills**: Backend Development
**Category**: Dapp Idea
