# PrismDAO Minting UI

[See the deployed app here.](https://greed-games-ui.vercel.app/)

## Features

1. NFT minting using [Azuki's ERC721A](https://www.azuki.com/erc721a) implementation, which drastically reduces minting costs when minting in batches. It otherwise follows the NFT standard.
2. **PrismDAOMemberships.sol** deployed to both Kovan and Rinkeby allows owner to set max supply, mint price, max mint batch size, changing API baseUri, changing to new owner, and revoking ownership.
3. UI updates with live supply, max supply, and mint price in realtime.
4. Loads minted NFTs via API and lets you create a team of 3 gladiators from the NFTs you own. This sort-of works when you uncomment the commented block of code in **usePrismDAOMembershipStatus.ts**. Sometimes i have to add and remove it to get it to work. Not sure why it bugs out some of the time and not others, probably need to catch some state to filter out the times it breaks.

## To Do

1. Error handling.
2. Have max batch size load from contract value.
3. Get rid of warnings about hook order.
4. Limit mint owernship to a max value. I think this is best done on the frontend as it would increase cost to do it in the contract and you can just switch addresses to get around it anyway.

## Kovan Tesnet

The contract is [deployed to the Kovan testnet](https://kovan.etherscan.io/token/0xb0178CAe4d95E9A85aAd5cb40d6C4bcC4a0E741c) (chain id 42). Make sure to switch your metamask to Kovan and grab some [Kovan ETH from the Chainlink Faucet](https://faucets.chain.link/).

## Rinkeby Testnet

The contract is [deployed to the Rinkeby testnet](https://rinkeby.etherscan.io/token/0xb0178CAe4d95E9A85aAd5cb40d6C4bcC4a0E741c) (chain id 4). [Opensea is on the Rinkeby testnet](https://docs.opensea.io/reference/rinkeby-api-overview) so that is a logical next step to test the API. [Rinkeby faucet here](https://faucets.chain.link/rinkeby).

## Getting Started

First, install deps:

```yarn install```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

### Auto Contract Type Generation

**Note**: After adding in your new contract ABIs (in JSON format) to the `/contracts` folder, run `yarn compile-contract-types` to generate the types.

You can import these types when declaring a new Contract hook. The types generated show the function params and return types of your functions, among other helpful types. 

```ts
import MY_CONTRACT_ABI from "../contracts/MY_CONTRACT.json";
import type { MY_CONTRACT } from "../contracts/types";
import useContract from "./useContract";

export default function useMyContract() {
  return useContract<MY_CONTRACT>(CONTRACT_ADDRESS, MY_CONTRACT_ABI);
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!