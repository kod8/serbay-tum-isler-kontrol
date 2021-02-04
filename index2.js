const { siteler } = require("./links2.js");
const colors = require("colors");
const request = require("request");

var acilan = 0;
var hatali = 0;
var finished = 0;

var finishedArray = [];

siteler.forEach((site) => {
	request("http://"+site)
		.on("response", function (response) {
			if (response.statusCode == 200) {
				finished++;
				//console.log( finished + " ✅️ "+ colors.bgGreen(response.statusCode) +": "+ site)
				acilan++;

				finishedArray.push(site);
				logLeft();
				outputResults();
			} else if (String(response.statusCode).startsWith("5")) {
finished++;
				console.log(
					finished + " ❌️ " + colors.bgYellow(response.statusCode + ": " + site)
				);
				hatali++;
				
				finishedArray.push(site);
				logLeft();
				outputResults();
			} else {
				finished++;
				console.log(finished + " ❌️ " + colors.bgRed(response.statusCode + ": " + site));
				hatali++;

				finishedArray.push(site);
				logLeft();
				outputResults();
			}
		})
		.on("error", function (err) {
finished++;
			console.log(finished + " Problem reaching URL: ", colors.bgRed(site));
			hatali++;
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
//console.log("\n");
	//console.log(JSON.stringify(siteler.filter(_=>!finishedArray.includes(_))))
//console.log("\n");
}
