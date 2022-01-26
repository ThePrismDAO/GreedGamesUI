import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import useENSName from "../hooks/useENSName";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { formatEtherscanLink, shortenHex } from "../util";

type AccountProps = {
  triedToEagerConnect: boolean;
};

const Account = ({ triedToEagerConnect }: AccountProps) => {
  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const ENSName = useENSName(account);

  if (error) {
    console.log(error);
    return (
      <div className="h-14">
        <a className="px-4 py-1 inline-block font-medium text-white rounded-full border-white border-2 hover:bg-white hover:text-black"
        >
          {error.message}
        </a>
      </div>
    );
  }

  if (!triedToEagerConnect) {
    console.log('triedToEagerConnect');
    return null;
  }

  if (typeof account !== "string") {
    return ( 
      <div className="h-14">
        {isWeb3Available ? (
          <button
            className="px-4 py-1 inline-block font-medium text-white rounded-full border-white border-2 hover:bg-white hover:text-black"
            disabled={connecting}
            onClick={() => {
              setConnecting(true);

              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          >
            {isMetaMaskInstalled ? "Connect to MetaMask" : "Connect to Wallet"}
          </button>
        ) : (
          <button className="px-4 py-1 inline-block font-medium text-white rounded-full border-white border-2 hover:bg-white hover:text-black" onClick={startOnboarding}>Install Metamask</button>
        )}
      </div>
    );
  }

  return (
    <div className="h-14">
      <a className="px-4 py-1 inline-block font-medium text-white rounded-full border-white border-2 hover:bg-white hover:text-black"
        {...{
          href: formatEtherscanLink("Account", [chainId, account]),
          target: "_blank",
          rel: "noopener noreferrer",
        }}
      >
        {ENSName || `${shortenHex(account, 4)}`}
      </a>
    </div>
  );
};

export default Account;
