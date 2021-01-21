const { siteler } = require("./links.js");
const colors = require("colors");
const request = require("request");

var acilan = 0;
var hatali = 0;
var finished = 0;

var finishedArray = [];

siteler.forEach((site) => {
	request(site)
		.on("response", function (response) {
			if (response.statusCode == 200) {
				//console.log( "✅️ "+ colors.bgGreen(response.statusCode) +": "+ site)
				acilan++;
				finished++;
				finishedArray.push(site);
				logLeft();
				outputResults();
			} else if (String(response.statusCode).startsWith("5")) {
				console.log(
					"❌️ " + colors.bgYellow(response.statusCode + ": " + site)
				);
				hatali++;
				finished++;
				finishedArray.push(site);
				logLeft();
				outputResults();
			} else {
				console.log("❌️ " + colors.bgRed(response.statusCode + ": " + site));
				hatali++;
				finished++;
				finishedArray.push(site);
				logLeft();
				outputResults();
			}
		})
		.on("error", function (err) {
			console.log("Problem reaching URL: ", colors.bgRed(site));
			hatali++;
			finished++;
			finishedArray.push(site);
			logLeft();
			outputResults();
			return;
		});
});

function outputResults() {
	if (finished == siteler.length) {
		console.log(colors.bgBlue("Toplam Site: ") + siteler.length);
		console.log(colors.bgGreen("Toplam Açılan: ") + acilan);
		console.log(colors.bgRed("Toplam Hatalı: ") + hatali);
	}
}

function logLeft() {
	//console.log(JSON.stringify(siteler.filter(_=>!finishedArray.includes(_))))
}
