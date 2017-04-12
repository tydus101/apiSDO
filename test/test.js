// index.test.js
'use strict';

var expect = require( 'chai' ).expect;

var LambdaTester = require( 'lambda-tester' );

var myLambda = require( '../index' );

var assert = require('assert');


describe('API ', function() {
	[
	{
		 "startdate": "01/04/1998",
  		 "enddate": "01/05/1998",
	}
	].forEach(function(obj){
		it("Should succeed with: " + JSON.stringify(obj), function(done) {

			LambdaTester(myLambda.handler)
			.event(obj).expectSucceed(function(result){
				expect(result.valid).to.be.true;
			}).verify( done );
		});

	});

});