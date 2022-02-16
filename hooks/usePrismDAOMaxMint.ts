import usePrismDAOMembershipContract from "./usePrismDAOMembershipContract";

export async function withdraw(contract, library) {
  const signer = await library.getSigner();
  contract.connect(signer);
  const tx = await contract.changeMaxMintBatchSize(7);
}

export default function usePrismDAOMaxMint(
  contractAddress, library
  ) {
    const contract = usePrismDAOMembershipContract(contractAddress);
    const callMaxMint = () => {
      let receipt = withdraw(contract, library);
      console.log("sent with tx hash:",receipt);
    }
  
    return callMaxMint;
  }