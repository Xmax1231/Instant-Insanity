const fs = require('fs');

class Printer {
	constructor(outdir) {
		this.outdir = outdir;
		this.imgCount = 0;
	}

	writeText(text = '') {
		fs.appendFileSync(this.outdir + 'result.html', text + '<br>\n', function(err) {
			if (err) throw err;
		})
	}

	async writeImg(page, text = '') {
		this.imgCount++;
		let filename = this.imgCount + '.png';

		console.log('writeImg ' + filename + ' ' + text)
		this.writeText(text)
		this.writeText('<img src="' + filename + '" width="50%">')
		return page.screenshot({
			path: this.outdir + filename
		});
	}
}

module.exports = {
	'Printer': Printer
}
