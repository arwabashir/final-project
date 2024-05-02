const puppeteer = require("puppeteer");

async function go() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Setup dialog listener
    page.on("dialog", async (dialog) => {
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
    await page.type("#email2", "test@test.com");
    await page.waitForSelector("#pass2", { visible: true });
    await page.type("#pass2", "1234567");

    // Clicks submit button
    await page.waitForSelector("#submit2", { visible: true });
    console.log("Clicked submit button");
    await page.click("#submit2");

    // Wait for possible navigation or page update
    await page
      .waitForNavigation({ waitUntil: "networkidle0", timeout: 10000 })
      .catch((e) => console.log("Navigation after sign in complete:", e));

    // Clicks navbar
    await page.waitForSelector("nav > .navbar-brand > a", { visible: true });
    console.log("Clicked nav button");
    await page.click("nav > .navbar-brand > a");

    // Clicks the booking tab
    await page.waitForSelector("#bookingpage", {
      visible: true,
      timeout: 60000,
    });
    console.log("Clicked booking page tab");
    await page.click("#bookingpage");

    // Clicks day selector
    await page.waitForSelector("#daySelector", { visible: true });
    await page.type("#daySelector", "Wednesday");

    // This assumes the ID needs proper escaping due to starting with a number
    await page.waitForSelector("[id='2024-5-1'] > div > button", {
      visible: true,
    });
    console.log("Clicked book button");
    await page.click("[id='2024-5-1'] > div > button");

    // Press radio button
    await page.waitForSelector("#lookingToBeCaretaker", { visible: true });
    console.log("Clicked looking to be caretaker");
    await page.click("#lookingToBeCaretaker");

    // Add a comment
    await page.waitForSelector("#bookingComments", { visible: true });
    await page.type("#bookingComments", "this is a test!");

    //CLicks Book Button
    await page.waitForSelector("#bookAppointmentButton", { visible: true });
    console.log("Appointment is Booked!");
    await page.click("#bookAppointmentButton");

    //CLicks Confirm
    await page.waitForSelector("#confirmButton", { visible: true });
    console.log("Appointment is Confirmed!");
    await page.click("#confirmButton");

    // Set 2 second delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("All operations completed successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Call go()
go();
