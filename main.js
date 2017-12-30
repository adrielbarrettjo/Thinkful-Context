// List of Indicators used:
// 1.1_ACCESS.ELECTRICITY.TOT
// 1.2.PSev.2.5usd
// GINI options: 3.2.Gini, 3.1.Gini, 3.0.Gini_nozero, 3.0.Gini
// DT.ODA.DACD.ALLS.CD: www.oecd.org/dac/stats/idsonline: Gross ODA aid disbursement for all sectors and functions, DAC donors total (current US$)
//IC.REG.DURS.WOMEN: how long it takes to start a business for women, http://api.worldbank.org/indicators/all?per_page=1000&page=7&format=jsonP&prefix=Getdata


// when the user clicks on a country, the map slides over and gets smaller,
// and the country text appears.
// responsive feature: on a full computer, they're next to each other, or a phone
// they're below and above.



// API CALL FUNCTIONS //
function getTEST(code) {

	const test = $.ajax({ 
		//http://api.worldbank.org/countries/az/indicators/1.2.PSev.2.5usd?format=jsonP&prefix=Getdata
		url: 'https://api.worldbank.org/countries/'+code+'/indicators/IC.REG.DURS.WOMEN',
		data: {
			format: 'jsonP',
			date: '2000:2017'
		},
		type: 'GET',
		dataType: 'jsonp',
		jsonp: 'prefix',
	});
	console.log(test)
	return test;
}

function getTimeToBusiness_F(code) {
	const timeToBusiness_F = $.ajax({ 
		url: 'https://api.worldbank.org/countries/'+code+'/indicators/IC.REG.DURS.WOMEN',
		data: {
			format: 'jsonP',
			date: '2000:2017'
		},
		type: 'GET',
		dataType: 'jsonp',
		jsonp: 'prefix',
	});
	console.log(timeToBusiness_F)
	return timeToBusiness_F;
}

function getTimeToBusiness_M(code) {
	const timeToBusiness_M = $.ajax({ 
		url: 'https://api.worldbank.org/countries/'+code+'/indicators/IC.REG.DURS.MA',
		data: {
			format: 'jsonP',
			date: '2000:2017'
		},
		type: 'GET',
		dataType: 'jsonp',
		jsonp: 'prefix',
	});
	console.log(timeToBusiness_M)
	return timeToBusiness_M;
}

function getPopulation(code) {
	console.log(code);
	const population = $.ajax({ 
		url: 'https://api.worldbank.org/countries/'+code+'/indicators/SP.POP.TOTL',
		data: {
			format: 'jsonP',
			date: '2000:2017'
		},
		type: 'GET',
		dataType: 'jsonp',
		jsonp: 'prefix',
	});
	console.log(population)
	return population;
}

function getElectrictyAccess(code) {
	console.log(code);
	const electrictyAccess = $.ajax({ 
		url: 'https://api.worldbank.org/countries/'+code+'/indicators/1.1_ACCESS.ELECTRICITY.TOT',
		data: {
			format: 'jsonP',
			date: '2000:2017'
		},
		type: 'GET',
		dataType: 'jsonp',
		jsonp: 'prefix',
	});
	console.log(electrictyAccess)
	return electrictyAccess;
}

function getIncomeDescription(code) {
	//need just one API call:
	const incomeDescription = $.ajax({ 
		//http://api.worldbank.org/countries/az/indicators/1.2.PSev.2.5usd?format=jsonP&prefix=Getdata
		url: 'https://api.worldbank.org/countries/'+code,
		data: {
			format: 'jsonP',
		},
		type: 'GET',
		dataType: 'jsonp',
		jsonp: 'prefix',
	});
	console.log(incomeDescription)
	return incomeDescription;
}


// GENERATE TEXT FUNCTIONS //

function generateCountryText(data, region) {	
	const population = data[0][1][0].value; //data[0]
	const electrictyAccess = data[1][1][0].value; //data[1]

	const electricityDate = data[1][1][0].date;

	const incomeDescription = data[2][1][0].incomeLevel.value;//data[2]
	const countryRegion = data[2][1][0].adminregion.value; // from getIncomeDescription

	const timeToBusiness_F = data[3][1];
	const latestTimeToBusiness_F = timeToBusiness_F ? timeToBusiness_F.find(function(item){ return item.value !== null }) : null;
		console.log(latestTimeToBusiness_F);
	const latestTimeToBusiness_FDisplay = latestTimeToBusiness_F ? latestTimeToBusiness_F.value : 'not available';
		console.log(latestTimeToBusiness_FDisplay);
	
	const timeToBusinessDate = timeToBusiness_F ? timeToBusiness_F.find(function(item){ return item.year !== null }) : null;
	const timeToBusinessDateDisplay = timeToBusinessDate.date;
	console.log(timeToBusinessDate.date);

	const timeToBusiness_M = data[4][1];
	const latestTimeToBusiness_M = timeToBusiness_M ? timeToBusiness_M.find(function(item){ return item.value !== null }) : null;
		console.log(latestTimeToBusiness_M);
	const latestTimeToBusiness_MDisplay = latestTimeToBusiness_M ? latestTimeToBusiness_M.value : 'not available';
		console.log(latestTimeToBusiness_MDisplay);


	const test = data[5][1]; //THE TEST SPACE
	console.log(test);




	const indicatorText = (`
		<div class="indicators">

			<p>In general, ${region} is considered a(n) ${incomeDescription.toLowerCase()} country in ${countryRegion}.</p>
			
			<p>${region} has a population of ${population}. As of ${electricityDate}, the percentage of the of the population with access 
			to electricity is ${electrictyAccess}%. </p>

			<p>As of ${timeToBusinessDateDisplay}, the number of days it takes for a woman to start a business
			is ${latestTimeToBusiness_FDisplay} (for a man, it is ${latestTimeToBusiness_MDisplay}).</p>

		</div>

		<input type="submit" role="button" class="back-button" alt="Reset" value="Reset">
		`);
	return indicatorText
}

// OTHER FUNCTIONS (event listeners, etc.)
function mapReset() {
	console.log('the reset ran');
	location.reload();
}


function clickCountry(event, code, region) {
	//add loader call thing

	//get all promises:
	const population = getPopulation(code); 
	const electrictyAccess = getElectrictyAccess(code); 
	const incomeDescription = getIncomeDescription(code); 
	const timeToBusiness_F = getTimeToBusiness_F(code);
	const timeToBusiness_M = getTimeToBusiness_M(code);
	const test = getTEST(code); 

	// do all API calls
	Promise.all([population, electrictyAccess, incomeDescription, timeToBusiness_F, timeToBusiness_M, test])
		
		.then(function(data) {
			$('.indicators-page').html(generateCountryText(data, region));
		})
		.then(function() {
        	//once data is appended to the dom, remove hidden class
        	$('.header').text(region);
			// $('.map').addClass('hidden');
			$('.map').addClass('moveToLeft');
			$('.subheader').addClass('hidden');
			$('.indicators-page').removeClass('hidden');
			//and enable event listener on newly generated buttons:
			$('.indicators-page input').click(mapReset);
		});
}


function setUpMap() {
	$('#vmap').vectorMap({ 
		map: 'world_en', 
		onRegionClick: clickCountry,
	});
}


function onStart() {
  //calls all initializer functions.
  setUpMap();
  // set up event listener
  $('.country-page input').click(mapReset);
}


$(onStart);