import useSWR from "swr";
import type { PrismDAOMembership } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import usePrismDAOMembershipContract from "./usePrismDAOMembershipContract";
import { useEffect, useState } from "react";
 
function getTotalSupply(contract: PrismDAOMembership) {
  return async (_: string, address: string) => {
    const totalSupply = await contract.totalSupply();

    return totalSupply.toNumber();
  };
}

export default function usePrismDAOTotalSupply(
  contractAddress: string,
  suspense = false
) {
  const contract = usePrismDAOMembershipContract(contractAddress);

  const shouldFetch =
    typeof contractAddress === "string" &&
    !!contract;

  const result = useSWR(
    shouldFetch ? ["TotalSupply", contractAddress] : null,
    getTotalSupply(contract),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
