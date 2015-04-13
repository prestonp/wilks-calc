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
