export async function signWithMetamask(account, library, message) {
  // sign the message and return the promise
  const signer = await library.getSigner();
  const tx = await signer.signMessage(message);
  return tx;
}

export default function useSignTeam(
account, library, message, setRegisterTeamTx
) {
  const callMint = () => {
    let tx = signWithMetamask(account, library, message);
    tx.then((data) => {
      setRegisterTeamTx(data)
    });
  }

  return callMint;
}
