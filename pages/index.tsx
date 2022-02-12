import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import Background from "../components/Background";
import AppContent from "../components/AppContent";
import { useEffect, useState } from "react";
import { FaDiscord, FaTwitter, FaMedium} from 'react-icons/fa';
import usePrismDAOMembershipContract from "../hooks/usePrismDAOMembershipContract";
import usePrismDAOMembershipStatus from "../hooks/usePrismDAOMembershipStatus";


enum Guild {
  Blue,
  Red,
  Green,
  White,
  Purple,
  Gold,
  Black,
}

type Token = {
  tokenIndex: number;
  owner: string;
  guild: string;
}

function Home() {
  const { account, library } = useWeb3React();
  const triedToEagerConnect = useEagerConnect();
  
  const [barWidth, setBarWidth] = useState("2%");
  const [numTokensMinted, setTotalSupply] = useState(11);
  const [numTokensAvailable, setMaxSupply] = useState(3333);
  const [numTokensToMint, setNumTokensToMint] = useState(10);
  const [mintPriceEth, setMintPrice] = useState(0.001);
  const [prismDAOMembershipEtherscan, setPrismDAOMembershipEtherscan] = useState("");
  const [prismDAOMembershipContractAddress, setPrismDAOMembershipContractAddress] = useState("");
  const [chain, setChain] = useState("");
  const [faucet, setFaucet] = useState("https://faucets.chain.link/");
  const [numTokensOwned, setNumTokensOwned] = useState(1);
  const [gameStatus, setGameStatus] = useState("Unconnected");
  
  const tokenAPIUri = "https://member.greed.games/";

  const contract = usePrismDAOMembershipContract(prismDAOMembershipContractAddress);
  const { data: membershipData } = usePrismDAOMembershipStatus(prismDAOMembershipContractAddress, account, tokenAPIUri)
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    setBarWidth( (numTokensMinted / numTokensAvailable * 100) + "%")
  }, [numTokensAvailable, numTokensMinted])

  useEffect(() => {
    const totalSupply = membershipData?.totalSupply;
    // run this if we totalSupply is greater than the number of tokens we're keeping track of
    if(contract && totalSupply > tokens.length){
      console.log('totalSupply', totalSupply);
      console.log('tokens.length',tokens.length);
      // iterate so we can add new tokens (w/out owner info at first)
      for(var i = tokens.length; i < totalSupply; i++){
        // token w/out owner
        const token: Token = {
          tokenIndex: i,
          owner: '',
          guild: Guild[i % 7]
        };
        
        // add the token w/out owner
        setTokens(prevTokens => [...prevTokens, token]);

        // try to get owner of the token
        contract.ownerOf(i).then((ownerAddress) => {
          // once we get the owner, update the owner for the token at the correct index
          setTokens(existingTokens => {
            return existingTokens.map((token, index) => {
              return index == i ? {...token, owner: ownerAddress} : token;
            })
          })
        })
      }
    }
  }, [membershipData]);
 
  // <a className="text-white hover:opacity-70" href="https://twitter.com/TheGreedGames" target="_BLANK" rel="noopener noreferrer"><FaTwitter  size="2.5em"  /> </a>
  return (
    
    <div>
      <Head>
        <title>GREED GAMES</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Background>
        <div className="w-full flex flex-col p-2">
          <div className="flex flex-row-reverse">
            <nav>
              <div className="right-nav inset-y-2 right-2 text-right">
                <div className="wallet"><Account triedToEagerConnect={triedToEagerConnect} /></div>
                <div className="socials  absolute sm:relative sm:top-0">
                  <a className="text-white hover:opacity-70 whitelist glow Gold-glow selected hidden sm:block" href="https://discord.gg/6vzvXKSnDb" target="_BLANK" rel="noopener noreferrer">WHITELIST ON DISCORD ☛ </a>
                  <a className="text-white hover:opacity-70 glow Gold-glow selected" href="https://discord.gg/6vzvXKSnDb" target="_BLANK" rel="noopener noreferrer"><FaDiscord size="2.5em" /> </a>
                  <a className="text-white hover:opacity-70" href="https://medium.com/@greed.games" target="_BLANK" rel="noopener noreferrer"><FaMedium   size="2.5em" /> </a>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold text-white text-right select-none z-1 clear">
                  <div className="">GREED GAMES</div>
                  <div className="mt-1 text-[1.25rem] md:text-[2.35rem]">A <b>PrismDAO</b> Spectacle</div>
                </h1>

                <ul className="absolute mr-0 sm:mr-5 text-left sm:text-right sm:relative top-8 sm:top-0 left-4 mt-8 sm:mt-8 flex-row space-y-0 sm:flex-col sm:space-y-2 font-medium text-lg ">
                  <li className="mr-0">
                    <a className="text-white hover:opacity-70" href="https://opensea.io/collection/prismdao-membership?search[sortAscending]=false&search[sortBy]=CREATED_DATE" target="_BLANK" rel="noopener noreferrer">Trade Gladiators</a>
                  </li>
                  <li className="mr-0">
                    <a className="text-white hover:opacity-70" href="/PrismDAO White Paper.pdf" target="_BLANK" rel="noopener noreferrer">White Paper</a>
                  </li>
                  <li className="mr-0">
                    <a className="text-white hover:opacity-70" href="https://github.com/ThePrismDAO/GreedGamesUI" target="_BLANK" rel="noopener noreferrer">Repository</a>
                  </li>
                  <li className="mr-0">
                    <a className="text-white hover:opacity-70" href={prismDAOMembershipEtherscan} target="_BLANK" rel="noopener noreferrer">Contract</a>
                  </li>
                 
                </ul>

              </div>
            </nav>
          </div>

          <main role="main" className="w-full">
            <div className='flex relative justify-center main-container'>
              <div className="bg-black/10 blur-lg absolute h-80 w-10/12 md:w-8/12 lg:w-6/12 2xl:w-6/12  sm:bg-black/40 "></div>
              <AppContent account={account} library={library} chain={chain} prismDAOMembershipContractAddress={prismDAOMembershipContractAddress} numTokensOwned={numTokensOwned} gameStatus={gameStatus} setGameStatus={setGameStatus} tokenAPIUri={tokenAPIUri} numTokensMinted={numTokensMinted} numTokensAvailable={numTokensAvailable} barWidth={barWidth} numTokensToMint={numTokensToMint} setNumTokensToMint={setNumTokensToMint} mintPriceEth={mintPriceEth} setTotalSupply={setTotalSupply} setMaxSupply={setMaxSupply} setMintPrice={setMintPrice} setPrismDAOMembershipEtherscan={setPrismDAOMembershipEtherscan} setNumTokensOwned={setNumTokensOwned} tokens={tokens} />
      
            </div>
          </main>
        </div>
        <div className="network-status">
          <ETHBalance chain={chain} setChain={setChain} setFaucet={setFaucet} tokenAPIUri={tokenAPIUri} setContractAddress={setPrismDAOMembershipContractAddress} setTotalSupply={setTotalSupply} setMaxSupply={setMaxSupply} setMintPrice={setMintPrice} setPrismDAOMembershipEtherscan={setPrismDAOMembershipEtherscan} setNumTokensOwned={setNumTokensOwned} mintPriceEth={mintPriceEth} />
        </div>
      </Background>
      {/* <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: right;
        }
      `}</style> */}
    </div>
  );
}

export default Home;
