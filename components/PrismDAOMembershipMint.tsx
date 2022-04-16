import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import usePrismDAOMint from "../hooks/usePrismDAOMint";

// pass the function for setting the state from index to this component
const PrismDAOMembershipMint = ({prismDAOMembershipContractAddress, numTokensToMint, mintPriceEth}) => {

  // get the web3 provider (metamask)
  const { library, account, chainId } = useWeb3React<Web3Provider>();

  // get the mint tx call to pass as an onclick event
  const callMint = usePrismDAOMint(prismDAOMembershipContractAddress, numTokensToMint, library, mintPriceEth);

  
  return (
    <button 
    className="px-4 py-1 m-2 text-lg lg:text-xl lg:px-6 lg:py-2 xl:text-2xl xl:px-8 xl:py-3 font-medium text-white rounded-sm outline outline-2 bg-black/30 hover:bg-white/30 hover:text-white hover:outline-white z-10"
    onClick={callMint}
  >+ Mint Gladiators</button>
  )
  
  
};

export default PrismDAOMembershipMint;
