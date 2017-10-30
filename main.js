// List of Indicators used:
// 1.1_ACCESS.ELECTRICITY.TOT
//1.2.PSev.2.5usd

// API CALL FUNCTIONS //
function getPopulation(code) {
	console.log(code);
	const population = $.ajax({ 
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
	console.log(population)
	return population;
}

function getElectrictyAccess(code) {
	console.log(code);
	const electrictyAccess = $.ajax({ 
		//http://api.worldbank.org/countries/az/indicators/1.2.PSev.2.5usd?format=jsonP&prefix=Getdata
		url: 'http://api.worldbank.org/countries/'+code+'/indicators/1.1_ACCESS.ELECTRICITY.TOT',
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

function getLiteracy(code) {
	const literacy = $.ajax({ 
		url: 'http://api.worldbank.org/countries/'+code+'/indicators/1.1_YOUTH.LITERACY.RATE',
		type: 'GET',
		data: {
			format: 'jsonP',
			date: '1950:2017'
		},
		dataType: 'jsonp',
		jsonp: 'prefix'
	});
	console.log(literacy)
	return literacy;
}

function getGiniCoefficient() {
	console.log('gini ran');
	const giniCoefficient = '1';
	return giniCoefficient;
}

function getNetIncome() {
	console.log('netIncome ran');
	const netIncome = '1';
	return netIncome;
}

function getIncomeDescription(code) {
	//need just one API call:
	const incomeDescription = $.ajax({ 
		//http://api.worldbank.org/countries/az/indicators/1.2.PSev.2.5usd?format=jsonP&prefix=Getdata
		url: 'http://api.worldbank.org/countries/'+code,
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
	const incomeDescription = data[5][1][0].incomeLevel.value;//data[5]
	const countryRegion = data[5][1][0].adminregion.value; //data[5]

	const electrictyAccess = data[4][1][0].value; //data[4]
	const electricityDate = data[4][1][0].date;

	const population = data[0][1][0].value; //data[0]

	const literacy = data[1] //data[1]
	console.log('this is literacy');
	console.log(literacy);
	const giniCoefficient = data[2]; //data[2]
	const netIncome = data[3]; //data[3]

	console.log(data)
	const indicatorText = (`
		<div class="indicators">

			<p>In general, ${region} is considered a(n) ${incomeDescription} country in ${countryRegion}.</p>
			<p>${region} has a population of ${population}. As of ${electricityDate}, the percentage of the of the population with access 
			to electricity is ${electrictyAccess}%. The
			Gini Coefficient is ${giniCoefficient}. The percentage of young 
			people who are literate is ${literacy}.
			The Net Income as a percentage of GDP is ${netIncome}. </p>
		</div>

		<input type="submit" role="button" class="back-button" alt="Go Back to Map" value="Go Back to Map">
		`);
	return indicatorText
}

// OTHER FUNCTIONS (event listeners, etc.)
function mapReset() {
	//hide indicators page and unhide map.
	// alternative: just reload.
	location.reload();

}


function clickCountry(event, code, region) {
	//get all promises:
	const electrictyAccess = getElectrictyAccess(code);
	const literacy = getLiteracy(code);
	const giniCoefficient = getGiniCoefficient(code);
	const netIncome = getNetIncome(code);
	const population = getPopulation(code);
	const incomeDescription = getIncomeDescription(code);

	// const regionInfo = getRegionInfo(code);
	//should I write separate functions for getting region info, 
	// or put them in one info and break out later. And if the second, how
	// best to architect that?

	// do all API calls
	Promise.all([population, literacy, giniCoefficient, netIncome, electrictyAccess, incomeDescription]) //add literacy at place 1
		.then(function(data) {
			$('.country-page').html(generateCountryText(data, region));
		})
		.then(function() {
        	//once data is appended to the dom, remove hidden class
        	$('.header').text(region);
			$('.map').addClass('hidden');
			$('.subheader').addClass('hidden');
			$('.country-page').removeClass('hidden');
			//and enable event listener on newly generated buttons:
			$('.country-page input').click(mapReset);
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