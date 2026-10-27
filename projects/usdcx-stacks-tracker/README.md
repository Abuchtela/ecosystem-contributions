# USDCx Stacks Tracker

A read-only browser dashboard for live USDCx wallet balances and fungible-token transfers on Stacks mainnet and testnet. **No mocked balances, transactions, or demo data.**

## Run
Open `index.html` in a modern browser or serve this folder using `python3 -m http.server 8000`. Enter a real Stacks wallet address and select its network.

## Sources
- Official contract identifiers: https://docs.stacks.co/learn/bridging/usdcx/contracts
- Hiro v3 balance API: https://docs.hiro.so/en/apis/stacks-blockchain-api/v1-to-v3-migration
- Hiro FT transfer API: https://docs.hiro.so/en/apis/stacks-blockchain-api/reference/transactions/get-principal-ft-transfers

## Scope and verification
The tracker never signs transactions, stores private keys, bridges assets, or claims payment settlement. API failures are displayed rather than substituted with fabricated values. It requires live access to Hiro. Production deployment and live-browser integration testing must be verified separately. USDCx uses six decimals; asset identifier is `<contract>::usdcx`.
