let isGettingPeople = false;
function getPeople() {
	isGettingPeople = true;
	// getPeoplePuppet();
	getPeopleFast();
}
async function getPeoplePuppet() {
	const startTime = new Date();
	document.getElementById(
		"output"
	).innerHTML = `<img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/b6e0b072897469.5bf6e79950d23.gif'/>`;
	document.getElementById("output").innerHTML += `<div id="myProgress">
			<div id="myBar"></div>
		</div>`;

	let pageNum = 1;
	let allChar = [];
	while (true) {
		const pageData = await fetch(
			`https://swapi.dev/api/people/?page=${pageNum}`
		);
		const pageJSON = await pageData.json();
		console.log(pageJSON);
		// progress bar progressing
		const progress = (allChar.length / pageJSON.count) * 80;
		document.getElementById("myBar").style.width = `${progress}%`;

		allChar = [...allChar, ...pageJSON.results];
		console.log(allChar);
		if (pageJSON.next == null) break;
		pageNum++;
	}
	console.log(allChar);
	const random = Math.floor(Math.random() * (allChar.length + 1));
	// sometimes allChar[random] is undefined
	if (allChar[random]) {
		const name = allChar[random].name;
		const srcData = await fetch(`/src/${name}`);
		const { src } = await srcData.json();
		console.log("this is srcData from localhost 5000");
		console.log(src);
		const removedEverythingAfterJPG = src.replace(
			/^(.+?\.(png|jpe?g)).*$/i,
			"$1"
		);
		console.log(removedEverythingAfterJPG);
		const image = `<img src='${removedEverythingAfterJPG}'/>`;
		const endTime = new Date();
		const totalTime = `Elapsed time = ${(endTime - startTime) / 1000}`;
		document.getElementById(
			"output"
		).innerHTML = `<h1>${name}</h1><br>Web Scrape with Puppeteer method<br>${totalTime} seconds<br>${image}`;
		isGettingPeople = false;
	} else {
		getPeoplePuppet();
	}
}
async function getPeopleFast() {
	const startTime = new Date();
	document.getElementById(
		"outputFast"
	).innerHTML = `<img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/b6e0b072897469.5bf6e79950d23.gif'/>`;
	const allData = await fetch(
		"https://akabab.github.io/starwars-api/api/all.json"
	);
	const allJSON = await allData.json();
	const random = Math.floor(Math.random() * (allJSON.length + 1));
	if (allJSON[random]) {
		const name = allJSON[random].name;
		const src = allJSON[random].image;
		const imageEl = `<img src='${src}'/>`;
		const endTime = new Date();
		const totalTime = `Elapsed time = ${(endTime - startTime) / 1000}`;
		document.getElementById(
			"outputFast"
		).innerHTML = `<h1>${name}</h1><br>API method<br>${totalTime} seconds<br>${imageEl}`;
		// remove this if with pupppeteer
		setTimeout(()=>		isGettingPeople = false,3000)
	} else {
		getPeopleFast();
	}
}
