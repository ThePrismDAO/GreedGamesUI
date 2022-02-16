import usePrismDAOMembershipContract from "./usePrismDAOMembershipContract";
import { ethers } from "ethers";

export async function payWithMetamask(contract, library, numberToMint, strEther) {
  const signer = await library.getSigner();
  contract.connect(signer);
  const tx = await contract.mintMemberships(numberToMint, {value: ethers.utils.parseUnits(strEther, 'ether').toHexString()});
}

export default function usePrismDAOMembershipStatus(
contractAddress, numberToMint, library, mintPriceEth
) {
  const contract = usePrismDAOMembershipContract(contractAddress);
  const totalMintPrice = (mintPriceEth * numberToMint).toString();
  const callMint = () => {
    let receipt = payWithMetamask(contract, library, numberToMint, totalMintPrice);
    console.log("sent with tx hash:",receipt);
  }

  return callMint;
}

