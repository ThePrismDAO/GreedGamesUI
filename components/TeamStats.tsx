

const TeamStats = ({p1, p2, p3}) => {
    const guilds = [p1.guild, p2.guild, p3.guild];
    const enemies = {"White":"Black","Black":"Red","Red":"Purple","Purple":"Gold","Gold":"Blue","Blue":"Green","Green":"White"};
    const allies = {"White":"Red","Red":"Gold","Gold":"Green","Green":"Black","Black":"Purple","Purple":"Blue","Blue":"White"};

    // iterate through the guilds in the team
    let teamBonus = {"White":0,"Red":0,"Gold":0,"Green":0,"Black":0,"Purple":0,"Blue":0};
    let teamSynergies = {"White":0,"Red":0,"Gold":0,"Green":0,"Black":0,"Purple":0,"Blue":0};
    let i = 0;

    console.log(teamSynergies);

    // iterate through each guild in the team
    for(let guild of guilds) {
        // check enemies for strong/weak against this guild
        Object.keys(enemies).forEach(key => {
            // push the guilds we are strong against
            if(key == guild) teamBonus[enemies[key]] += 1;

            // push the guilds we are weak against
            if(enemies[key] == guild) teamBonus[key] -= 1;
        });

        // check this to see how many of the other 2 guilds are allies or the same
        let teamMate1 = (i+1) % 3;
        let teamMate2 = (i+2) % 3;

        // check for the same guild
        if(guild == guilds[teamMate1] || guild == guilds[teamMate2]) teamSynergies[guild] += 1;

        // check for allies
        Object.keys(allies).forEach(key => {
            // if we are the key guild and either of our teammates is a matching ally guild
            if(key == guild && guilds[teamMate1] == allies[key]) teamSynergies[guild] += 1;
            if(key == guild && guilds[teamMate2] == allies[key]) teamSynergies[guild] += 1;

            // if we are the value guild and either of our teammates is the matching key guild
            if(allies[key] == guild && guilds[teamMate1] == key) teamSynergies[guild] += 1;
            if(allies[key] == guild && guilds[teamMate2] == key) teamSynergies[guild] += 1;
        });

        // iterate 
        i++;
    }

    // figure out if we are showing this or not
    let showBonuses = false;
    let showPenalties = false;
    let showSynergies = false;
    Object.keys(teamSynergies).forEach(key => {
        if(teamSynergies[key] > 0) showSynergies = true;
    });
    Object.keys(teamBonus).forEach(key => {
        if(teamBonus[key] > 0) showBonuses = true;
        if(teamBonus[key] > 0) showPenalties = true;
    });

    console.log(teamSynergies);

    return (
        <div className='flex relative'>
            <div className="bg-white/40 blur-2xl absolute h-80 w-10/12 md:w-8/12 lg:w-6/12 2xl:w-6/12 "></div>
            <div className="bg-black/40 blur-2xl absolute h-40 w-10/12 md:w-8/12 lg:w-6/12 2xl:w-6/12 "></div>
            <div className="mt-9 team-stats">
                <h2 className="team-stats-synergies font-bold text-3xl">Synergies</h2>
                <p className="text-lg"> {showSynergies ? Object.entries(teamSynergies).map(([key, value]) => { if(value > 0) return <div key={key}><span className={key+" font-bold"}>{key}</span>: <span className="text-green-400 font-bold">+{value}</span></div> }) : <div>None</div>}</p>
                <h2 className="team-stats-matchups font-bold text-3xl mt-5">Matchups</h2>
                <p className="text-lg"> {showBonuses ? Object.entries(teamBonus).map(([key, value]) => { if(value > 0) return <div key={key}>vs <span className={key+" font-bold"}>{key}</span>: <span className="text-green-400 font-bold">+{value}</span></div> })  : <div>None</div>}</p>
                <p className="text-lg">{showPenalties ? Object.entries(teamBonus).map(([key, value]) => { if(value < 0) return <div key={key}>vs <span className={key+" font-bold"}>{key}</span>: <span className="text-red-400 font-bold">{value}</span></div> }) : <div>None</div>}</p>
            </div>
        </div>
    )
  };
  
  export default TeamStats;
  