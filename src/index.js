import './style.css';  

async function getWeather(city, units) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/?key=VA2D8NU5NWWVXUUPLGQZFS5CU&unitGroup=${units}`)
    const weatherData = await response.json()
    const temperature = weatherData.currentConditions.temp
    const feelslike = weatherData.currentConditions.feelslike
    const humidity  = weatherData.currentConditions.humidity
    const cloud  = weatherData.currentConditions.cloudcover
    return {temperature, feelslike, humidity, cloud}
}

async function init(city,units) {
    const data = await getWeather(city,units);
    const temperature = data.temperature;
    const feelslike = data.feelslike;
    const humidity = data.humidity;
    const cloud = data.cloud;

    //Use data

    const tempUnit = units === 'metric' ? '°C' : '°F';
    
    // Update the display values
    document.getElementById('temp-value').textContent = `${temperature}${tempUnit}`;
    document.getElementById('feels-value').textContent = `${feelslike}${tempUnit}`;
    document.getElementById('humidity-value').textContent = `${humidity}%`;
    document.getElementById('cloud-value').textContent = `${cloud}%`;
    
    // Show the weather display
    document.getElementById('weather-display').style.display = 'flex';

    if (cloud >= 0 && cloud < 20) {
        // Clear/sunny
        document.body.style.background = 'linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)';
    } else if (cloud >= 20 && cloud < 50) {
        // Partly cloudy
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    } else if (cloud >= 50 && cloud < 80) {
        // Mostly cloudy
        document.body.style.background = 'linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)';
    } else {
        // Very cloudy/overcast
        document.body.style.background = 'linear-gradient(135deg, #485563 0%, #29323c 100%)';
    }

}

//init("Cape Town", "metric");


const myForm = document.getElementById("weather-form");

myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const city_input = document.getElementById('city');
    const units_input = document.getElementById('units');
    init(city_input.value, units_input.value);
});

