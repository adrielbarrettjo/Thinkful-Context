function getPovertySeverity(code) {
	console.log(code);
	let povertySeverity = $.ajax({ 
		//http://api.worldbank.org/countries/az/indicators/1.2.PSev.2.5usd?format=jsonP&prefix=Getdata
		url: 'http://api.worldbank.org/countries/'+code+'/indicators/SP.POP.TOTL',
		data: {
			format: 'jsonP',
			date: '2000:2017'
		},
		type: 'GET',
		dataType: 'jsonp',
		jsonp: 'prefix',
	});
	console.log(povertySeverity)
	return povertySeverity;
}

function getCPI(code) {

	let CPI = $.ajax({ 
		url: 'http://api.worldbank.org/countries/'+code+'/indicators/2.01.03.01.prcpbase',
		type: 'GET',
		data: {
			format: 'jsonP',
			date: '2000:2017'
		},
		dataType: 'jsonp',
		jsonp: 'prefix'
	});
	console.log(CPI)
	return CPI;

}

function getGiniCoefficient() {
	console.log('gini ran');
	let giniCoefficient = '1';
	return giniCoefficient;
}

function getNetIncome() {
	console.log('netIncome ran');
	let netIncome = '1';
	return netIncome;
}


function generateCountryText(data) {	
	const povertySeverity = data[0][1][0].value;
	console.log(povertySeverity);
	const CPI = data[1][1][0].value;
	console.log(CPI);
	let giniCoefficient = data[2];
	let netIncome = data[3];
	console.log(data)
	let indicatorText = (`
	<div class="indicators">
		<p>Poverty Severity: ${povertySeverity}   </p>
		<p>Consumer Price Index: ${CPI} </p>
		<p>Gini Coefficient: ${giniCoefficient} </p>
		<p>Net Income as % of GDP: ${netIncome} </p>
	</div>

	<input type="submit" role="button" class="back-button" alt="Go Back to Map" value="Go Back to Map">
  `);
	return indicatorText
}

function clickCountry(event, code, region) {
	let povertySeverity = getPovertySeverity(code);
	let CPI = getCPI(code);
	let giniCoefficient = getGiniCoefficient(code);
	let netIncome = getNetIncome(code);
	Promise.all([povertySeverity, CPI, giniCoefficient, netIncome])
		.then(function(data) {
			$('.country-page').html(generateCountryText(data));
		});
	console.log(event);
	console.log(code);
	console.log(region);
	// generateCountryText();
	// getPovertySeverity(code).then(handleData);
	console.log(typeof(code));
	// $('.country-page').html(generateCountryText());
	//once data is appended to the dom, remove hidden class
	$('.map').addClass('hidden');
	$('.subheader').addClass('hidden');
	$('.country-page').removeClass('hidden');
}

function setUpMap() {
	$('#vmap').vectorMap({ 
		map: 'world_en', 
		onRegionClick: clickCountry,

	});
}


// $('button.country').click(function(){
// 	const countryId = $(this).data('id');
// 	$.ajax({
// 		url: '/data',
// 		type: 'GET',
// 		data: {
// 			countries: [countryId],
// 			indicators: ["do.biz.rnk"],
// 			timeframes: [2015, 2016]
// 		}
// 	}).then(function(data){
// 		console.log(data);
// 	});
// });


function onStart() {
  //calls all initializer functions.
  setUpMap();
}

$(onStart);

