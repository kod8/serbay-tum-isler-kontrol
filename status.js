const fs = require("fs");
const util = require("util");
const fetch = require('node-fetch');


function singleSiteCheck(socket, data) {

		//check site
		fetch(data.url)
    .then(res => {
        data.statusCode = res.status
		socket.emit("singleSiteCheck",data );
    }).catch(err => {
		data.statusCode ="unknown"
		socket.emit("singleSiteCheck",data );
	});
}

function multiSiteCheck(socket, data) {

	//check site

	//create result object

	//send result
	//socket.emit("checkResult", {type:"success" ,content:`Maps Arama işlemi başladı`});


}


module.exports = {singleSiteCheck,multiSiteCheck};
