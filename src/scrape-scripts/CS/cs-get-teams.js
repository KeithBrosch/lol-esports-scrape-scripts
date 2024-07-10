import 'dotenv/config';
import puppeteer from 'puppeteer';

export default async function getCSTeams(headless = true) {
  try {
    const browser = await puppeteer.launch({headless, defaultViewport: { width: 1280, height: 800 }});
    const page = await browser.newPage();
    await page.goto(process.env.CS_GET_TEAMS_BASE_URL);

    // clear cookies modal
    if (!headless){
      await page.waitForSelector('button#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll', { timeout: 5_000 });
      const acceptCookiesButton = await page.$('button#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
      await acceptCookiesButton.click();
    }

    await page.waitForSelector('div.ranking-header');
    const teamElements = await page.$$('div.ranking-header');
    const numTeams = teamElements.length;

    const teamObjects = [];
    let currentTeamIndex = 0;

    while (currentTeamIndex < numTeams) {
      // get team info
      const currentTeamElement = teamElements[currentTeamIndex];
      const teamId = await page.evaluate(currentTeamElement => currentTeamElement.nextElementSibling.children[1].children[0].getAttribute('href'), currentTeamElement);
      const teamLogo = await page.evaluate(currentTeamElement => currentTeamElement.children[1].children[0].getAttribute('src'), currentTeamElement);
      const teamName = await page.evaluate(currentTeamElement => currentTeamElement.children[2].children[0].children[0].innerText, currentTeamElement);

      currentTeamIndex = currentTeamIndex + 1;
      teamObjects.push({
        teamId: teamId.replace('/team/', ''),
        teamLogo,
        teamName,
        teamRegion: '',
      });
    }

    await browser.close();
    // console.log(JSON.stringify(teamObjects, null, 2));
    return teamObjects;
  } catch (error) {
    console.log('Error in cs-get-teams scrape: ', error)
  }
}