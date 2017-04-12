// index.test.js
'use strict';

var expect = require( 'chai' ).expect;
var LambdaTester = require( 'lambda-tester' );
var myLambda = require( '../index' );
var assert = require('assert');

//These constants should always succeed 
const STARTDATE = "01/04/2016" //Must use with ENDDATE
const ENDDATE = "01/04/2017"
const SIZE = "1024"



//All date test events where API should succeed.
describe('Date test: API ', function() {
	[
	//1
	{
		 "startdate": "01/04/2016",
  		 "enddate": "01/05/2017",
  		 "size": SIZE,
	},
	//2 Test current date edge case
	{
		 "startdate": "04/01/2010",
  		 "enddate": Date.now(),
  		 "size": SIZE,
	},
	//3 Test same dates
	{
		 "startdate": "04/01/2010",
  		 "enddate": "04/01/2010",
  		 "size": SIZE,
	}
	].forEach(function(obj){
		it("should succeed with: " + JSON.stringify(obj), function(done) {

			LambdaTester(myLambda.handler)
			.event(obj).expectResult().verify(done);
		});

	});

});

//All date test events where API should fail.
describe('Date test: API ', function() {
	[
	// Test earlier start date
	{
		 "startdate": "01/04/2016",
  		 "enddate": "01/05/2015",
  		 "size": SIZE,
	},
	//Test future end date
	{
		 "startdate": "04/01/2011",
  		 "enddate": "01/04/2999",
  		 "size": SIZE,
	},
	//Test before mission date
	{
		 "startdate": "04/01/2008",
  		 "enddate": "01/04/2011",
  		 "size": SIZE,
	},
	// Test day before end date
	{
		 "startdate": "04/02/2011",
  		 "enddate": "04/01/2011",
  		 "size": SIZE,
	},
	//Test if actual start date
	{
		 "startdate": "notadate",
  		 "enddate": "01/04/2011",
  		 "size": SIZE,
	},
	//test if actual end date
	{
		 "startdate": "04/01/2011",
  		 "enddate": "dateitisnot",
  		 "size": SIZE,
	}
	].forEach(function(obj){
		it("should fail with: " + JSON.stringify(obj), function(done) {

			LambdaTester(myLambda.handler)
			.event(obj).expectError().verify(done);
		});

	});

});