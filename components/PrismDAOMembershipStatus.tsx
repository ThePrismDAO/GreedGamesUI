import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import usePrismDAOMembershipStatus from "../hooks/usePrismDAOMembershipStatus";
import usePrismDAOMint from "../hooks/usePrismDAOMint";

// pass the function for setting the state from index to this component
const PrismDAOMembershipStatus = ({tokenAPIUri, setContractAddress, setTotalSupply, setMaxSupply, setMintPrice, setPrismDAOMembershipEtherscan, setNumTokensOwned, numTokensToMint, mintPriceEth}) => {

  // get the web3 provider (metamask)
  const { library, account, chainId } = useWeb3React<Web3Provider>();

  let prismDAOMembershipContractAddress = "";
  let prismDAOMembershipEtherscan = "";
  let totalSupply = 0;
  let maxSupply = 3000;
  let numTokensOwned = 0;

  if(chainId == 42) {
      prismDAOMembershipContractAddress = "0xb0178cae4d95e9a85aad5cb40d6c4bcc4a0e741c";
      prismDAOMembershipEtherscan = "https://kovan.etherscan.io/token/"+prismDAOMembershipContractAddress;
  }
  if(chainId == 4) {
      prismDAOMembershipContractAddress = "0x35662DA30BdD0Dd99962C9D91548675b63Ca77Fb";
      prismDAOMembershipEtherscan = "https://rinkeby.etherscan.io/token/"+prismDAOMembershipContractAddress;
  }

  // update the status of the contract
  const memberStatus = usePrismDAOMembershipStatus(prismDAOMembershipContractAddress, account, tokenAPIUri).data;
  if(memberStatus !== undefined) {
    totalSupply = memberStatus['totalSupply'];
    maxSupply = memberStatus['maxSupply'];
    mintPriceEth = memberStatus['mintPrice'];
    numTokensOwned = memberStatus['tokensOwned'];
  }

  // get the mint tx call to pass as an onclick event
  const callMint = usePrismDAOMint(prismDAOMembershipContractAddress, numTokensToMint, library, mintPriceEth);

  // update the interface in index
  //setBaseURI(baseURI);
  setTotalSupply(totalSupply);
  setMaxSupply(maxSupply);
  setMintPrice(mintPriceEth);
  setPrismDAOMembershipEtherscan(prismDAOMembershipEtherscan);
  setNumTokensOwned(numTokensOwned);
  setContractAddress(prismDAOMembershipContractAddress);
  
  return (
    <button 
    className="px-4 py-1 m-2 text-lg lg:text-xl lg:px-6 lg:py-2 xl:text-2xl xl:px-8 xl:py-3 font-medium text-white rounded-sm outline outline-2 bg-black/30 hover:bg-white/30 hover:text-white hover:outline-white z-10"
    onClick={callMint}
  >+ Mint Gladiators</button>
  )
};

export default PrismDAOMembershipStatus;
