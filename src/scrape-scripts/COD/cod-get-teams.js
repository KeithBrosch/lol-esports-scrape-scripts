import 'dotenv/config';
import puppeteer from 'puppeteer';

export default async function getCSTeams(headless = true) {
  try {
    const browser = await puppeteer.launch({headless, defaultViewport: { width: 1280, height: 800 }});
    const page = await browser.newPage();
    await page.goto(process.env.COD_GET_TEAMS_BASE_URL);

    await page.waitForSelector('div.team-card-header');
    const teamCardHeaderElements = await page.$$('div.team-card-header');
    const numTeams = teamCardHeaderElements.length;

    const teamObjects = [];
    let currentTeamIndex = 0;

    while (currentTeamIndex < numTeams) {
      // get team info
      const currentTeamElement = teamCardHeaderElements[currentTeamIndex];
      const teamLogo = await page.evaluate(currentTeamElement => currentTeamElement.nextElementSibling.nextElementSibling.children[0].children[1].getAttribute('src'), currentTeamElement);
      let teamName = await page.evaluate(currentTeamElement => currentTeamElement.nextElementSibling.nextElementSibling.children[1].innerText, currentTeamElement);
      teamName = teamName.replace('\n', ' ');

      currentTeamIndex = currentTeamIndex + 1;
      teamObjects.push({
        teamId: '',
        teamLogo,
        teamName,
        teamRegion: '',
      })
    }
    


    await browser.close();
    return teamObjects;
  } catch (error) {
    console.log('Error in cod-get-teams scrape: ', error);
  }
}