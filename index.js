import getCSTeams from './src/scrape-scripts/CS/cs-get-teams.js';
import getLeagueTeams from './src/scrape-scripts/League Of Legends/league-of-legends-get-teams.js';
import getValorantTeams from './src/scrape-scripts/Valorant/valorant-get-teams.js';

(async () => {
  // const LEAGUE_TEAMS = await getLeagueTeams(true);
  // console.log("League Teams: ", LEAGUE_TEAMS);

  // const VALORANT_TEAMS = await getValorantTeams(true);
  // console.log("Valorant Teams: ", VALORANT_TEAMS);

  // NOTE: Headless must be fale for our CS scripts to get past cloudflare
  const CS_TEAMS = await getCSTeams(false);
  console.log("CS Teams: ", CS_TEAMS);
})()