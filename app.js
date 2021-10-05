const puppeteer = require("puppeteer");

function main() {

	let browser;
	let url = "https://www.reddit.com/r/test/comments/agi5zf/test/";
	let selector = 'div._1z5rdmX8TDr6mqwNv7A70U:nth-child(2) ';

	(async () => {
		browser = await puppeteer.launch({
			args: [
				"--ignore-certificate-errors",
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--disable-accelerated-2d-canvas",
				"--disable-gpu",
			],
			ignoreHTTPSErrors: true,
			headless: false,
		});
		const [page] = await browser.pages();

		await page.goto(url, {
			waitUntil: 'networkidle0',
		});

		await page.waitForSelector(selector, { visible: true });
		const commentResults = await page.evaluate((selector) =>
			[...document.querySelectorAll(selector)].map((e) => ({
				text: e.querySelector("._1qeIAgB0cPwnLhDF9XSiJM").innerText,
				username: e.querySelector("._13ScjOmi6dGdJw0JAonQEr").innerText,
				upvotes: e.querySelector("._1rZYMD_4xY3gRcSS3p8ODO").innerText,

			})), selector
		);

		console.log(commentResults);
	})()
		.catch((err) => console.log(err))
		.finally(async () => await browser.close());
}

main();