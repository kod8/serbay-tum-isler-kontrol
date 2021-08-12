const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const fetch = require('node-fetch');
const serveIndex = require('serve-index')
const { singleSiteCheck,multiSiteCheck } = require("./status.js");
const serbayListeURL = "http://www.serbay.net/json-tumisler.asp"



const SERVER_PORT = process.env.PORT || 3000;

let onlineClientsCustomUrl = new Set();

// create a new express app
const app = express();
// create http server and wrap the express app
const server = http.createServer(app);
// bind socket.io to that server
const io = socketio(server);

// important! must listen from `server`, not `app`, otherwise socket.io won't function correctly
server.listen(SERVER_PORT, () =>{
	console.info(`Listening on port ${SERVER_PORT}.`)
});


// serve static files from a given folder
app.use(express.static("public"));

//Serbay tüm işler socket
var statusSocket = io.of("/status");
// will fire for every new websocket connection
statusSocket.on("connection", statusSocketConnection);

app.get("/status/serbay", (req, res) => {
	res.sendFile("./public/status.html", { root: __dirname });
});

//on status socket connection
async function statusSocketConnection(socket) {
	console.info(`Socket ${socket.id} has connected.`);
	
	//get site list
	fetch(serbayListeURL)
    .then(res => res.json())
    .then(json => {
    json.forEach((site, index)=>{
        //site.name = site.url;
        site.id = index;
        site.url = "http://"+site.url;
    })
    socket.emit("siteList", json)});

	// on socket disconnect
	socket.on("disconnect", () => {
		console.info(`Socket ${socket.id} has disconnected.`);

    });
	
	//on site check
    socket.on("checkSite", async (data) => {
		checkSite(socket,data.id, data.url);
	});

	socket.on("singleSiteCheck", async (data) => {
		singleSiteCheck(socket,data);
	});

	//send a message to everyone
	//this.emit("message", "a person joined");
}
