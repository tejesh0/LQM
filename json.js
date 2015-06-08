
var request = require("request");
var prompt = require('prompt');
var jf = require('jsonfile');

 var properties = [
    {
      name: 'Latitude'
    },
    {
      name: 'longitude'
    },
    {
        name: 'Feature'
    }
  ];

// var lat="12.9141993";
// var lng="77.6383782";




function distance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344 
    return dist
}

 


function cal(at,ng,ty)
{
	var key = "";
	var link = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+at+","+ng+"&radius=500&types="+ty+"&key="+key;
    var file = "json_file/data.json";
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
            res.push({Name: obj['results'][i].name,Rating: obj['results'][i].rating})
            
        	//console.log(obj['results'][i].name);
        	//console.log(obj['results'][i].vicinity);
    	}
        res.push({Count: len});

        //var obj = {Hospitals: 'res'};
        jf.writeFile(file,res,function(err){
            console.log(err);
        });
        console.log(JSON.stringify(res));


    }
})

}
 

prompt.start();
prompt.get(properties, function (err, result) {
    //console.log('received');
    var lat = result.Latitude;
    var lng = result.longitude;
    var ty = result.Feature;
    // console.log(lat);
    // console.log(lng);
    cal(lat,lng,ty);
  });

