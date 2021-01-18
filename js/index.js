import { byIso } from 'country-code-lookup';

const key = '9721616de2492293f1c99380251eb8a1';
console.log(key)


async function getCity() {



    let input = document.getElementById('search').value
    let units = 'metric'


    if (input == '') {
        input = 'London'
    }

    console.log(input)
    try {



        const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + input + '&units=' + units + '&APPID=' + key, { mode: 'cors' })
        console.log(response.status)


        if (response.status != 200) {
            throw input + ' city does not exsist!'
        } else {
            const data = await response.json()

            console.log(data)

            let name = data.name;
            let country = data.sys.country;
            let description = data.weather[0]['description'];
            let temp = data.main.temp;

            console.log(byIso(country).country);
            country = byIso(country).country
            description = description.charAt(0).toUpperCase() + description.slice(1)

            let inputName = document.getElementById('name');
            let inputCountry = document.getElementById('country');
            let inputDescription = document.getElementById('desc');
            let inputTemperature = document.getElementById('temp');

            inputName.innerHTML = name;
            inputTemperature.innerHTML = Math.round(temp) + ' °C';
            inputDescription.innerHTML = description;
            inputCountry.innerHTML = country;

            console.log(name, country, description, temp)



        }





    } catch (err) {
        alert(err)
    }

}
getCity()
document.getElementById('refresh').addEventListener('click', getCity)