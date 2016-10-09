'use strict';

var map = require('./mapping.json')

function normalize(text) {
  return text.split('')
    .map(function (c) { return map[c.charCodeAt(0)] || ' '; })
    .join('');
}

module.exports = {
  normalize: normalize
};
