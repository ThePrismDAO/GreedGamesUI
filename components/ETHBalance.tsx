import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useETHBalance from "../hooks/useETHBalance";
import { parseBalance } from "../util";

const ETHBalance = ({chain, setChain, setFaucet}) => {
  const { library, account, chainId } = useWeb3React<Web3Provider>();
  const { data } = useETHBalance(account);

  let chainMsg = "Switch to Rinkeby to mint";
  let faucet = "https://faucets.chain.link/";
  let balance = parseBalance(data ?? "0");

  if(chain != "") {
    chainMsg = chain;
  } 
  
  if(chainId == 42) {
    faucet = "https://faucets.chain.link/kovan";
    chain = "Kovan Testnet";
  }
  if(chainId == 4) {
    faucet = "https://faucets.chain.link/rinkeby";
    chain = "Rinkeby Testnet";
  }
  if(chainId == 1) {
    faucet = "https://faucets.chain.link/";
    chain = "Ethereum Mainnet] [Switch to Rinkby to mint";
  } else {
    // show message if they arent on main net to get eth
    if(parseFloat(balance) < 0.02) {
      chainMsg = "Get some "+chain+" ETH from the faucet to mint";
    }
  }
  
  if(chain == "") {
    chainMsg = "Connect your MetaMask to Rinkeby to begin"
  }

  // set the chain state everything else uses
  setChain(chain);
  setFaucet(faucet);

  return (
    <div>
      <p><b>[{chainMsg}]</b></p>
      <p><a className="text-white hover:opacity-70 text-green-300" href={faucet} target="_BLANK" rel="noopener noreferrer">{chain} Faucet</a></p>
      <p>Balance: Ξ{balance} </p>
    </div>
  )
};

export default ETHBalance;
