(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var coeffs = require('./coefficients');
var lbToKg = 0.453592;

var calc = module.exports = {
  wilks: function(bw, gender, units) {
    if (units === 'lbs') bw *= lbToKg;
    var denom = coeffs[gender].reduce(function(sum, k, idx, list) {
      return sum + k * Math.pow(bw, idx);
    }, 0);

    return 500 / denom;
  },

  rating: function(total, bw, gender, units) {
    if (units === 'lbs') total *= lbToKg;
    return total * calc.wilks(bw, gender, units);
  }
};

},{"./coefficients":2}],2:[function(require,module,exports){
var coeffs = { 
  male: [
    -216.0475144,
    16.2606339,
    -0.002388645,
    -0.00113732,
    7.0186e-06,
    -1.291e-08
  ],
  female: [
    594.31747775582,
    -27.23842536447,
    0.82112226871,
    -0.00930733913,
    0.00004731582,
    -0.00000009054
  ]
};

module.exports = coeffs;

},{}],3:[function(require,module,exports){
var calc = require('./calc');


var $gender = $('#gender');
var $units = $('#units');
var $weight = $('#weight');
var $liftTotal = $('#lift-total');

var $coefficient = $('#coefficient');
var $rating = $('#rating');

var recalc = function(e) {
  var gender = $gender.val();
  var units = $units.val();
  var bw = $weight.val();
  var total = $liftTotal.val();

  $coefficient.html('Wilks coefficient: '+ calc.wilks(bw, gender, units));
  $rating.html('Rating: '+ calc.rating(total, bw, gender, units));

};

$('input, select').change(recalc);
$('input').keyup(recalc);

},{"./calc":1}]},{},[3]);
