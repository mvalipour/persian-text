'use strict';

var map = require('./mapping.json');
var meta = require('./meta.json');

function normalize(text) {
  return text.split('')
    .map(function (c) {
      var mapped = map[c.charCodeAt(0)];
      return typeof mapped === 'undefined' ? ' ' : mapped;
    })
    .join('');
}

function denormalize(text) {
  text = normalize(text);

  function getConfig(ix) {
    var code = text.charCodeAt(ix).toString(16).toUpperCase();
    return meta[code] || {};
  }

  var config = {}, prevConfig, nextConfig = getConfig(0);

  return text.split('').map(function (char, ix) {
    prevConfig = config;
    config = nextConfig;
    nextConfig = getConfig(ix + 1);
    var res = char;
    if(config && config.isolated) {
      var connectedBeg = !!prevConfig.initial;
      var connectedEnd = !!nextConfig.final;
      var form = config.isolated;
      // console.log(char, char.charCodeAt(0).toString(16), connectedBeg, connectedEnd);
      if(connectedEnd && connectedBeg && config.medial) {
        form = config.medial;
      }
      else if (connectedEnd && config.initial) {
        form = config.initial;
      }
      else if (connectedBeg && config.final) {
        form = config.final;
      }
      res = form ? String.fromCharCode(parseInt(form, 16)) : char;
    }
    return res;
  }).join('');
}

module.exports = {
  normalize: normalize,
  denormalize: denormalize
};
