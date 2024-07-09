import scrapeStandings from './src/scrape-scripts/League Of Legends/league-of-legends-get-teams.js';

(async () => {
  const LoLLeagues = await scrapeStandings();
  console.log("LoL Leagues: ", LoLLeagues);
})()