const lookup = require('country-code-lookup');

const key = '9721616de2492293f1c99380251eb8a1';
async function getCity() {

    let input = document.getElementById('search').value
    let units = 'metric' // to get the celsius

    if (input == '') {
        input = 'Tokyo' // If the user doesn't search for a location it returns Bali
    }

    try {

        const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + input + '&units=' + units + '&APPID=' + key, { mode: 'cors' })

        if (response.status != 200) {
            // if the search is not correct
            throw input + ' city does not exsist!'
        } else {

            // gets data
            const data = await response.json()

            let name = data.name;
            let country = data.sys.country;
            let description = data.weather[0]['description'];
            let temp = data.main.temp;

            country = lookup.byIso(country).country
            description = description.charAt(0).toUpperCase() + description.slice(1)

            let inputName = document.getElementById('name');
            let inputCountry = document.getElementById('country');
            let inputDescription = document.getElementById('desc');
            let inputTemperature = document.getElementById('temp');

            inputName.innerHTML = name;
            inputTemperature.innerHTML = Math.round(temp) + ' °C';
            inputDescription.innerHTML = description;
            inputCountry.innerHTML = country;

            // implementation for night and day. To see it the time in day is between sunrise and sunset.

            let content = document.getElementById('content')
            let button = document.getElementById('refresh')
            if (data.dt < data.sys.sunset && data.dt > data.sys.sunrise) {
                console.log('dan');
                button.className = 'day'

                content.className = 'day'
                document.body.style.backgroundImage = "url('../weather-app/src/day.jpg')";

            } else {
                content.className = 'night'
                button.className = 'night'
                document.body.style.backgroundImage = "url('../weather-app/src/nightsky.jpg')";

            }


        }

    } catch (err) {
        // alerts error
        alert(err)
    }

}
//getCity()
document.getElementById('refresh').addEventListener('click', getCity)