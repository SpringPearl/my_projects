function getWeather(latitude,longitude){
	urlStringCurrent = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + latitude + "&lon=" + longitude + "&APPID=0f698f6bcbae2bc93b0f5de9b25254d8&units=metric";
	urlStringDaily = "http://api.openweathermap.org/data/2.5/forecast/daily?"+ "lat=" + latitude + "&lon=" + longitude + "&cnt=1&APPID=0f698f6bcbae2bc93b0f5de9b25254d8&units=metric";
	$.when(
		$.get(urlStringCurrent),
		$.get(urlStringDaily)
	)
	.then(
		function (currentResult,dailyResult){
			var responseTemp = Math.round(currentResult[0].main.temp);
			var responseTempMin = Math.round(dailyResult[0].list[0].temp.min);
			var responseTempMax = Math.round(dailyResult[0].list[0].temp.max);
			var responseLocation = currentResult[0].name + ", " + currentResult[0].sys.country;
			var iconId = currentResult[0].weather[0].id;
			var responseDescription = currentResult[0].weather[0].description;
			var responseIcon = "owf owf-"+iconId;
			$("#icon").addClass(responseIcon);
			$("#location").html(responseLocation);
			$("#desc").html(responseDescription.charAt(0).toUpperCase()+ responseDescription.slice(1));
			toCelsius();

			function toFahrenheit(){
				var tempFahren = celsiusToFahrenheit(responseTemp);
				var tempMinFahren = celsiusToFahrenheit(responseTempMin);
				var tempMaxFahren = celsiusToFahrenheit(responseTempMax);

				$("#temp").html(tempFahren + "&#8457;");
				$("#temp-min-max").html(tempMinFahren + "/" + tempMaxFahren + "&#8457;");

			}

			function toCelsius(){
				$("#temp").html(responseTemp + "&#8451;");
				$("#temp-min-max").html(responseTempMin + "/" + responseTempMax + "&#8451;");
			}

			function celsiusToFahrenheit(tempCelsius){
				var tempFahren = Math.round(((tempCelsius*9)/5)+32);
				return tempFahren;
			}

			$("#celsius").click(toCelsius);
			$("#fahrenheit").click(toFahrenheit);

		}
	);
}

function geoLocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else{
		document.getElementById("getWeather").innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position){
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	getWeather(latitude,longitude);
}

$(document).ready(geoLocation);