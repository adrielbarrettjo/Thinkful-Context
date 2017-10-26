function makeRequest(code) {
	var countrylong = isoConvert(code);
	console.log(countrylong);
	return $.ajax({ 
		url: 'http://api.worldbank.org/countries',
		type: 'GET',
		data: {
			countries: countrylong,
			indicators: "3.0.Gini",
			format: JSON
		}
	});
}

// function handleData(data) {
// 	console.log(data);
// }


function generateCountryText() {
	let indicatorText = (`
	<div class="indicators">
		<p>Poverty Severity</p>
		<p>Consumer Price Index</p>
		<p>Gini Coefficient</p>
		<p>Net Income as % of GDP</p>
	</div>

	<input type="submit" role="button" class="back-button" alt="Go Back to Map" value="Go Back to Map">
  `);
	return indicatorText
}

function clickCountry(event, code, region) {
	console.log(event);
	console.log(code);
	console.log(region);
	makeRequest(code);
	console.log(typeof(code))
	// makeRequest(code).then(handleData);



	$('.country-page').html(generateCountryText());
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

