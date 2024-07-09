import getLoLTeams from './src/scrape-scripts/lol-esports-get-teams.js';

(async () => {
  const LoLTeams = await getLoLTeams();
  console.log(LoLTeams);
})()