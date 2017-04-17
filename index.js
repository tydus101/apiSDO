var AWS = require('aws-sdk');
const cheerio = require('cheerio');
var request = require('request');
const SDOMISSIONSTART = new Date("4/1/2010");
const URL = "https://sdo.gsfc.nasa.gov/assets/img/browse/"
// index.test.js




exports.handler = (event, context, callback) => {
    var startdate = null;
    var enddate = null;
    //Response to be returned by the callback, if successful.
    var response = { 
    };

    if(event.startdate && event.enddate){
        startdate = new Date(event.startdate);
        enddate = new Date(event.enddate);
        //If there is no startdate or enddate
        if(isNaN(startdate) || isNaN(enddate)){
            callback("Invalid date input.", event);
            process.close();
        }
        //If startdate is before mission start, throw error.
        if(startdate < SDOMISSIONSTART){
           callback("Start date must be after data start date: " 
           + SDOMISSIONSTART.toDateString());
           process.close();
        }
        //Is the End date before the start date?
        if(enddate < startdate){
            callback("End Date must be after Start Date.");
            process.close();
        }
        if(enddate > Date.now()){
            callback("End date cannot be in the future!");
            process.close();
        }

    }
    else{
        callback("Both start and end date must be selected.", event);
        process.close();
    }
    console.log("test");
    var startyear = startdate.getFullYear();
    var endyear = enddate.getFullYear();
    var startmonth = startdate.getMonth() + 1;
    var endmonth = enddate.getMonth() + 1;
    var startday = startdate.getDate();
    var endday = enddate.getDate();
    var curDate = startdate;
    while(curDate <= enddate){

            //console.log(curDate);
            request(URL, function(error, response, body){
                if(error) {
                    callback("Internal Error." + error);
                    process.close();
                    return;
                }
                cheerio.load(body);
                console.log(curDate);

            });
            curDate.setDate(curDate.getDate() + 1);

    }

};
