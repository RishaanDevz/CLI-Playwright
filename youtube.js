const { chromium } = require('playwright');

async function playSong(songName) {
    const browser = await chromium.launch({
        headless: false // Run in non-headless mode to see the browser actions
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.youtube.com/');
    await page.getByPlaceholder('Search').click();
    await page.getByPlaceholder('Search').fill(songName);
    await page.getByPlaceholder('Search').press('Enter');

    await page.waitForTimeout(2000); // wait for search results to load

    // Wait for the video thumbnails to appear
    await page.waitForSelector('ytd-video-renderer', { timeout: 5000 });

    // Get the first video result link
    const firstVideo = await page.$('ytd-video-renderer a#thumbnail');

    // Get the href attribute of the first video link
    const videoUrl = await firstVideo.getAttribute('href');

    // Open the video in a new tab
    const videoPage = await context.newPage();
    await videoPage.goto(`https://www.youtube.com${videoUrl}`);

    // Wait for the navigation to complete (video page to load)
    await videoPage.waitForNavigation({ waitUntil: 'networkidle' });

    // Optionally, wait for the video to start playing (can be based on specific elements in the player)
    await videoPage.waitForSelector('.html5-video-player', { timeout: 5000 });

    // Press the space bar to play the video
    await videoPage.keyboard.press('Space');

    // Do not close the browser context and browser immediately to see the video
    // await context.close();
    // await browser.close();
}

module.exports = { playSong };
