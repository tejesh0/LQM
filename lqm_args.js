
var request = require("request");
var prompt = require('prompt');
var geolib = require('geolib');
var sleep = require('sleep');

 
function cal(at,ng,ty, callback)
{

    var key = "";
    var link = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+at+","+ng+"&radius=5000&types="+ty+"&key="+key;

//console.log(link);
request({
    url: link,
    json: true
}, function (error, response, obj) {

    if (!error && response.statusCode === 200) {
        
        var len=obj['results'].length;
        var count=len;
        var final_rate=0;
        
        for(var i=0;i<len;i++)
        {

            //distance
            var lat2=obj['results'][i]['geometry']['location'].lat;
            var lng2=obj['results'][i]['geometry']['location'].lng;
            var dist = (geolib.getDistance(
                {latitude: at, longitude: ng}, 
                {latitude: lat2, longitude: lng2}
            ))/1000;
            if(dist>5.0&&dist<=6.0)
            {
                dist=5.0;
            }
            else if(dist>6.0)
            {
                dist=10;
                count--;
            }


           //rating
           var rate;
           if(obj['results'][i].rating == undefined)
           {
                rate=2.5;
           }
           else
           {
            rate=obj['results'][i].rating;
           }

           var df=0.5*(2-(dist/5));
           var rf=rate/5.0;

            final_rate=(df*rf)+final_rate;

            //name and rating
            //console.log(obj['results'][i].name+"\t"+rate);
            //console.log("\n");

            //console.log(lat2+"\t"+lng2+"\t"+dist);
            //console.log(obj['results'][i].vicinity);
            
            
        }

        //final rating
        // console.log("final"+final_rate);
        //console.log("count"+count);
        console.log("rating"+(final_rate/count));
        return (final_rate/count);
        console.log("\n");
        callback()
        


    }
})

}


var lat = process.argv[2];
var lng = process.argv[3];

var ty = ["bus_station|train_staion|airport","hospital","bar"];
var wt=[]

var types = ["bus_station|train_staion|airport","shopping_mall|department_store|convenience_store|grocery_or_supermarket","food",
"atm","hospital","movie_theater",
"local_government_office","amusement_park|aquarium|church|hindu_temple|mosque|museum|zoo","bar","spa|gym"];
var weights=[12,6,20,12,6,8,3,15,12,5];



var final_rs=0;
    var answer=0;
    // console.e(lat);
    // console.log(lng);
        for(var i=0;i<10;i++)
        {
            answer=cal(lat,lng,types[i]);
            console.log("Answer:"+types[i]+"\t"+answer)
            final_rs= final_rs+ weights[i]*final_rs;
            
        }
        
    
    
    console.log("\nFinal Answer"+"\t"+final_rs);
