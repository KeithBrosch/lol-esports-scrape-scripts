import getLeagueTeams from './src/scrape-scripts/League Of Legends/league-of-legends-get-teams.js';
import getValorantTeams from './src/scrape-scripts/Valorant/valorant-get-teams.js';

(async () => {
  const LEAGUE_TEAMS = await getLeagueTeams();
  console.log("League Teams: ", LEAGUE_TEAMS);

  // const VALORANT_TEAMS = await getValorantTeams();
  // console.log("Valorant Teams: ", VALORANT_TEAMS);
})()