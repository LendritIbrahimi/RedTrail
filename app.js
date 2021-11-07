const puppeteer = require("puppeteer-extra")
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


//SCROLL FUNCTION
async function scroll(page, length) {
  await page.evaluate(async (length) => {
    await new Promise((resolve, reject) => {
      var totalHeight = -1*Math.abs(length);
      var distance = 5;
      var timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight > 0) {
          clearInterval(timer);
          resolve();
        }
      }, 5);
    });
  }, length);
}


//SLEEP FUNCTION
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function main() {
  let browser;
  (async () => {
    //CREATE BROWSER
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--start-maximized'],
      headless: false
    })

    //GO TO A REDDIT POST / NEEDS TO BE AUTOMATED IN THE FUTURE
    const [page] = await browser.pages();
    await page.goto("https://www.reddit.com/r/AskReddit/comments/q03m1p/whats_something_you_think_we_can_all_agree_on/");

    //ACTIVATE DARK MODE
    await page.waitForSelector('#USER_DROPDOWN_ID', { visible: true });
    await page.click("#USER_DROPDOWN_ID");
    await page.waitForSelector('._2KotRmn9DgdA58Ikji2mnV', { visible: true });
    await page.click("._2KotRmn9DgdA58Ikji2mnV");

    //FETCH PARENT POSTS & THEIR INFOS
    await page.waitForSelector("div._1z5rdmX8TDr6mqwNv7A70U:nth-child(2)", { visible: true });
    const commentResults = await page.evaluate(() =>
      [...document.querySelectorAll("div._1z5rdmX8TDr6mqwNv7A70U:nth-child(2)")].map((e) => ({
        text: e.querySelector("._1qeIAgB0cPwnLhDF9XSiJM").innerText,
        username: e.querySelector("._23wugcdiaj44hdfugIAlnX").innerText,
        upvotes: e.querySelector("._1rZYMD_4xY3gRcSS3p8ODO").innerText,
      }))
    );

    console.log(commentResults);
  })()
    .catch((e) => console.log(e))
    .finally(async () => await browser.close());
}

main();
