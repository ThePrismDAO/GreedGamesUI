import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import TokenBalance from "../components/TokenBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import Background from "../components/Background";
import { useEffect, useState } from "react";
import { Menu, Transition } from '@headlessui/react'

const DAI_TOKEN_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";

function Home() {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  const [barWidthClass, setBarWidthClass] = useState("w-5");

  const [numTokensMint, setNumTokensMint] = useState(10);

  useEffect(() => {
    setBarWidthClass("w-2/3")
  }, [])

  return (
    <div>
      <Head>
        <title>next-web3-boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Background>
        <div className="w-full flex flex-row md:flex-row flex-nowrap md:flex-nowrap py-4 flex-grow">
            {/* <!-- fixed-width --> */}
            <div className="w-fixed-left flex-shrink flex-grow-0 px-4 md:w-full w-0">
                <div className="sticky top-0 p-4 w-full h-full">
                    {/* <!-- nav goes here --> */}
                </div>
            </div>
            <main role="main" className="w-full flex-grow pt-1 px-3 relative">
              {/* <!-- fluid-width: main content goes here --> */}
              <div className="bg-black/40 blur-lg absolute top-96 h-40 w-full">
                
              </div>
              <div className="absolute top-96 px-12 w-full">
                <div className="text-white text-lg font-normal">minted <span className="text-green-400 font-bold drop-shadow-md shadow-black">1264</span> / 3000</div>
                <div className="w-full bg-black rounded-full h-4 mb-6 bg-opacity-100 border-0 border-white shadow-2xl ">
                  <div className={"bg-gradient-to-r from-lime-500 to-emerald-500 rounded-full h-4 shadow-none shadow-lime-500/50 transition-width delay-0 duration-3000 ease-out "+ barWidthClass}></div>
                </div>
                <div className="text-3xl text-white font-normal text-center">Mint
                  {" "}
                  <select
                    className="px-2 text-center bg-transparent leading-tight  caret-white text-green-400 font-medium border-b-white border-b-2 focus:outline-none"
                    value={numTokensMint}
                    onChange={(e) => setNumTokensMint(parseInt(e.currentTarget.value))}
                  >
                    {
                      Array.from(Array(20).keys()).map((value) => (<option className="text-sm text-black font-medium" key={value+1} value={value+1}>{value+1}</option>))
                    }
                  </select>
                  {" "}
                  for <span className="text-green-400 font-medium">0.82</span> ETH
                </div>
                <div className="text-center mt-5">
                  <button 
                    className="px-4 py-1 m-2 text-lg font-medium text-white rounded-sm outline outline-2 bg-black/30 hover:bg-white/30 hover:text-white hover:outline-white z-10"
                  >Mint Memberships</button>
                </div>
                <div className="text-center py-4 lg:px-4 w-full">
                  <div className="py-2 px-4 bg-white/20 items-center text-white leading-none inline-flex lg:rounded-full " role="alert">
                    <span className="font-medium mr-2 text-left flex-auto">Mint up to 20 NFTs in one transaction to save on gas!</span>
                  </div>
                </div>
              </div>
            </main>
            <div className="w-fixed flex-shrink flex-grow-0 px-2">
                {/* <!-- fixed-width --> */}
                <div className="flex lg:flex-col px-2 relative">
                    {/* <!-- sidebar goes here --> */}
                    <nav className="absolute">
                      <div className=" inset-y-2 right-2 text-right">
                        <Account triedToEagerConnect={triedToEagerConnect} />
                        <h1 className="md:text-8xl text-6xl font-bold text-white text-right select-none z-0">
                          <div className="">Prism</div>
                          <div className="mt-1" style={{fontSize: '2.45rem'}}>DAO</div>
                        </h1>
                        <ul className="mt-5 flex-col space-y-2 font-medium text-lg">
                          <li className="mr-0">
                            <a className="text-white hover:opacity-70" href="#">White Paper</a>
                          </li>
                          <li className="mr-0">
                            <a className="text-white hover:opacity-70" href="#">Repository</a>
                          </li>
                          <li className="mr-0">
                            <a className="text-white hover:opacity-70" href="#">Discord</a>
                          </li>
                          <li className="mr-0">
                            <a className="text-white hover:opacity-70" href="#">Docs</a>
                          </li>
                        </ul>
                      </div>
                    </nav>
                </div>
            </div>
        </div>
      </Background>
      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: right;
        }
      `}</style>
    </div>
  );
}

export default Home;
