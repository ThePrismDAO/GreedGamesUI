import useSWR from "swr";
import type { PrismDAOMembership } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import usePrismDAOMembershipContract from "./usePrismDAOMembershipContract";
import { useEffect, useState } from "react";

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

 function updateTokens(contractAddress: string, ownerAddress: string, tokenAPIUri: string, numTokensOwned: number, suspense = false, tokens, setTokens) {
    const contract = usePrismDAOMembershipContract(contractAddress);

    const shouldFetch =
      typeof contractAddress === "string" &&
      !!contract;

    const result = useSWR(
      shouldFetch ? ["PrismDAOTokens", contractAddress, numTokensOwned] : null,
      getTokens(contract, ownerAddress, tokenAPIUri, tokens, setTokens),
      {
        suspense,
      }
    );

    useKeepSWRDataLiveAsBlocksArrive(result.mutate)

    // return empty if we dont have the data, return the data if we do
    let r = [];
    if(result.data !== undefined) r = result.data;

    return r;
 }

 export default function usePrismDAOTokens(
   contractAddress: string,
   ownerAddress: string,
   tokenAPIUri: string,
   numTokensOwned: number,
   suspense = false
 ) {
   const [tokens, setTokens] = useState([]);
   let r = updateTokens(contractAddress, ownerAddress,tokenAPIUri, numTokensOwned, suspense, tokens, setTokens);
   
   // use effect to keep the token data updated
   useEffect(() => {
      // get the oken ownership data and pass it through to the team select page
      console.log("Num tokens owned changed",numTokensOwned);
      
   }, [numTokensOwned]);

   return tokens;
 }
 
