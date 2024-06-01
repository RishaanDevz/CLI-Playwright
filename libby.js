// libby.js
const { chromium } = require('playwright');
require('dotenv').config();

async function borrowBook(bookName) {
    const browser = await chromium.launch({
        headless: false // Run in non-headless mode to see the browser actions
    });

    const location = process.env.location;
    const cardID = process.env.cardID;
    const libname = process.env.libname;

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://libbyapp.com/interview/welcome#doYouHaveACard');
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Search For A Library' }).click();
    await page.getByPlaceholder('Library name, city, or zip').click();
    await page.getByPlaceholder('Library name, city, or zip').fill('downloadlibrary');
    await page.getByRole('button', { name: libname }).click();
    await page.getByRole('button', { name: 'Sign In With My Card' }).click();
    await page.getByRole('button', { name: location }).click();
    await page.getByPlaceholder('card number').click();
    await page.getByPlaceholder('card number').fill(cardID);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByLabel('Search', { exact: true }).click();
    await page.getByPlaceholder('Search…').click();
    await page.getByPlaceholder('Search…').fill(bookName);
    await page.getByPlaceholder('Search…').press('Enter');

    await page.waitForTimeout(3000); // wait for search results to load

    await page.getByRole('link', { name: 'Borrow' }).first().click();
    await page.getByRole('button', { name: 'Borrow' }).click();

    // Close the browser context and browser
    // await context.close();
    // await browser.close();
}

module.exports = { borrowBook };
