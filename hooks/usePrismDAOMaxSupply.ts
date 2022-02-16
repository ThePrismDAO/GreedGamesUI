import usePrismDAOMembershipContract from "./usePrismDAOMembershipContract";

export async function changeSupply(contract, library) {
  const signer = await library.getSigner();
  contract.connect(signer);
  const tx = await contract.changeMaxMemberships(1500);
}

export default function usePrismDAOMaxSupply(
  contractAddress, library
  ) {
    const contract = usePrismDAOMembershipContract(contractAddress);
    const callSupply = () => {
      let receipt = changeSupply(contract, library);
      console.log("sent with tx hash:",receipt);
    }
  
    return callSupply;
  }