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
                console.log( colors.bgGreen(site + ": "+response.statusCode)) 
                acilan++;
finished++;
outputResults();

                }
            else{
                console.log( colors.bgRed(site + " : "+response.statusCode));
                hatali++;
                finished++;
outputResults();
            }
})
.on("error", function(err){
    console.log("Problem reaching URL: ",colors.bgRed(site));
                finished++;
outputResults();
return;
 })



})



function outputResults(){
if(finished==siteler.length){
console.log("\n");
console.log(colors.bgBlue("Toplam Site: ")+siteler.length);
console.log(colors.bgGreen("Toplam Açılan: ")+acilan);
console.log(colors.bgRed("Toplam Hatalı: ")+hatali);
}
}




