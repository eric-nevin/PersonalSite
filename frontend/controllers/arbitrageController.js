(function(){
  'use_strict';
  angular
    .module('myApp')
    .controller('arbitrageController', arbitrageController);

function arbitrageController($scope, $routeParams, $location) {
	$('body').css('overflow', 'scroll');
	var arbCtrl = this;
	var associative = {};
	var profitable = [];
	arbCtrl.currency = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR'];
	arbCtrl.currency2 = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR'];
	arbCtrl.currency3 = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR'];
	arbCtrl.rates = [];
	arbCtrl.firstChoice = "";
	arbCtrl.rates2 = [];
	arbCtrl.secondChoice = "";
	arbCtrl.rates3 = [];
	arbCtrl.thirdChoice = "";
	$.getJSON("http://api.fixer.io/latest", function(data){
		success: pushValues(data.rates, data.base);

	});

	for (var i = 0; i < arbCtrl.currency.length; i++) {
		$.getJSON("http://api.fixer.io/latest?base=" + arbCtrl.currency[i], function(data){
			success: pushValues(data.rates, data.base);
		});
	}

	function pushValues(values, base){
		associative[base] = values;
		associative.length++;
		if(Object.keys(associative).length > 32){
			triangularArb(associative);
		}
	}

	function triangularArb(exchanges){
		var largest;
		var largestName;
		for(var key in exchanges){
			for(var key2 in exchanges[key]){
				for(var key3 in exchanges[key2]){
					if(key3 != key){
						var arb = exchanges[key][key2] * exchanges[key2][key3] * exchanges[key3][key];
						var final = "Final 1 " + key + " to " + key2 + " to " + key3 + " back to " +  arb + " " + key;
						var profKey = key + key2 + key3 + key;
						if(arb > 1){
							profitable[profKey] = arb;
							largest = arb;
							largestName = profKey;
						}
					}
					
				}

			}
		}
		for(var key4 in profitable){
			if(profitable[key4] > largest){
				largest = profitable[key4];
				largestName = key4;
			}
		}
		var profit = ((largest * 1000000) - 1000000).toFixed(2);
		var base = largestName.slice(0, 3);
		var first = largestName.slice(3, 6);
		var second = largestName.slice(6, 9);
		var USDConvert = exchanges["USD"][base] * exchanges[base]["USD"];
		var topProfit = "for every 1 million " + base + " invested, you would profit " + profit + " " + base + "'s! WHOA that's exciting!! Convert " + base + " to " + first + " then to " + second + " then back to " + base;
		$('#topProfit').html(topProfit);
		associativeSort(profitable);
	}

	function associativeSort(object){
		var objectKeys = [];
		var objectVals = [];
		var sorted = [];
		for(key in object){
			objectKeys.push(key);
			objectVals.push(object[key]);
		}
		for(var i = 1; i < objectVals.length; i++){
			if(objectVals[i] > objectVals[i - 1]){
				var temp = objectVals[i];
				var temp2 = objectKeys[i];
				var k = i - 1;
				while(objectVals[k] < temp && k >= 0){
	        		objectVals[k+1] = objectVals[k];
	        		objectKeys[k+1] = objectKeys[k];
	        		k--;
	      		}
	      		objectVals[k+1] = temp;
	      		objectKeys[k+1] = temp2;
	      	}
		}
	  	for(var j = 0; j < objectVals.length; j++){
	  		sorted.push(objectKeys[j] + ": " + objectVals[j]);
	  	}
	}
	arbCtrl.displayExchange = function(choice) {
		choice = choice[0];
		arbCtrl.rates = associative[choice];
		if (arbCtrl.firstChoice != undefined) {
			arbCtrl.currency2.splice(arbCtrl.index, 0, arbCtrl.firstChoice);
			arbCtrl.currency3.splice(arbCtrl.index, 0, arbCtrl.firstChoice);
			if (arbCtrl.currency2[0] == "") {
				arbCtrl.currency2.splice(0, 1);
			}
			if (arbCtrl.currency3[0] == "") {
				arbCtrl.currency3.splice(0, 1);
			}
		}
		arbCtrl.firstChoice = choice;
		arbCtrl.index = arbCtrl.currency2.indexOf(choice);
		arbCtrl.currency2.splice(arbCtrl.index, 1);
		arbCtrl.currency3.splice(arbCtrl.index, 1);
	}
	arbCtrl.displayExchange2 = function(choice) {
		choice = choice[0];
		arbCtrl.rates2 = associative[choice];
		if (arbCtrl.secondChoice != undefined) {
			arbCtrl.currency3.splice(arbCtrl.index, 0, arbCtrl.secondChoice);
			for (var i = 0; i < arbCtrl.currency3.length; i++){
				if (arbCtrl.currency3[i] == "") {
					arbCtrl.currency3.splice(i, 1);
				}
			}
		}
		arbCtrl.secondChoice = choice;
		var index = arbCtrl.currency3.indexOf(choice);
		arbCtrl.currency3.splice(index, 1);
	}
	arbCtrl.displayExchange3 = function(choice) {
		choice = choice[0];
		arbCtrl.rates3 = associative[choice];
		arbCtrl.thirdChoice = choice;
	}
	arbCtrl.calculateRate = function(start) {
		var effectiveRate = arbCtrl.rates[arbCtrl.secondChoice] * arbCtrl.rates2[arbCtrl.thirdChoice] * arbCtrl.rates3[arbCtrl.firstChoice];
		var totalRate = start * effectiveRate;
		var firstTotal = start * arbCtrl.rates[arbCtrl.secondChoice];
		var secondTotal = firstTotal * arbCtrl.rates2[arbCtrl.thirdChoice];
		var thirdTotal = secondTotal * arbCtrl.rates3[arbCtrl.firstChoice];
		$('#rateInfo').html("Effective Rate: " + effectiveRate + "<br>" 
		+ "Start: " + start + " " + arbCtrl.firstChoice + "<br>" 
		+ "End: " + totalRate + " " + arbCtrl.firstChoice + "<br>" 
		+ arbCtrl.firstChoice + " to " + arbCtrl.secondChoice + " rate: " + arbCtrl.rates[arbCtrl.secondChoice] + " (" + firstTotal + " " + arbCtrl.secondChoice + ")" + "<br>" 
		+ arbCtrl.secondChoice + " to " + arbCtrl.thirdChoice + " rate: " + arbCtrl.rates2[arbCtrl.thirdChoice] + " (" + secondTotal + " " + arbCtrl.thirdChoice + ")" + "<br>" 
		+ arbCtrl.thirdChoice + " to " + arbCtrl.firstChoice + " rate: " + arbCtrl.rates3[arbCtrl.firstChoice] + " (" + thirdTotal + " " + arbCtrl.firstChoice + ")"
		);
	}
}
})();