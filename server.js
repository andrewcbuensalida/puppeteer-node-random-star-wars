const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const PORT = process.env.PORT || 80;
var cors = require("cors");
console.log(PORT);
app.use(express.static("./public"));
app.use(cors());
app.get("/src/:name", async (req, res) => {
	console.log(req.params.name);
	console.log("puppeteering");
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	const query = `https://www.google.com/search?source=lnms&tbm=isch&sa=X&q=${req.params.name}`;
	await page.goto(query, {
		waitUntil: "networkidle0",
	});
	await page.waitForSelector(
		"#islrg > div.islrc > div:nth-child(1) > a.wXeWr.islib.nfEiy > div.bRMDJf.islir > img"
	);
	const src = await page.$eval(
		"#islrg > div.islrc > div:nth-child(1) > a.wXeWr.islib.nfEiy > div.bRMDJf.islir > img",
		(node) => node.src
	);
	browser.close();
	// console.log(src);
	res.json({ src });
});

app.listen(PORT, () => console.log(`listening to ${PORT}`));
