function attachEvents() {
    const BASE_URL = `https://judgetests.firebaseio.com/`;
    const DEGREES = '&#176;';

    $('#submit').on('click', getForecast);

    //Get Request to firebase
    function request(endPoint) {
        return $.ajax({
            method: "GET",
            url: BASE_URL + endPoint
        })
    }

    //Get the forecast for the wanted location or error
    function getForecast() {
        request('locations.json')
            .then(displayForecast)
            .catch(handleError)
    }

    function displayForecast(allLocations) {
        let location = $('#location').val();
        let locationCode = allLocations
            .filter(l => l['name'] === location)
            .map(l => l['code'])[0];
        if (!locationCode) {
            handleError()
        }
        let weatherSymbols = {
            'Sunny': '&#x2600;',
            'Partly sunny': '&#x26C5;',
            'Overcast': '&#x2601;',
            'Rain': '&#x2614;'
        };
        let currentConditionP = request(`forecast/today/${locationCode}.json`);
        let threeDaysConditionP = request(`forecast/upcoming/${locationCode}.json `);
        Promise.all([currentConditionP, threeDaysConditionP])
            .then(displayCondition)
            .catch(handleError);

        function displayCondition([currentCondition, upcomingCondition]) {
            $('#forecast').css('display', 'block');

            appendDataToCurrent();
            appendDataToUpcoming();

            function appendDataToCurrent() {
                let current = $('#current');
                current.empty();

                let condition = currentCondition['forecast']['condition'];
                let name = currentCondition['name'];
                let low = currentCondition['forecast']['low'];
                let high = currentCondition['forecast']['high'];

                current
                    .append($('<div class="label">Current conditions</div>'))
                    .append($('<span>')
                        .addClass('condition symbol')
                        .html(weatherSymbols[condition]))
                    .append($('<span>')
                        .addClass('conditions')
                        .append('<span>')
                        .addClass('forecast-data').text(name))
                    .append($('<span>')
                        .addClass('forecast-data')
                        .html(`${low}${DEGREES}/${high}${DEGREES}`))
                    .append($('<span>')
                        .addClass('forecast-data')
                        .text(condition));
            }

            function appendDataToUpcoming() {
                let upcoming = $('#upcoming');
                upcoming.empty();

                upcoming
                    .append($('<div class="label">Three-day forecast</div>\n'));

                for (let forecast of upcomingCondition['forecast']) {
                    let condition = forecast['condition'];
                    let low = forecast['low'];
                    let high = forecast['high'];

                    upcoming.append($('<span>')
                        .addClass('upcoming')
                        .append($('<span>')
                            .addClass('symbol')
                            .html(weatherSymbols[condition]))
                        .append($('<span>')
                            .addClass('forecast-data')
                            .html(`${low}${DEGREES}/${high}${DEGREES}`))
                        .append($('<span>')
                            .addClass('forecast-data')
                            .text(condition)));
                }
            }
        }
    }

    function handleError() {
        $('#forecast')
            .css('display', 'block')
            .text('Error')
    }
}