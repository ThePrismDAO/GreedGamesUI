function updateBonuses(guilds, modifier, enemies, teamBonus) {
    for(let guild of guilds) {
        // check enemies for strong/weak against this guild
        Object.keys(enemies).forEach(key => {
            // push the guilds we are strong against
            if(key == guild) teamBonus[enemies[key]] += modifier;

            // push the guilds we are weak against
            if(enemies[key] == guild) teamBonus[key] -= modifier;
        });
    }
    return teamBonus;
}

function updateSynergies(guild, guilds, teamMate1, teamMate2, teamSynergies, allies) {
    // check for the same guild
    if(guild == guilds[teamMate1] || guild == guilds[teamMate2]) teamSynergies[guild] += 1;

    // check for allies
    Object.keys(allies).forEach(key => {
        // if we are the key guild and either of our teammates is a matching ally guild
        if(key == guild && guilds[teamMate1] == allies[key]) {
            teamSynergies[key] += 1;
            teamSynergies[guild] += 1;
        }
        if(key == guild && guilds[teamMate2] == allies[key]){
            teamSynergies[key] += 1;
            teamSynergies[guild] += 1;
        } 

        // if we are the value guild and either of our teammates is the matching key guild
        if(allies[key] == guild && guilds[teamMate1] == key) {
            teamSynergies[key] += 1;
            teamSynergies[guild] += 1;
        }
        if(allies[key] == guild && guilds[teamMate2] == key) {
            teamSynergies[key] += 1;
            teamSynergies[guild] += 1;
        }
    });

    return teamSynergies;
}

function updateClasses(myClass, classes, classMatchups, guild, guilds, teamMate1, teamMate2, teamClassBonus) {
    // class matchups
    Object.keys(classMatchups).forEach(key => {
        // if we are the key class we get a bonus against the opposing class
        if(key == myClass) teamClassBonus[classMatchups[key]]  += 1;

        // and we get a penalty against our enemy
        if(classMatchups[key] == myClass) teamClassBonus[key] -= 1;
    });

    return teamClassBonus;
}

const TeamStats = ({p1, p2, p3}) => {
    const guilds = [p1.guild, p2.guild, p3.guild];
    const classes = [p1.class, p2.class, p3.class]
    const secondGuids = [p1.secondGuild, p2.secondGuild, p3.secondGuild]
    const thirdGuilds = [p1.thirdGuild, p2.thirdGuild, p3.thirdGuild]
    const enemies = {"White":"Black","Black":"Red","Red":"Purple","Purple":"Gold","Gold":"Blue","Blue":"Green","Green":"White"};
    const allies = {"White":"Red","Red":"Gold","Gold":"Green","Green":"Black","Black":"Purple","Purple":"Blue","Blue":"White"};
    const classMatchups = {"Fighter":"Healer","Healer":"Tank","Tank":"Assassin","Assassin":"Mage","Mage":"Fighter"};

    // iterate through the guilds in the team
    let teamBonus = {"White":0,"Red":0,"Gold":0,"Green":0,"Black":0,"Purple":0,"Blue":0};
    let teamSynergies = {"White":0,"Red":0,"Gold":0,"Green":0,"Black":0,"Purple":0,"Blue":0};
    let teamClassBonus = {"Fighter":0,"Healer":0,"Tank":0,"Assassin":0,"Mage":0};
    let i = 0;

    // synergies only work for main guild
    // iterate through each guild in the team
    for(let guild of guilds) {
        // check this to see how many of the other 2 guilds are allies or the same
        let teamMate1 = (i+1) % 3;
        let teamMate2 = (i+2) % 3;

        // update team synergies
        teamSynergies = updateSynergies(guild, guilds, teamMate1, teamMate2, teamSynergies, allies)

        // update class bonuses
        let myClass = classes[i];
        teamClassBonus = updateClasses(myClass, classes, classMatchups, guild, guilds, teamMate1, teamMate2, teamClassBonus);

        // iterate 
        i++;
    }

    // bonuses/penalties work for all guild types
    // +1 for main
    updateBonuses(guilds, 4, enemies, teamBonus);

    // bonuses/penalties work for all guild types
    // +0.5 for 2nd
    updateBonuses(secondGuids, 2, enemies, teamBonus);

    // bonuses/penalties work for all guild types
    // +0.5 for 2nd
    updateBonuses(thirdGuilds, 1, enemies, teamBonus);

    // figure out if we are showing this or not
    let showBonuses = false;
    let showPenalties = false;
    let showSynergies = false;
    let showClassBonus = false;
    let showClassPenalty = false;
    Object.keys(teamSynergies).forEach(key => {
        if(teamSynergies[key] > 0) showSynergies = true;
    });
    Object.keys(teamBonus).forEach(key => {
        if(teamBonus[key] > 0) showBonuses = true;
        if(teamBonus[key] > 0) showPenalties = true;
    });

    Object.keys(teamClassBonus).forEach(key => {
        if(teamClassBonus[key] > 0) showClassBonus = true;
        if(teamClassBonus[key] > 0) showClassPenalty = true;
    });

    console.log(teamSynergies);

    return (
        <div>
        <div className='team-stats bg-white/40 blur-2xl absolute h-40 w-10/12 md:w-8/12 lg:w-40/80 2xl:w-6/24 z-0'></div>
        <div className='team-stats bg-black/40 blur-2xl absolute h-80 w-10/12 md:w-8/12 lg:w-40/80 2xl:w-6/24 z-0'></div>
        <div className='relative team-stats'>
            <div className=" columns-3 mt-5 h-80 break-after-all">
                <div className="w-30 h-80 "> 
                    <h2 className="z-50 font-bold text-3xl">Guild</h2>
                    <p className="text-lg"> {showBonuses ? Object.entries(teamBonus).map(([key, value]) => { if(value > 0) return <div key={key}>vs <span className={key+" font-bold"}>{key}</span>: <span className="text-green-400 font-bold">+{value}</span></div> })  : <div>None</div>}</p>
                    <p className="text-lg">{showPenalties ? Object.entries(teamBonus).map(([key, value]) => { if(value < 0) return <div key={key}>vs <span className={key+" font-bold"}>{key}</span>: <span className="text-red-400 font-bold">{value}</span></div> }) : <div></div>}</p>
                </div>
                <div className="w-30 h-80"> 
                    <h2 className=" font-bold text-3xl ">Class</h2>
                    <p className="text-lg"> {showClassBonus ? Object.entries(teamClassBonus).map(([key, value]) => { if(value > 0) return <div key={key}>vs <span className={key+" font-bold"}>{key}</span>: <span className="text-green-400 font-bold">+{value}</span></div> })  : <div>None</div>}</p>
                    <p className="text-lg">{showClassPenalty ? Object.entries(teamClassBonus).map(([key, value]) => { if(value < 0) return <div key={key}>vs <span className={key+" font-bold"}>{key}</span>: <span className="text-red-400 font-bold">{value}</span></div> }) : <div></div>}</p>
                </div>
                <div className="w-30 h-80"> 
                    <h2 className=" font-bold text-3xl ">Synergies</h2>
                    <p className="text-lg"> {showSynergies ? Object.entries(teamSynergies).map(([key, value]) => { if(value > 0) return <div key={key}><span className={key+" font-bold"}>{key}</span>: <span className="text-green-400 font-bold">+{value}</span></div> }) : <div>None</div>}</p>
                </div>
            </div>
        </div>
        </div>
    )
  };
  
  export default TeamStats;
  