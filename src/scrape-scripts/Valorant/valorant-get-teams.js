import 'dotenv/config';
import puppeteer from 'puppeteer';

export default async function getValorantTeams(headless = true) {
  try {
    const browser = await puppeteer.launch({headless, defaultViewport: { width: 1280, height: 800 }});
    const page = await browser.newPage();
    await page.goto(process.env.VALORANT_GET_TEAMS_BASE_URL);

    await page.waitForSelector('.rank-item-team > a', { timeout: 5_000 });
    const teamElements = await page.$$('.rank-item-team > a');
    const numTeams= teamElements.length;

    const teamObjects = [];
    let currentTeamIndex = 0;

    // todo: get more than just the top 10 teams from each region?
    while (currentTeamIndex < numTeams - 1) {
      const currentTeamElement = teamElements[currentTeamIndex];
      const teamId = await page.evaluate(currentTeamElement => currentTeamElement.getAttribute('href'), currentTeamElement);
      const teamLogo = await page.evaluate(currentTeamElement => currentTeamElement.children[0].getAttribute('src'), currentTeamElement);
      const teamInfo = await page.evaluate(currentTeamElement => currentTeamElement.innerText, currentTeamElement);
      const splitTeamInfo = teamInfo.split('\n');
      const teamName = splitTeamInfo[0];
      const teamRegion = splitTeamInfo[1];

      currentTeamIndex = currentTeamIndex + 1;

      teamObjects.push({
        teamId,
        teamLogo,
        teamName,
        teamRegion,
      })
    }
    
    await browser.close();
    // console.log(JSON.stringify(teamObjects, null, 2));
    return teamObjects;
  } catch (error) {
    console.log('Error in valorant-get-teams scrape: ', error)
  }
}