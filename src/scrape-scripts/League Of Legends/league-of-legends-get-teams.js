import 'dotenv/config';
import puppeteer from 'puppeteer';

export default async function getteamObjects(headless = true) {

  try {
    
  const browser = await puppeteer.launch({headless, defaultViewport: { width: 1280, height: 800 }});
  const page = await browser.newPage();
  await page.goto(process.env.LEAGUE_OF_LEGENDS_GET_TEAMS_BASE_URL);

  await page.waitForSelector('li.league', { timeout: 5_000 });
  const leagueElements = await page.$$('li.league');
  const numLeagueElements = leagueElements.length;

  const teamObjects = [];
  let currentLeagueIndex = 0;

 
    while (currentLeagueIndex < numLeagueElements - 1) {

      // get league info
      const currentLeagueElement = leagueElements[currentLeagueIndex];
      const currentLeagueInnerText = await page.evaluate(currentLeagueElement => currentLeagueElement.innerText, currentLeagueElement);
      const splitLeagueInnerText = currentLeagueInnerText.split('\n') || currentLeagueInnerText;
      const teamRegion = splitLeagueInnerText[0];
      const leagueRegion = splitLeagueInnerText[1];

      // if leagueRegion === "international", skip the league
      if (leagueRegion.toLowerCase() === 'international') {
        currentLeagueIndex = currentLeagueIndex + 1;
        continue;
      }

      // make sure that the "regular season" stage option is selected 
      await currentLeagueElement.click();
      await page.waitForSelector('.stage-option');
      const regularSeasonButton = await page.$('.stage-option');
      const stageOptionInnerText = await page.evaluate(regularSeasonButton => regularSeasonButton.innerText, regularSeasonButton);

      // if there is no "regular season" or "group stage (LPL)" option, skip the league 
      if (stageOptionInnerText.toLowerCase() !== 'regular season' && stageOptionInnerText.toLowerCase() !== 'group stage') {{
        currentLeagueIndex = currentLeagueIndex + 1;
        continue;
      }}
      
      await regularSeasonButton.click();

      // get team info for current league
      await page.waitForSelector('a.ranking');
      const teamElements = await page.$$('a.ranking');
      const numTeamElements = teamElements.length;

      const teamObjects = [];
      let currentTeamIndex = 0;

      while (currentTeamIndex < numTeamElements - 1) {
        const currentTeamElement = teamElements[currentTeamIndex];
        const teamId = await page.evaluate(currentTeamElement => currentTeamElement.getAttribute('href'), currentTeamElement);
        const currentTeamInnerText = await page.evaluate(currentTeamElement => currentTeamElement.innerText, currentTeamElement);
        const splitTeamInnerText = currentTeamInnerText.split('\n');
        const teamName = splitTeamInnerText[1];
        const teamLogo = await page.evaluate(currentTeamElement => currentTeamElement.children[1].children[0].children[0].getAttribute('src'), currentTeamElement);
        teamObjects.push({
          teamId: teamId.replace('/teams/', ''),
          teamLogo,
          teamName,
          teamRegion,
        })
        currentTeamIndex = currentTeamIndex + 1;
      }


      // increment currentLeagueIndex
      currentLeagueIndex = currentLeagueIndex + 1;
  }
    await browser.close();
    console.log(JSON.stringify(teamObjects, null, 2));

  return teamObjects;
  } catch (error) {
    console.log('Error in league-of-legends-get-teams scrape: ', error)
  }
};