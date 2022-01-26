import useSWR from "swr";
import type { PrismDAOMembership } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import usePrismDAOMembershipContract from "./usePrismDAOMembershipContract";
import { parseBalance } from "../util";

function getStatus(contract: PrismDAOMembership, ownerAddress: string, tokenAPIUri: string) {
  return async (_: string) => {
      const maxSupply = await contract.getMaximumMemberships();
      const totalSupply = await contract.totalSupply();
      const mintPrice = await contract.getMintPriceWei();
      const maxMint = await contract.getMaxMintBatchSize();
      const tokensOwned = await contract.balanceOf(ownerAddress);

      return {
        "totalSupply":totalSupply.toNumber(), 
        "maxSupply":maxSupply.toNumber(),
        "tokensOwned":tokensOwned.toNumber(),
        "baseUri":tokenAPIUri,
        "mintPrice":parseBalance(mintPrice),
        "maxMint":maxMint.toNumber()
      }; 
  };
}

export default function usePrismDAOMembershipStatus(
  contractAddress: string,
  ownerAddress: string,
  tokenAPIUri: string,
  suspense = false
) {
  const contract = usePrismDAOMembershipContract(contractAddress);

  const shouldFetch =
    typeof contractAddress === "string" &&
    !!contract;

  const result = useSWR(
    shouldFetch ? ["PrismDAOMembershipStatus", contractAddress] : null,
    getStatus(contract, ownerAddress, tokenAPIUri),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
