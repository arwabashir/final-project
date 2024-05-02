const puppeteer = require("puppeteer");

async function go() {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });

        const page = await browser.newPage();

        // Setup dialog listener 
        page.on('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });

        // Visit the site
        await page.goto("https://is424-final-project.web.app/peaceofmind.html");

        // clicks navbar
        await page.waitForSelector("nav > .navbar-brand > a", { visible: true });
        console.log("Clicked nav button");
        await page.click("nav > .navbar-brand > a");

        // Clicks sign in button
        await page.waitForSelector("#signinbtn", { visible: true });
        console.log("Clicked sign in button");
        await page.click("#signinbtn");

        // User will provide email/password for signing in
        await page.waitForSelector("#email2", { visible: true });
        await page.type("#email2", "peace0mind15@yahoo.com");
        await page.waitForSelector("#pass2", { visible: true });
        await page.type("#pass2", "123456");

        // Clicks submit button
        await page.waitForSelector("#submit2", { visible: true });
        console.log("Clicked submit button");
        await page.click("#submit2");

        // Wait for possible navigation or page update
        await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 }).catch(e => console.log('Navigation after sign in complete:', e));

        // clicks navbar
        await page.waitForSelector("nav > .navbar-brand > a", { visible: true });
        console.log("Clicked nav button");
        await page.click("nav > .navbar-brand > a");
        
        // clicks leave a review tab
        await page.waitForSelector("#leaveareviewpage", { visible: true });
        await page.evaluate(() => document.querySelector("#leaveareviewpage").scrollIntoView());
        await page.click("#leaveareviewpage");
        console.log("Clicked leave a review page button");

        // User will provide name/review
        await page.waitForSelector("#name_input", { visible: true });
        await page.type("#name_input", "group 4");
        await page.waitForSelector("#review_input", { visible: true });
        await page.type("#review_input", "this is a test!");

        //clicks submit
        await page.waitForSelector("#submission", { visible: true });
        console.log("Clicked submit button");
        await page.click("#submission");

        // Set 2 second delay 
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log("All operations completed successfully.");

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Call go()
go();


