import usePrismDAOMembershipContract from "./usePrismDAOMembershipContract";

export async function withdraw(contract, library) {
  const signer = await library.getSigner();
  contract.connect(signer);
  const tx = await contract.withdraw();
}

export default function usePrismDAOWithdraw(
  contractAddress, library
  ) {
    const contract = usePrismDAOMembershipContract(contractAddress);
    const callWithdraw = () => {
      let receipt = withdraw(contract, library);
      console.log("sent with tx hash:",receipt);
    }
  
    return callWithdraw;
  }