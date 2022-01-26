import MY_CONTRACT_ABI from "../contracts/PrismDAOMembership.json";
import type { PrismDAOMembership } from "../contracts/types";
import useContract from "./useContract";

export default function usePrismDAOMembershipContract(contractAddress?: string) {
    return useContract<PrismDAOMembership>(contractAddress, MY_CONTRACT_ABI);
}    