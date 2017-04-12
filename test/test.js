// index.test.js
'use strict';

var expect = require( 'chai' ).expect;

var LambdaTester = require( 'lambda-tester' );

var myLambda = require( '../index' );

var assert = require('assert');


describe('API ', function() {
	[
	{
		 "startdate": "01/04/2019",
  		 "enddate": "01/05/2017",
	}
	].forEach(function(obj){
		it("Should succeed with: " + JSON.stringify(obj), function(done) {

			LambdaTester(myLambda.handler)
			.event(obj).expectResult().verify(done);
		});

	});

});