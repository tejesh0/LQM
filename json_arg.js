
var request = require("request");
var prompt = require('prompt');

 

var key = "";
var lat = process.argv[2];
var lng = process.argv[3];
var ty = process.argv[4]; 

var link = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lng+"&radius=500&types="+ty+"&key="+key;
//console.log(link);

request({
    url: link,
    json: true
}, function (error, response, obj) {

    if (!error && response.statusCode === 200) {
        //console.log(obj)
        //var con=JSON.stringify(obj); 
        var len=obj['results'].length;
        var res=[];
        for(var i=0;i<len;i++)
        {
            res.push({Hosp: obj['results'][i].name})
            //console.log(obj['results'][i].name);
            //console.log(obj['results'][i].vicinity);
        }

        console.log(JSON.stringify(res));


    }
})