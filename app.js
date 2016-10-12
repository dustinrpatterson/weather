(function () {

    var city;

    $('.form-inline').on('submit', function (e) {
        e.preventDefault();

        var zip = $('#newZipCode').val();
        getCity(zip)
            .then(function (data) {
                city = data
                return getWeather(zip);
            })
            .then(function (weather) {

                console.log(city)
                console.log(weather);

                var template = $('#cityTemplate').html();

                template = template
                    .replace('{{ city }}', city.places[0]['place name'])
                    .replace('{{ state }}', city.places[0]['state abbreviation'])
                    .replace('{{ temp }}', weather.main.temp)
                    .replace('{{ icon }}', 'http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png')
                    .replace('{{ conditions }}', weather.weather[0].description)
                    ;

                $('#cityList').append($(template));
                $('#newZipCode').val('')
            });
    })

    $('#cityList').on('click','#deleteCity',function(event){
            event.target.closest('.city').remove();
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