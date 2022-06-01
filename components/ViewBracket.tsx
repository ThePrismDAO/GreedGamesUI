/*import { Bracket, Seed, SeedItem, SeedTeam, SeedTime, RoundProps, RenderSeedProps } from 'react-brackets';
import useSWR from 'swr'
//const rounds: RoundProps[] = [{"title":"Round 1","seeds":[{"id":1,"date":"February 1","teams":[{"name":"Team 0","score":0,"team":[0,1,2]},{"name":"Team 1","score":5,"team":[3,4,5]}]},{"id":2,"date":"February 1","teams":[{"name":"Team 2","score":7,"team":[6,7,8]},{"name":"Team 3","score":8,"team":[9,10,11]}]},{"id":3,"date":"February 1","teams":[{"name":"Team 4","score":4,"team":[12,13,14]},{"name":"Team 5","score":6,"team":[15,16,17]}]},{"id":4,"date":"February 1","teams":[{"name":"Team 6","score":3,"team":[18,19,20]},{"name":"Team 7","score":8,"team":[21,22,23]}]},{"id":5,"date":"February 1","teams":[{"name":"Team 8","score":4,"team":[24,25,26]},{"name":"Team 9","score":6,"team":[27,28,29]}]},{"id":6,"date":"February 1","teams":[{"name":"Team 10","score":0,"team":[30,31,32]},{"name":"Team 11","score":4,"team":[33,34,35]}]},{"id":7,"date":"February 1","teams":[{"name":"Team 12","score":9,"team":[36,37,38]},{"name":"Team 13","score":7,"team":[39,40,41]}]},{"id":8,"date":"February 1","teams":[{"name":"Team 14","score":9,"team":[42,43,44]},{"name":"Team 15","score":8,"team":[45,46,47]}]},{"id":9,"date":"February 1","teams":[{"name":"Team 16","score":8,"team":[48,49,50]},{"name":"Team 17","score":0,"team":[51,52,53]}]},{"id":10,"date":"February 1","teams":[{"name":"Team 18","score":3,"team":[54,55,56]},{"name":"Team 19","score":8,"team":[57,58,59]}]},{"id":11,"date":"February 1","teams":[{"name":"Team 20","score":3,"team":[60,61,62]},{"name":"Team 21","score":2,"team":[63,64,65]}]},{"id":12,"date":"February 1","teams":[{"name":"Team 22","score":8,"team":[66,67,68]},{"name":"Team 23","score":6,"team":[69,70,71]}]},{"id":13,"date":"February 1","teams":[{"name":"Team 24","score":8,"team":[72,73,74]},{"name":"Team 25","score":9,"team":[75,76,77]}]},{"id":14,"date":"February 1","teams":[{"name":"Team 26","score":3,"team":[78,79,80]},{"name":"Team 27","score":9,"team":[81,82,83]}]},{"id":15,"date":"February 1","teams":[{"name":"Team 28","score":2,"team":[84,85,86]},{"name":"Team 29","score":7,"team":[87,88,89]}]},{"id":16,"date":"February 1","teams":[{"name":"Team 30","score":8,"team":[90,91,92]},{"name":"Team 31","score":4,"team":[93,94,95]}]}]},{"title":"Round 2","seeds":[{"id":17,"date":"February 2","teams":[{"name":"Team 1","score":5,"team":[3,4,5]},{"name":"Team 3","score":8,"team":[9,10,11]}]},{"id":18,"date":"February 2","teams":[{"name":"Team 5","score":6,"team":[15,16,17]},{"name":"Team 7","score":8,"team":[21,22,23]}]},{"id":19,"date":"February 2","teams":[{"name":"Team 9","score":6,"team":[27,28,29]},{"name":"Team 11","score":4,"team":[33,34,35]}]},{"id":20,"date":"February 2","teams":[{"name":"Team 12","score":9,"team":[36,37,38]},{"name":"Team 14","score":9,"team":[42,43,44]}]},{"id":21,"date":"February 2","teams":[{"name":"Team 16","score":8,"team":[48,49,50]},{"name":"Team 19","score":8,"team":[57,58,59]}]},{"id":22,"date":"February 2","teams":[{"name":"Team 20","score":3,"team":[60,61,62]},{"name":"Team 22","score":8,"team":[66,67,68]}]},{"id":23,"date":"February 2","teams":[{"name":"Team 25","score":9,"team":[75,76,77]},{"name":"Team 27","score":9,"team":[81,82,83]}]},{"id":24,"date":"February 2","teams":[{"name":"Team 29","score":7,"team":[87,88,89]},{"name":"Team 30","score":8,"team":[90,91,92]}]}]},{"title":"Round 3","seeds":[{"id":25,"date":"February 3","teams":[{"name":"Team 3","score":8,"team":[9,10,11]},{"name":"Team 7","score":8,"team":[21,22,23]}]},{"id":26,"date":"February 3","teams":[{"name":"Team 9","score":6,"team":[27,28,29]},{"name":"Team 14","score":9,"team":[42,43,44]}]},{"id":27,"date":"February 3","teams":[{"name":"Team 19","score":8,"team":[57,58,59]},{"name":"Team 22","score":8,"team":[66,67,68]}]},{"id":28,"date":"February 3","teams":[{"name":"Team 27","score":9,"team":[81,82,83]},{"name":"Team 30","score":8,"team":[90,91,92]}]}]},{"title":"Round 4","seeds":[{"id":29,"date":"February 4","teams":[{"name":"Team 7","score":8,"team":[21,22,23]},{"name":"Team 14","score":9,"team":[42,43,44]}]},{"id":30,"date":"February 4","teams":[{"name":"Team 22","score":8,"team":[66,67,68]},{"name":"Team 27","score":9,"team":[81,82,83]}]}]},{"title":"Round 5","seeds":[{"id":31,"date":"February 5","teams":[{"name":"Team 14","score":9,"team":[42,43,44]},{"name":"Team 27","score":9,"team":[81,82,83]}]}]}];

const RenderSeed = ({ breakpoint, seed }: RenderSeedProps) => {
    let dateColor = "#aaaaaa";
    if(seed.date > new Date()) {
        dateColor = "#ffffff";
    }
    const guilds = [];
    return (
      <Seed mobileBreakpoint={breakpoint}>
        <SeedItem style={{ width: '100%' }}>
          <div>
            <span className={'bracket-score'+(seed.teams?.[0]?.score > seed.teams?.[1]?.score ? " won" : " lost")}>{seed.teams?.[0]?.score}</span>
            <img src={'https://member.greed.games/'+seed.teams?.[0].team[0]+'/image'} className={'bracket-image '+seed.teams?.[0].guilds[0]+'-outline'}></img>
            <img src={'https://member.greed.games/'+seed.teams?.[0].team[1]+'/image'} className={'bracket-image '+seed.teams?.[0].guilds[1]+'-outline'}></img>
            <img src={'https://member.greed.games/'+seed.teams?.[0].team[2]+'/image'} className={'bracket-image '+seed.teams?.[0].guilds[2]+'-outline'}></img>
            <SeedTeam>{seed.teams?.[0].name || '-'}</SeedTeam>
            <div style={{ height: 1, backgroundColor: '#707070' }}></div>
            <span className={'bracket-score'+(seed.teams?.[0]?.score < seed.teams?.[1]?.score ? " won" : " lost")}>{seed.teams?.[1]?.score}</span>
            <img src={'https://member.greed.games/'+seed.teams?.[1].team[0]+'/image'} className={'bracket-image '+seed.teams?.[1].guilds[0]+'-outline'}></img>
            <img src={'https://member.greed.games/'+seed.teams?.[1].team[1]+'/image'} className={'bracket-image '+seed.teams?.[1].guilds[1]+'-outline'}></img>
            <img src={'https://member.greed.games/'+seed.teams?.[1].team[2]+'/image'} className={'bracket-image '+seed.teams?.[1].guilds[2]+'-outline'}></img>
            <SeedTeam>{seed.teams?.[1]?.name || '-'}</SeedTeam>
          </div>
        </SeedItem>
        <SeedTime mobileBreakpoint={breakpoint} style={{ fontSize: 11, color: dateColor, zIndex:1000 }}>
          {seed.date}
        </SeedTime>
      </Seed>
    );
  };

const RoundTitle = (title: React.ReactNode, roundIndex: number) => {
    return <div style={{ textAlign: 'center', color: 'white', fontSize:20 , zIndex:1000}}>{title}</div>;
}

const fetcher = (url) => fetch(url).then((res) => res.json());

const ViewBracket = () => {
  
  const { data, error } = useSWR("https://member.greed.games/gameskeeper/?bracket=1", fetcher);
  if (error) return "An error has occurred. "+error;
  if (!data) return "Loading...";
  const rounds: RoundProps[] = data;
  console.log(data);
  return (
    <div>
        <div className="bracket">
            
            <Bracket rounds={rounds} renderSeedComponent={RenderSeed} roundTitleComponent={RoundTitle} swipeableProps={{ enableMouseEvents: true, animateHeight: true }} />
        </div>
    </div>
  );
};

export default ViewBracket;
*/
import { Suspense } from 'react'
import { Bracket, Seed, SeedItem, SeedTeam, SeedTime, RoundProps, RenderSeedProps } from 'react-brackets';
import useSWR from 'swr'
//const rounds: RoundProps[] = [{"title":"Round 1","seeds":[{"id":1,"date":"February 1","teams":[{"name":"Team 0","score":0,"team":[0,1,2]},{"name":"Team 1","score":5,"team":[3,4,5]}]},{"id":2,"date":"February 1","teams":[{"name":"Team 2","score":7,"team":[6,7,8]},{"name":"Team 3","score":8,"team":[9,10,11]}]},{"id":3,"date":"February 1","teams":[{"name":"Team 4","score":4,"team":[12,13,14]},{"name":"Team 5","score":6,"team":[15,16,17]}]},{"id":4,"date":"February 1","teams":[{"name":"Team 6","score":3,"team":[18,19,20]},{"name":"Team 7","score":8,"team":[21,22,23]}]},{"id":5,"date":"February 1","teams":[{"name":"Team 8","score":4,"team":[24,25,26]},{"name":"Team 9","score":6,"team":[27,28,29]}]},{"id":6,"date":"February 1","teams":[{"name":"Team 10","score":0,"team":[30,31,32]},{"name":"Team 11","score":4,"team":[33,34,35]}]},{"id":7,"date":"February 1","teams":[{"name":"Team 12","score":9,"team":[36,37,38]},{"name":"Team 13","score":7,"team":[39,40,41]}]},{"id":8,"date":"February 1","teams":[{"name":"Team 14","score":9,"team":[42,43,44]},{"name":"Team 15","score":8,"team":[45,46,47]}]},{"id":9,"date":"February 1","teams":[{"name":"Team 16","score":8,"team":[48,49,50]},{"name":"Team 17","score":0,"team":[51,52,53]}]},{"id":10,"date":"February 1","teams":[{"name":"Team 18","score":3,"team":[54,55,56]},{"name":"Team 19","score":8,"team":[57,58,59]}]},{"id":11,"date":"February 1","teams":[{"name":"Team 20","score":3,"team":[60,61,62]},{"name":"Team 21","score":2,"team":[63,64,65]}]},{"id":12,"date":"February 1","teams":[{"name":"Team 22","score":8,"team":[66,67,68]},{"name":"Team 23","score":6,"team":[69,70,71]}]},{"id":13,"date":"February 1","teams":[{"name":"Team 24","score":8,"team":[72,73,74]},{"name":"Team 25","score":9,"team":[75,76,77]}]},{"id":14,"date":"February 1","teams":[{"name":"Team 26","score":3,"team":[78,79,80]},{"name":"Team 27","score":9,"team":[81,82,83]}]},{"id":15,"date":"February 1","teams":[{"name":"Team 28","score":2,"team":[84,85,86]},{"name":"Team 29","score":7,"team":[87,88,89]}]},{"id":16,"date":"February 1","teams":[{"name":"Team 30","score":8,"team":[90,91,92]},{"name":"Team 31","score":4,"team":[93,94,95]}]}]},{"title":"Round 2","seeds":[{"id":17,"date":"February 2","teams":[{"name":"Team 1","score":5,"team":[3,4,5]},{"name":"Team 3","score":8,"team":[9,10,11]}]},{"id":18,"date":"February 2","teams":[{"name":"Team 5","score":6,"team":[15,16,17]},{"name":"Team 7","score":8,"team":[21,22,23]}]},{"id":19,"date":"February 2","teams":[{"name":"Team 9","score":6,"team":[27,28,29]},{"name":"Team 11","score":4,"team":[33,34,35]}]},{"id":20,"date":"February 2","teams":[{"name":"Team 12","score":9,"team":[36,37,38]},{"name":"Team 14","score":9,"team":[42,43,44]}]},{"id":21,"date":"February 2","teams":[{"name":"Team 16","score":8,"team":[48,49,50]},{"name":"Team 19","score":8,"team":[57,58,59]}]},{"id":22,"date":"February 2","teams":[{"name":"Team 20","score":3,"team":[60,61,62]},{"name":"Team 22","score":8,"team":[66,67,68]}]},{"id":23,"date":"February 2","teams":[{"name":"Team 25","score":9,"team":[75,76,77]},{"name":"Team 27","score":9,"team":[81,82,83]}]},{"id":24,"date":"February 2","teams":[{"name":"Team 29","score":7,"team":[87,88,89]},{"name":"Team 30","score":8,"team":[90,91,92]}]}]},{"title":"Round 3","seeds":[{"id":25,"date":"February 3","teams":[{"name":"Team 3","score":8,"team":[9,10,11]},{"name":"Team 7","score":8,"team":[21,22,23]}]},{"id":26,"date":"February 3","teams":[{"name":"Team 9","score":6,"team":[27,28,29]},{"name":"Team 14","score":9,"team":[42,43,44]}]},{"id":27,"date":"February 3","teams":[{"name":"Team 19","score":8,"team":[57,58,59]},{"name":"Team 22","score":8,"team":[66,67,68]}]},{"id":28,"date":"February 3","teams":[{"name":"Team 27","score":9,"team":[81,82,83]},{"name":"Team 30","score":8,"team":[90,91,92]}]}]},{"title":"Round 4","seeds":[{"id":29,"date":"February 4","teams":[{"name":"Team 7","score":8,"team":[21,22,23]},{"name":"Team 14","score":9,"team":[42,43,44]}]},{"id":30,"date":"February 4","teams":[{"name":"Team 22","score":8,"team":[66,67,68]},{"name":"Team 27","score":9,"team":[81,82,83]}]}]},{"title":"Round 5","seeds":[{"id":31,"date":"February 5","teams":[{"name":"Team 14","score":9,"team":[42,43,44]},{"name":"Team 27","score":9,"team":[81,82,83]}]}]}];
const RenderSeed = ({ breakpoint, seed }: RenderSeedProps) => {
    let dateColor = "#aaaaaa";
    if(seed.date > new Date()) {
        dateColor = "#ffffff";
    }
    const guilds = [];
    return (
      <Seed mobileBreakpoint={breakpoint}>
        <SeedItem style={{ width: '100%' }}>
          <div>
            <span className={'bracket-score'+(seed.teams?.[0]?.score > seed.teams?.[1]?.score ? " won" : " lost")}>{seed.teams?.[0]?.score}</span>
            <img src={'https://member.greed.games/'+seed.teams?.[0].team[0]+'/image'} className={'bracket-image '+seed.teams?.[0].guilds[0]+'-outline'}></img>
            <img src={'https://member.greed.games/'+seed.teams?.[0].team[1]+'/image'} className={'bracket-image '+seed.teams?.[0].guilds[1]+'-outline'}></img>
            <img src={'https://member.greed.games/'+seed.teams?.[0].team[2]+'/image'} className={'bracket-image '+seed.teams?.[0].guilds[2]+'-outline'}></img>
            <SeedTeam>{seed.teams?.[0].name || '-'}</SeedTeam>
            <div style={{ height: 1, backgroundColor: '#707070' }}></div>
            <span className={'bracket-score'+(seed.teams?.[0]?.score < seed.teams?.[1]?.score ? " won" : " lost")}>{seed.teams?.[1]?.score}</span>
            <img src={'https://member.greed.games/'+seed.teams?.[1].team[0]+'/image'} className={'bracket-image '+seed.teams?.[1].guilds[0]+'-outline'}></img>
            <img src={'https://member.greed.games/'+seed.teams?.[1].team[1]+'/image'} className={'bracket-image '+seed.teams?.[1].guilds[1]+'-outline'}></img>
            <img src={'https://member.greed.games/'+seed.teams?.[1].team[2]+'/image'} className={'bracket-image '+seed.teams?.[1].guilds[2]+'-outline'}></img>
            <SeedTeam>{seed.teams?.[1]?.name || '-'}</SeedTeam>
          </div>
        </SeedItem>
        <SeedTime mobileBreakpoint={breakpoint} style={{ fontSize: 11, color: dateColor, zIndex:1000 }}>
          {seed.date}
        </SeedTime>
      </Seed>
    );
  };
const RoundTitle = (title: React.ReactNode, roundIndex: number) => {
    return <div style={{ textAlign: 'center', color: 'white', fontSize:20 , zIndex:1000}}>{title}</div>;
}
const fetcher = (url) => fetch(url).then((res) => res.json());

const GreedGamesBracket = () => {
  // this needs to be made automatic - -right now the games number is hardcoded
  const { data: rounds, error } = useSWR("https://member.greed.games/gameskeeper/?bracket=2", fetcher);
  if (error) return <div>failed to load</div>
 
  if (!rounds) return (
    
    <div className="flex h-screen w-screen">
      <div className="m-auto">
        <svg role="status" className="mr-2 w-32 h-32 text-gray-900 animate-spin fill-green-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      </div>
    </div>
    
  )
  return <Bracket rounds={rounds} renderSeedComponent={RenderSeed} roundTitleComponent={RoundTitle} swipeableProps={{ enableMouseEvents: true, animateHeight: true }} />
}
const ViewBracket = () => {
  return (
    <div>
        <div className="bracket">
          <GreedGamesBracket/>
        </div>
    </div>
  );
};
export default ViewBracket;