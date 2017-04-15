var AWS = require('aws-sdk');
var cheerio = require('cheerio');
var request = require('request');
const SDOMISSIONSTART = new Date("4/1/2010");
// index.test.js




exports.handler = (event, context, callback) => {
    var startdate = null;
    var enddate = null;

    var response = { 
    };

    if(event.startdate && event.enddate){
        startdate = new Date(event.startdate);
        enddate = new Date(event.enddate);
        //If there is no startdate or enddate
        if(isNaN(startdate) || isNaN(enddate)){
            callback("Invalid date input.", event);
        }
        //If startdate is before mission start, throw error.
        if(startdate < SDOMISSIONSTART){
            console.log(SDOMISSIONSTART);
           callback("Start date must be after data start date: " 
           + SDOMISSIONSTART.toDateString());
        }
        //Is the End date before the start date?
        if(enddate < startdate){
            callback("End Date must be after Start Date.");
        }
        if(enddate > Date.now()){
            callback("End date cannot be in the future!")
        }

        console.log(SDOMISSIONSTART)
    }
    else{
        callback("Both start and end date must be selected.", event);
    }





    callback(null, response);
};
