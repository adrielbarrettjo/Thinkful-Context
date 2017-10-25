function makeRequest(code) {
	var countrylong = isoConvert(code).toUpperCase();
	console.log(countrylong);
	return $.ajax({ 
		url: 'http://api.worldbank.org/countries',
		type: 'GET',
		data: {
			countries: [countrylong],
			indicators: ["3.0.Gini"],
			format: JSON
		}
	});
}

// function handleData(data) {
// 	console.log(data);
// }


function clickCountry(event, code, region) {
	console.log(event);
	console.log(code);
	console.log(region);
	makeRequest(code);
	// makeRequest(code).then(handleData);
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

