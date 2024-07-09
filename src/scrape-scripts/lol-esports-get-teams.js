import 'dotenv/config';
import puppeteer from 'puppeteer';

export default async function getLoLTeams() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(process.env.SCRAPE_SITE_BASE_URL);

  const leagues = await page.$$('li.league');

  const leagueObjects = await Promise.all(leagues.map(async (league) => {
    const innerText = await page.evaluate(league => league.innerText, league);
    const splitInnerText = innerText.split('\n') || innerText;
    const leagueName = splitInnerText[0];
    const leagueRegion = splitInnerText[1];
    return {
      leagueName,
      leagueRegion
    }
  }));

  await browser.close();
  
  return leagueObjects;
};