const {siteler} = require('./links.js');
const colors = require('colors');
const request = require('request');

var acilan = 0;
var hatali = 0;
var finished = 0;


siteler.forEach(site=>{
    request(site)
        .on('response', function(response) {
            if(response.statusCode==200) {
                console.log( "✅️ "+ colors.bgGreen(response.statusCode) +": "+ site) 
                acilan++;
finished++;
outputResults();

                }
else if(response.statusCode==500) {
                console.log("❌️ "+colors.bgYellow(response.statusCode+": "+site) ) 
                hatali++;
finished++;
outputResults();

                }
            else{
                console.log( "❌️ "+colors.bgRed(response.statusCode+": "+ site));
                hatali++;
                finished++;
outputResults();
            }
})
.on("error", function(err){
    console.log("Problem reaching URL: ",colors.bgRed(site));
                hatali++;
                finished++;
outputResults();
return;
 })



})



function outputResults(){

if(finished==siteler.length){
console.log(colors.bgBlue("Toplam Site: ")+siteler.length);
console.log(colors.bgGreen("Toplam Açılan: ")+acilan);
console.log(colors.bgRed("Toplam Hatalı: ")+hatali);
}
}




