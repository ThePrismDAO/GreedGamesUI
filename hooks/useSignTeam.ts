export async function signWithMetamask(library, message) {
  const signer = await library.getSigner();
  const tx = await signer.signMessage(message);
}


export default function useSignTeam(
library, message
) {
  const callMint = () => {
    let receipt = signWithMetamask(library, message);
    console.log("sent with tx hash:",receipt);
  }

  return callMint;
}
