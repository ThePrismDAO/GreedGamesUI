import GreedGameTeamButton from "./GreedGameTeamButton";
import PrismDAOMembershipMint from "./PrismDAOMembershipMint";
import GreedGameTeamSelect from "./GreedGameTeamSelect";
import { useEffect, useState } from "react";
import usePrismDAOTokens from "../hooks/usePrismDAOTokens";
import ViewBracket from "./ViewBracket";

const AppContent = ({account, library, chain, prismDAOMembershipContractAddress, numTokensOwned, gameStatus, setGameStatus, tokenAPIUri, numTokensMinted, numTokensAvailable, barWidth, numTokensToMint, setNumTokensToMint, mintPriceEth, setTotalSupply, setMaxSupply, setMintPrice, setPrismDAOMembershipEtherscan, setNumTokensOwned}) => {
    const tokens = usePrismDAOTokens(prismDAOMembershipContractAddress, account, tokenAPIUri, numTokensOwned);
   

    // the default message when you havent connected metamask yet
    if(gameStatus == "Unconnected") {
        if(chain == "Rinkeby Testnet" && gameStatus !== "Minting") {
            setGameStatus("Minting");
        } else {
            return(
                <div className="absolute w-10/12 md:w-8/12 lg:w-6/12 2xl:w-6/12 main-heading">
                    <div className="header text-white text-2xl md:text-3xl lg:text-5xl md:mt-10 font-normal leading-normal mt-20 text-center">Connect your MetaMask to the <span className="text-green-400 font-bold drop-shadow-md shadow-black">Rinkeby test network</span> to begin</div>
                </div>
            )
        }
    }

    // show the minting page
    if(gameStatus == "Minting") {
        if(chain !== "Rinkeby Testnet" && chain !== "Kovan Testnet") {
            setGameStatus("Unconnected");
        }
        const minting = <div>
            <div className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-white font-medium text-center">
                Mint{" "}
                <select
                className="px-1 text-center bg-transparent leading-tight  caret-white text-green-400 font-medium border-b-white border-b-2 focus:outline-none"
                value={numTokensToMint}
                onChange={(e) => setNumTokensToMint(parseInt(e.currentTarget.value))}
                >
                {
                    [0,1,2,3,4,5,6,7,8,9,14,19,29,39,49,99].map((value) => (<option className="text-sm text-black font-medium" key={value+1} value={value+1}>{value+1}</option>))
                }
                </select>
                {" "}
                for <span className="text-green-400 font-medium">{mintPriceEth*numTokensToMint}</span> ETH
            </div>
            <div className="text-center mt-5">
                <PrismDAOMembershipMint prismDAOMembershipContractAddress={prismDAOMembershipContractAddress} numTokensToMint={numTokensToMint} mintPriceEth={mintPriceEth} /> 
            </div>
            <div className="text-center py-4 lg:px-4 w-full">
                <div className="py-2 px-4 bg-black/20 items-center text-white leading-none inline-flex rounded-full " role="alert">
                <span className="font-medium text-2xs md:text-sm leading-4 text-center mr-2 flex-auto">Mint up to 100 NFTs in a single transaction for <span className="text-yellow-400 font-bold">25x less gas</span> compared to a typical NFT mint!</span>
                </div>
            </div>
        </div>

        const cantMint = <div className="text-center py-4 lg:px-4 w-full">
            <div className="py-2 px-4 bg-black/20 items-center text-white leading-none inline-flex rounded-full " role="alert">
            <span className="font-medium text-2xs md:text-sm leading-4 text-center mr-2 flex-auto">You have already minted 100 tokens, which is the maximum! Choose your gladiators to begin.</span>
            </div>
        </div>
        
        return(

            <div className="absolute w-10/12 md:w-8/12 lg:w-6/12 2xl:w-6/12 mt-16 md:mt-0">
                <GreedGameTeamButton numTokensOwned={numTokensOwned} setGameStatus={setGameStatus}/>
                        
                <div className="text-right text-white font-normal mb-2 md:mb-0 text-xs md:text-base">minted <span className="text-green-400 font-bold drop-shadow-md shadow-black">{numTokensMinted}</span> / {numTokensAvailable}</div>
                <div className="w-full bg-black rounded-full h-3 md:h-4 mb-3 md:mb-6 bg-opacity-100 border-0 border-white shadow-2xl">
                    <div className={"bg-gradient-to-r from-lime-500 to-emerald-500 rounded-full h-3 md:h-4 shadow-none shadow-lime-500/50 transition-width delay-0 duration-3000 ease-out "} style={{width: barWidth}}></div>
                </div>
                
                {numTokensOwned < 100 ? minting : cantMint}
            </div>
        )
    } 

    // show the team select page
    if(gameStatus == "AssembleTeam") {
        if(chain !== "Rinkeby Testnet" && chain !== "Kovan Testnet") {
            setGameStatus("Unconnected");
        }
        return (
                 <GreedGameTeamSelect setGameStatus={setGameStatus} library={library} account={account} tokens={tokens} numTokensOwned={numTokensOwned} tokenAPIUri={tokenAPIUri}  />
        );  
    }

    // show the team select page
    if(gameStatus == "ViewBracket") {
        return  (
            <ViewBracket />
        );
    }
    
    return <h2>Error...</h2>
  };
  
  export default AppContent;
  