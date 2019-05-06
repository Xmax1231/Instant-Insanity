const puppeteer = require('puppeteer');
const merge = require('easy-pdf-merge');

const width = '1200px';
const height = '900px';
var pdfCount = 0;

(async () => {

	const browser = await puppeteer.launch();
	console.log(await browser.version());

	const page = await browser.newPage();

	await page.goto('http://127.0.0.1:8080', { waitUntil: 'networkidle2' });
	await printPDF(page, await browser.version() + ' Load home')

	await page.click('#gotoSetting')
	await page.waitFor(100)
	await printPDF(page, 'Go to setting')

	await page.click('#increaseBrickCount')
	await page.click('#increaseBrickCount')
	await page.waitFor(100)
	await printPDF(page, 'Increase brick count +2')

	await page.click('#gohome')
	await page.waitFor(100)
	await printPDF(page, 'Go back to home')

	await page.click('#start')
	await page.waitFor(100)
	await printPDF(page, 'Go to game')

	await page.waitFor(3000)
	await printPDF(page, 'Wait for 3 seconds')

	await page.$$eval('button', (buttons) => {
		buttons.forEach((el, _) => {
			console.log(el)
			console.log(el.textContent)
			if (el.textContent == 'Z1') el.click();
		})
	});
	await page.waitFor(100);
	await printPDF(page, 'Click all Z1 button');

	// page.on("dialog", async (dialog) => {
	// 	await page.waitFor(100);

	// 	await dialog.dismiss();
	// });

	// page.click('#submit')
	// await printPDF(page, 'Click submit');

	// await page.waitFor(100);
	// await printPDF(page, 'Dismiss confirm');

	await browser.close();

	await mergePDF();

})();

const printPDF = (page, text = '') => {
	pdfCount += 1
	console.log('printPDF ' + pdfCount + ' ' + text)
	return page.pdf({
		path: 'output/' + pdfCount + '.pdf',
		width: width,
		height: height,
		margin: {
			top: 50,
		},
		printBackground: true,
		displayHeaderFooter: true,
		headerTemplate: '<style>html {font-size: 10px;}</style>&nbsp;' + text,
	});
}

const mergePDF = () => {
	const pdfs = []
	for (let i = 1; i <= pdfCount; i++) {
		pdfs.push('output/' + i + '.pdf')
	}
	return new Promise((resolve, reject) => {
		merge(pdfs, 'output.pdf', function(err) {
			if (err) {
				console.log(err);
				reject(err)
			}
			console.log('Success');
			resolve()
		});
	});
};
