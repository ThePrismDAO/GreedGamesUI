import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import usePrismDAOMaxSupply from "../hooks/usePrismDAOMaxSupply";
import usePrismDAOMaxMint from "../hooks/usePrismDAOMaxMint";
import usePrismDAOWithdraw from "../hooks/usePrismDAOWithdraw";

// pass the function for setting the state from index to this component
const PrismDAOAdmin = ({prismDAOMembershipContractAddress}) => {

  // get the web3 provider (metamask)
  const { library, account, chainId } = useWeb3React<Web3Provider>();

  // get the withdraw tx call to pass as an onclick event
  const callWithdraw = usePrismDAOWithdraw(prismDAOMembershipContractAddress, library);
  const callSupply = usePrismDAOMaxSupply(prismDAOMembershipContractAddress, library);
  const callMaxMint = usePrismDAOMaxMint(prismDAOMembershipContractAddress, library);
  
  return (
      <div>
          <button 
    className="px-4 py-1 m-2 text-lg lg:text-xl lg:px-6 lg:py-2 xl:text-2xl xl:px-8 xl:py-3 font-medium text-white rounded-sm outline outline-2 bg-black/30 hover:bg-white/30 hover:text-white hover:outline-white z-10"
    onClick={callWithdraw}
  >Withdraw</button>
  <button 
    className="px-4 py-1 m-2 text-lg lg:text-xl lg:px-6 lg:py-2 xl:text-2xl xl:px-8 xl:py-3 font-medium text-white rounded-sm outline outline-2 bg-black/30 hover:bg-white/30 hover:text-white hover:outline-white z-10"
    onClick={callSupply}
  >Set Supply 1500</button>
  <button 
    className="px-4 py-1 m-2 text-lg lg:text-xl lg:px-6 lg:py-2 xl:text-2xl xl:px-8 xl:py-3 font-medium text-white rounded-sm outline outline-2 bg-black/30 hover:bg-white/30 hover:text-white hover:outline-white z-10"
    onClick={callMaxMint}
  >Set Max Mint 7</button>
      </div>

  )
};

export default PrismDAOAdmin;
