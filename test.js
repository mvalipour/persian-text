'use strict';
var assert = require('chai').assert;

describe('text normalizing', function () {
	var sut = require('./index.js').normalize;

	function testLength(word, length) {
		it('`'+word+'` should yield `'+length+'` chars', function () {
			assert.equal(length, sut(word).length);
		});
	}

	testLength('ﷲ', 4);
});

describe('mapping file', function () {
	var mapping = require('./mapping.json');

	// in all of the values in the mapping
	// there should only be same exact 33 characters
	// appearing.
	it('should have the exact 33 chars in values', function () {
		var charCodes = [];
		for(var k in mapping) {
			mapping[k].split('').map(function (c) { return c.charCodeAt(0); })
				.forEach(function (c) {
					if(charCodes.indexOf(c) < 0) {
						charCodes.push(c);
					}
				})
		}

		var expected = [
	    1570,
	    1575,
	    1576,
	    1578,
	    1579,
	    1580,
	    1581,
	    1582,
	    1583,
	    1584,
	    1585,
	    1586,
	    1587,
	    1588,
	    1589,
	    1590,
	    1591,
	    1592,
	    1593,
	    1594,
	    1601,
	    1602,
	    1604,
	    1605,
	    1606,
	    1607,
	    1608,
	    1662,
	    1670,
	    1688,
	    1705,
	    1711,
	    1740
	  ];

		assert.sameMembers(expected, charCodes);
	});
});
