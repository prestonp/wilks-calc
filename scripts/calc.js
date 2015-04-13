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
