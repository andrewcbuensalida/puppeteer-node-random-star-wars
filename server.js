const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const PORT = process.env.PORT || 5000;
var cors = require("cors");

app.use(express.static("./public"));
app.use(cors());

// this thing crashes the server if the server has only 1gb memory
app.get("/src/:name", async (req, res) => {
	console.log(req.params.name);
	console.log("1");
	const browser = await puppeteer.launch({
		headless: "true",
	});
	console.log("2");

	const page = await browser.newPage();
	console.log(`3`);

	const query = `https://www.google.com/search?source=lnms&tbm=isch&sa=X&q=${req.params.name}`;

	await page.goto(query, {
		waitUntil: "networkidle0",
	});
	console.log(`4`);
	await page.waitForSelector(
		"#islrg > div.islrc > div:nth-child(1) > a.wXeWr.islib.nfEiy > div.bRMDJf.islir > img"
	);
	console.log(`5`);

	const src = await page.$eval(
		"#islrg > div.islrc > div:nth-child(1) > a.wXeWr.islib.nfEiy > div.bRMDJf.islir > img",
		(node) => node.src
	);
	console.log(`6`);

	browser.close();
	console.log("7");
	res.json({ src });
});

app.listen(PORT, () => console.log(`listening to ${PORT} baby`));
