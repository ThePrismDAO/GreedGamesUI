import React from "react";
import { useEffect, useState } from "react";
import useSignTeam from "../hooks/useSignTeam";
import TeamStats from "./TeamStats";
import usePrismDAOAttributes from "../hooks/usePrismDAOAttributes"
import Countdown from 'react-countdown';
import useSWR from "swr"

const fetcher = url => fetch(url).then(res => res.json())
const baseUrl = "https://member.greed.games/gameskeeper/"

const GreedGameTeamSelect = ({setGameStatus, library, account, tokens, numTokensOwned, tokenAPIUri}) => {
    // get the attributes data
    let tokenAttributes = usePrismDAOAttributes();

    // for state of register button
    const [registerActive, setRegisterActive] = useState("");
    const [teamString, setTeamString] = useState("");
    const [registerTeamTx, setRegisterTeamTx] = useState("");
    const [registeredTeam, setTeam] = useState("");

    // create vars for all of the team slots and give default blank data
    const defaultSlotData = {"image":"https://member.greed.games/i/blank.png","id":"","guild":"Select","rarity":""};
    const [teamSlot1, setTeamSlot1] = useState(defaultSlotData);
    const [teamSlot1Status, setTeamSlot1status] = useState("unloaded");
    const [teamSlot2, setTeamSlot2] = useState(defaultSlotData);
    const [teamSlot2Status, setTeamSlot2status] = useState("unloaded");
    const [teamSlot3, setTeamSlot3] = useState(defaultSlotData);
    const [teamSlot3Status, setTeamSlot3status] = useState("unloaded");

    // get the registered team from the gameskeeper api
    let teamUri = baseUrl +"?team_address="+account;
    const { data: team, error } = useSWR(teamUri, fetcher)
    let buttonText = "Register";
    if (team) {
        if(team != registeredTeam) {
            console.log(team);
            setTeam(team);
            if(team['registered'] == false) {
                setTeamSlot1status("unselected");
                setTeamSlot2status("unselected");
                setTeamSlot3status("unselected");
            }
            if(team['registered'] == true) {
                
                if(teamSlot1Status != "unloaded") setTeamSlot1status("selected");
                if(teamSlot2Status != "unloaded") setTeamSlot2status("selected");
                if(teamSlot3Status != "unloaded") setTeamSlot3status("selected");
            }
        }
        if(team['registered'] == true) buttonText = "Re-register";
    } 

    // sends the get request to register a team
    async function registerTeam(tx, setTeam) {
        if(registerTeamTx!="") {
            console.log("REGISTERED TEAM",tx)
            let registerTeamUri = baseUrl +"?register_address="+account+"&team="+teamString+"&tx="+tx;
            await fetch(registerTeamUri).then((data) => {
                const r = data.json();
                console.log("REGISTERED TEAM:",r);
                setTeam(r);
            });
        }
    }

    // effect for when we sign a message
    useEffect(() => {  
        registerTeam(registerTeamTx, setTeam); 
    }, [registerTeamTx])

    function makeTeamString(teamSlot1, teamSlot2, teamSlot3) {
        let newString = "";
        if(teamSlot1.id != "") newString = newString + teamSlot1.guild+teamSlot1.id.replace("#",'.');
        if(teamSlot2.id != "") newString = newString + '-' + teamSlot2.guild+teamSlot2.id.replace("#",'.');
        if(teamSlot3.id != "") newString = newString + '-' + teamSlot3.guild+teamSlot3.id.replace("#",'.');
        setTeamString(newString);
    }

    useEffect(() => {
        makeTeamString(teamSlot1, teamSlot2, teamSlot3)
    }, [teamSlot1, teamSlot2, teamSlot3])

    useEffect(() => {
        if(teamSlot1Status == 'selected' && teamSlot2Status == 'selected' && teamSlot3Status == 'selected') {
            // make register button active
            setRegisterActive("active");
        }
    }, [teamSlot1Status, teamSlot2Status, teamSlot3Status])

    

    const onPortraitClick = (t) => {
        let filled = false;
        const slotData = {
            "image":tokenAPIUri+t.tokenIndex+"/image",
            "id": "#"+Math.floor(t.tokenIndex/7),
            "guild": t.guild,
            "rarity": t.rarity,
            "class": t.class,
            "secondGuild": t.secondGuild,
            "thirdGuild": t.thirdGuild
        }
        if(teamSlot1Status == "unselected") {
            // prevent duplicates of both guild and id
            if(!(slotData.id == teamSlot2.id && slotData.guild == teamSlot2.guild) && !(slotData.id == teamSlot3.id && slotData.guild == teamSlot3.guild) ) {
                setTeamSlot1(slotData);
                setTeamSlot1status("selected");
                filled = true;
            }
        }
        if(teamSlot2Status == "unselected" && !filled) {
            if(!(slotData.id == teamSlot1.id && slotData.guild == teamSlot1.guild) && !(slotData.id == teamSlot3.id && slotData.guild == teamSlot3.guild) ) {
                setTeamSlot2(slotData);
                setTeamSlot2status("selected");
                filled = true;
            }
        }
        if(teamSlot3Status == "unselected" && !filled) {
            if(!(slotData.id == teamSlot1.id && slotData.guild == teamSlot1.guild) && !(slotData.id == teamSlot2.id && slotData.guild == teamSlot2.guild) ) {
                setTeamSlot3(slotData);
                setTeamSlot3status("selected");
            }
        }
    }

    const onTeamPortraitClick = (slotNumber) => {
        if(slotNumber == 1) {
            setTeamSlot1(defaultSlotData);
            setTeamSlot1status("unselected");
        }

        if(slotNumber == 2) {
            setTeamSlot2(defaultSlotData);
            setTeamSlot2status("unselected");
        }

        if(slotNumber == 3) {
            setTeamSlot3(defaultSlotData);
            setTeamSlot3status("unselected");
        }

        // make button inactive
        setRegisterActive("");
    }

    let listTokens: JSX.Element[];
   
    // the component for each token you could select
    if(tokens.length > 0 && numTokensOwned > 0 && tokenAttributes !== "Loading...") { 
        listTokens = tokens.map((t) => {
            if(t.owner == account) {
                let attributeClass = "Gladiator";
                let attributeGuild2 = "";
                let attributeGuild3 = "";
                // change when live
                let attributeRarity = "Rare";
                //let attributeRarity = "Unrevealed";
               
                if(tokenAttributes.length > 0) {
                    const attributesLen = tokenAttributes[t.tokenIndex]?.attributes.length;
                    
                    if (attributesLen == 3) attributeClass = tokenAttributes[t.tokenIndex].attributes[1]['value'];
                    if (attributesLen == 4) {
                        attributeClass = tokenAttributes[t.tokenIndex].attributes[2]['value'];
                        attributeGuild2 = tokenAttributes[t.tokenIndex].attributes[1]['value'];
                        attributeRarity = "Epic";
                        t.secondGuild = attributeGuild2;
                    }
                    if (attributesLen == 5) {
                        attributeClass = tokenAttributes[t.tokenIndex].attributes[3]['value'];
                        attributeGuild2 = tokenAttributes[t.tokenIndex].attributes[1]['value'];
                        attributeGuild3 = tokenAttributes[t.tokenIndex].attributes[2]['value'];
                        attributeRarity = "Legendary";
                        t.secondGuild = attributeGuild2;
                        t.thirdGuild = attributeGuild3;
                    }
                }

                // set it for the slotdata
                t.rarity = attributeRarity;
                t.class = attributeClass;
                t.guildIndex = Math.floor(t.tokenIndex/7);

                // the unique id that the API uses
                t.teamId = t.guild+"."+t.guildIndex;

                // default slotData in case we need to set the active ones from saved
                const slotData = {
                    "image":tokenAPIUri+t.tokenIndex+"/image",
                    "id": "#"+Math.floor(t.tokenIndex/7),
                    "guild": t.guild,
                    "rarity": t.rarity,
                    "class": t.class,
                    "secondGuild": t.secondGuild,
                    "thirdGuild": t.thirdGuild
                }

                // set the slots from the saved api data if they are empty
                if(t.teamId == registeredTeam['player1']) {
                    if(teamSlot1Status == "unloaded") {
                        setTeamSlot1(slotData);
                        setTeamSlot1status("selected");
                    }
                }

                if(t.teamId == registeredTeam['player2']) {
                    if(teamSlot2Status == "unloaded") {
                        setTeamSlot2(slotData);
                        setTeamSlot2status("selected");
                    }
                }

                if(t.teamId == registeredTeam['player3']) {
                    if(teamSlot3Status == "unloaded") {
                        setTeamSlot3(slotData);
                        setTeamSlot3status("selected");
                    }
                }

                return(
            <div className={t.guild+"-glow portrait"} key={t.tokenIndex}>
                <div className="portrait-label glow">
                <span className={t.guild}><span className={attributeGuild3}>{attributeGuild3}</span> <span className={attributeGuild2}>{attributeGuild2}</span> {t.guild} {attributeClass}</span></div>
                <div className="portrait-id"> <span className={t.guild}> #{t.guildIndex}</span></div>
                <div className="portrait-rarity low-glow"><span className={attributeRarity}> {attributeRarity}</span></div>
                <img className="low-glow" src={tokenAPIUri+t.tokenIndex+"/image"}  onClick={() => onPortraitClick(t)} />
            </div>)
            }
        }).reverse()
    }

    // get the mint tx call to pass as an onclick event
    // when we go live turn this back on
    const callSign = useSignTeam(account, library, teamString, setRegisterTeamTx);

    // countdown to the next games
    const Complete = () => <span className=''>The Greed Games have begun!</span>
    
    return (
        <div>
            <div className="team">
                <div className="portraits-title">YOUR TEAM 
                    <div className="float-right py-30 relative">
                        <div className='register-countdown'><b><Countdown date={new Date(1646640000 * 1000)} /></b> until the <span className='text-black-400 font-bold'>First Greed Games</span>!</div>
                    
                        <button 
                className={registerActive+" px-3 py-1 text-lg lg:text-x1 lg:px-6 lg:py-2 xl:text-lg xl:px-5 xl:py-2 font-medium text-white rounded-sm outline outline-2 z-10 register-team-button inactive"}
                onClick={() => callSign()}
            >{buttonText} team with the Gameskeeper →</button>
                        
                    </div> 
                </div>
                
            </div>
            <div className="team-portraits">
                <div className='portrait-container'>
                    <div className={teamSlot1['guild']+"-glow portrait "+teamSlot1Status} id="team-1">
                        <div className="portrait-label glow"><span className={teamSlot1['guild']}><span className={teamSlot1['thirdGuild']}>{teamSlot1['thirdGuild']}</span> <span className={teamSlot1['secondGuild']}>{teamSlot1['secondGuild']}</span>  {teamSlot1['guild']} {teamSlot1['class']}</span></div>
                        <div className="portrait-id"><span className={teamSlot1['guild']}> {teamSlot1['id']}</span></div>
                        <div className="portrait-rarity low-glow"><span className={teamSlot1['rarity']}> {teamSlot1['rarity']}</span></div>
                        <img src={teamSlot1['image']} onClick={() => onTeamPortraitClick(1)} />
                    </div>
                    <div className={teamSlot2['guild']+"-glow portrait "+teamSlot2Status} id="team-2">
                    <div className="portrait-label glow"><span className={teamSlot2['guild']}><span className={teamSlot2['thirdGuild']}>{teamSlot2['thirdGuild']}</span> <span className={teamSlot2['secondGuild']}>{teamSlot2['secondGuild']}</span>  {teamSlot2['guild']} {teamSlot2['class']}</span></div>
                        <div className="portrait-id"><span className={teamSlot2['guild']}> {teamSlot2['id']}</span></div>
                        <div className="portrait-rarity low-glow"><span className={teamSlot2['rarity']}> {teamSlot2['rarity']}</span></div>
                        <img src={teamSlot2['image']} onClick={() => onTeamPortraitClick(2)} />
                    </div>
                    <div className={teamSlot3['guild']+"-glow portrait "+teamSlot3Status} id="team-3">
                    <div className="portrait-label glow"><span className={teamSlot3['guild']}><span className={teamSlot3['thirdGuild']}>{teamSlot3['thirdGuild']}</span> <span className={teamSlot3['secondGuild']}>{teamSlot3['secondGuild']}</span>  {teamSlot3['guild']} {teamSlot3['class']}</span></div>
                        <div className="portrait-id"><span className={teamSlot3['guild']}> {teamSlot3['id']}</span></div>
                        <div className="portrait-rarity low-glow"><span className={teamSlot3['rarity']}> {teamSlot3['rarity']}</span></div>
                        <img src={teamSlot3['image']} onClick={() => onTeamPortraitClick(3)} />
                    </div>
                    <div className="portrait" id="team-stats">
                        <TeamStats p1={teamSlot1} p2={teamSlot2} p3={teamSlot3} />
                    </div>
                </div>
            </div>
            <div className="portraits clear">
                <div className="portraits-title"><span className="text-green-400 font-bold drop-shadow-md shadow-black">{numTokensOwned}</span> GLADIATOR NFTs</div>
                <div className='portrait-container'>{listTokens}</div>
            </div>
            <div className="back-button text-center text-white font-normal text-lg mb-5">
                <button 
                className="px-3 py-1 m-3 text-lg lg:text-xl lg:px-6 lg:py-2 xl:text-xl xl:px-8 xl:py-3 font-medium text-white rounded-sm outline outline-2 bg-black/30 hover:bg-white/30 hover:text-white hover:outline-white z-10"
                onClick={() => setGameStatus("Minting")}
            >🠔 Back to Mint Gladiators</button>
            </div>
        </div>
    )

};

export default GreedGameTeamSelect;
