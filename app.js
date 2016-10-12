(function() {
  
  var city;
  
  $('#addCityBtn').on('click', function(e){
  
   var zip = $('#newZipCode').val();  
      
  getCity(zip)
    .then(function(data) {
        city = data
        return getWeather(zip); 
    })
    .then(function(weather) {
        
        console.log(city)
        console.log(weather);
        
        var template = $('#cityTemplate').html();
        
        template = template
          .replace('{{ city }}', city.places[0]['place name'])
          .replace('{{ state }}', city.places[0]['state abbreviation'])
          .replace('{{ temp }}', weather.main.temp)
          .replace('{{ conditions }}', weather.weather[0].description)
          ;
        
        $('#cityList').append($(template));      
    });
  })

	function getCity(zip) {

		var urlBase = 'http://api.zippopotam.us/us/';
		var url = urlBase + zip;
		
		return $.get(url);
		
	}

	function getWeather(zip) {

		var urlBase = 'http://api.openweathermap.org/data/2.5/';
		var appId = 'bd82255fd0a21fa1238699b9eda2ee35';
		var url = urlBase + 'weather?appid=' + appId + '&units=imperial&zip=' + zip;

    // add jQuery AJAX call here
    return $.get(url);
	}
})();