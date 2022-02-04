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

const ViewBracket = () => {
  
  const { data, error } = useSWR("https://member.greed.games/teams/", fetcher);
  if (error) return "An error has occurred. "+error;
  if (!data) return "Loading...";
  const rounds: RoundProps[] = data;
  return (
    <div>
        <div className="bracket">
            <Bracket rounds={rounds} renderSeedComponent={RenderSeed} roundTitleComponent={RoundTitle} swipeableProps={{ enableMouseEvents: true, animateHeight: true }} />
        </div>
    </div>
  );
};

export default ViewBracket;
