import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useETHBalance from "../hooks/useETHBalance";
import { parseBalance } from "../util";
import usePrismDAOMembershipStatus from "../hooks/usePrismDAOMembershipStatus";

const ETHBalance = ({chain, setChain, setFaucet, tokenAPIUri, setContractAddress, setTotalSupply, setMaxSupply, setMintPrice, setPrismDAOMembershipEtherscan, setNumTokensOwned, mintPriceEth}) => {
  const { library, account, chainId } = useWeb3React<Web3Provider>();
  const { data } = useETHBalance(account);

  let chainMsg = "Switch to Rinkeby to mint";
  let faucet = "https://faucets.chain.link/";
  let balance = parseBalance(data ?? "0");
  let prismDAOMembershipContractAddress = "";
  let prismDAOMembershipEtherscan = "";
  let totalSupply = 0;
  let maxSupply = 3000;
  let numTokensOwned = 0;

  if(chain != "") {
    chainMsg = chain;
  } 
  
  if(chainId == 42) {
    faucet = "https://faucets.chain.link/kovan";
    chain = "Kovan Testnet";
    prismDAOMembershipContractAddress = "0xb0178cae4d95e9a85aad5cb40d6c4bcc4a0e741c";
      prismDAOMembershipEtherscan = "https://kovan.etherscan.io/token/"+prismDAOMembershipContractAddress;
  }
  if(chainId == 4) {
    faucet = "https://faucets.chain.link/rinkeby";
    chain = "Rinkeby Testnet";
    prismDAOMembershipContractAddress = "0x35662DA30BdD0Dd99962C9D91548675b63Ca77Fb";
    prismDAOMembershipEtherscan = "https://rinkeby.etherscan.io/token/"+prismDAOMembershipContractAddress;
  }
  if(chainId == 1) {
    faucet = "";
    chain = "Ethereum Mainnet";
    prismDAOMembershipContractAddress = "0x38d6a323ca5e083d7f53eab61d8ac41e58de2146";
    prismDAOMembershipEtherscan = "https://etherscan.io/token/"+prismDAOMembershipContractAddress;
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
 
  // update the status of the contract
  const memberStatus = usePrismDAOMembershipStatus(prismDAOMembershipContractAddress, account, tokenAPIUri).data;
  if(memberStatus !== undefined) {
    totalSupply = memberStatus['totalSupply'];
    maxSupply = memberStatus['maxSupply'];
    mintPriceEth = memberStatus['mintPrice'];
    numTokensOwned = memberStatus['tokensOwned'];
  }

  // update the interface in index
  //setBaseURI(baseURI);
  setTotalSupply(totalSupply);
  setMaxSupply(maxSupply);
  setMintPrice(mintPriceEth);
  setPrismDAOMembershipEtherscan(prismDAOMembershipEtherscan);
  setNumTokensOwned(numTokensOwned);
  setContractAddress(prismDAOMembershipContractAddress);

  const faucetComponent = <p><a className="text-white hover:opacity-70 text-green-300" href={faucet} target="_BLANK" rel="noopener noreferrer">{chain} Faucet</a></p>

  return (
    <div>
      <p><b>[{chainMsg}]</b></p>
      {chainId > 1 ? faucetComponent : ""}
      <p>Balance: Ξ{balance} </p>
    </div>
  )
};

export default ETHBalance;
