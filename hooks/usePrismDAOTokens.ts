import useSWR from "swr";
import type { PrismDAOMembership } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import usePrismDAOMembershipContract from "./usePrismDAOMembershipContract";
import { SetStateAction, useEffect, useState } from "react";

function updateTokenValue(index, attribute, tokens, setTokens, value) {
    // update the tokens owner with the owner address once we get that value
    tokens[index][attribute] = value;
    setTokens(tokens);
}

 function getTokens(contract: PrismDAOMembership, ownerAddress: string, tokenAPIUri: string, tokens, setTokens) {
   return async (_: string) => {
       const totalSupply = await contract.totalSupply();
       // get ownership info of each token
       const guilds = ["Blue","Red","Green","White","Purple","Gold","Black"];
   
        // init
        if(tokens.length < 1) {
            console.log('building tokens array');
            for (var i = 0; i < totalSupply.toNumber(); i++) {
                const guild = guilds[i % 7];
                const tokenData = {"tokenIndex": i, "owner": "", "guild":guild};
                tokens.push(tokenData);
            }

            // it takes same time to check the owner of every token
            // this waits for the owner information then updates the tokens state when it gets in
            if(totalSupply !== undefined) {
                for (var i = 0; i < totalSupply.toNumber(); i++) {
                  // get the owner
                  contract.ownerOf(i).then(updateTokenValue.bind(null, i, "owner", tokens, setTokens));
                }
            }
        }
        
       return tokens;
   };
 }

 export default function usePrismDAOTokens(
   contractAddress: string,
   ownerAddress: string,
   tokenAPIUri: string,
   suspense = false
 ) {
   const [tokens, setTokens] = useState([]);
   
   const contract = usePrismDAOMembershipContract(contractAddress);

   const shouldFetch =
     typeof contractAddress === "string" &&
     !!contract;
 
   const result = useSWR(
     shouldFetch ? ["PrismDAOTokens", contractAddress] : null,
     getTokens(contract, ownerAddress, tokenAPIUri, tokens, setTokens),
     {
       suspense,
     }
   );
 
   useKeepSWRDataLiveAsBlocksArrive(result.mutate)

   return result;
 }
 
