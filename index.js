import getLeagueTeams from './src/scrape-scripts/League Of Legends/league-of-legends-get-teams.js';
import getValorantTeams from './src/scrape-scripts/Valorant/valorant-get-teams.js';

(async () => {
  // const LOL_LEAGUES = await getLeagueTeams();
  // console.log("LoL Leagues: ", LOL_LEAGUES);

  const VALORANT_LEAGUES = await getValorantTeams();
  console.log("Valorant Teams: ", VALORANT_LEAGUES);
})()