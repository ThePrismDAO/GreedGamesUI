const GreedGameTeamButton = ({numTokensOwned, setGameStatus}) => {
  // if you own no tokens, show this
  if(numTokensOwned > 0) {
      return (
          <div className="text-center text-white font-normal text-lg mb-5">
              <button 
              className="px-7 py-2 m-4 text-xl sm:text-2xl lg:text-x lg:px-6 lg:py-2 xl:text-2xl xl:px-8 xl:py-3 font-medium text-white rounded-sm outline outline-2 bg-green-600/100 hover:bg-green-400/30 hover:text-green hover:outline-green z-10"
              onClick={() => setGameStatus("AssembleTeam")}
          >Choose Gladiators →</button>
          <div><span className="text-green-400 font-bold drop-shadow-md shadow-black">{numTokensOwned}</span> Gladiators Owned</div>
      </div>
      )
  } else {
      // otherwiseshow they own 0
      return (
          <div className="text-center text-white font-normal text-lg mb-5">
              <div>Select the number to mint (3 gladiators form a Greed Games Team) and press <span className="text-green-400 font-bold drop-shadow-md shadow-black">Mint Gladiators</span> to mint your team.</div>
          </div>
      )
  }
};

export default GreedGameTeamButton;
