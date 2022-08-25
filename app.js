const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
    console.log("post req received");
    const apikey = "8cd793dc560e73fbdfdab242388b722d";
    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=metric";
    
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherdata = JSON.parse(data);
            console.log(weatherdata)
            const des = weatherdata.weather[0].description;
            const temp = weatherdata.main.temp;
            res.write("<p> the current temperature in the city " + city + " is " + temp + "</p>");
            // point to rem : you do not use res.write and re.send together....
            // you either use res.write multiple times followed by res.end() or just single res.send()
           res.end();
        });
        // now if you want to convert the parsed data to a string then you can use stringify on weatherdata to convert it back to JSON
        // just like JSON.stringify(weatherdata);
        
    });
});



app.listen(3000,function(){
    console.log("Server is running on port 3000");
});