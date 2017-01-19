/* global $ */
$(function(){
	// coefficient y
	var calcCoefficientY = function(a, b, c, d) {
		return -2.0097 + (0.6335 * a) - (0.7315 * b) - (0.8102 * c) + (0.3186 * d);
	}
	// probability
	var calcProbability = function(y) {
		return 1 / (1 + Math.pow(Math.E, -y));
	}
	
	var $calcForm = $("#calcForm"),
		$resultInfo = $("#resultInfo"),
		$resultValue = $resultInfo.find("#resultValue");
	
	// calculation
	var calc = function() {
		var coefs = ["a", "b", "c", "d"],
			coefsValues = {};
		$.each(coefs, function(index, coefName){
			var $coef = $calcForm.find("[name=coef" + coefName.toUpperCase() + "]");
			if($coef.length > 1) {
				$coef = $calcForm.find("[name=coef" + coefName.toUpperCase() + "]:checked");
			}
			if($coef.length == 1) {
				coefsValues[coefName] = $coef.val();
			}
		});
		var result = calcProbability(calcCoefficientY(coefsValues.a, coefsValues.b, coefsValues.c, coefsValues.d));
		if(result && $resultInfo.length > 0) {
			if($resultInfo.hasClass("hidden")) {
				$resultInfo.removeClass("hidden");
			}
			$resultValue.text(result.toFixed(4));
		}
	}
	
	// events
	$calcForm.on("click", "#startCalc", calc);
	$calcForm.on("change", "input", calc);
});