const apiKey = "a472930205b8b2bd575d3ed0c2ef34cc";

const searchBtn =
document.getElementById("search-btn");

const cityInput =
document.getElementById("city-input");

const darkBtn =
document.getElementById("dark-mode-btn");

const locationBtn =
document.getElementById("location-btn");

function updateTime(){

    const now = new Date();

    document.getElementById("date")
    .innerHTML =
    now.toDateString();

    document.getElementById("time")
    .innerHTML =
    now.toLocaleTimeString();

}

setInterval(updateTime,1000);

updateTime();

async function checkWeather(cityName){

    if(cityName === ""){
        return;
    }

    document.getElementById("loading")
    .innerHTML = "Loading...";

    const apiURL =
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    const response =
    await fetch(apiURL);

    if(response.status == 404){

        document.getElementById("error")
        .innerHTML =
        "City not found";

        document.getElementById("loading")
        .innerHTML = "";

        return;
    }

    const data =
    await response.json();

    document.getElementById("loading")
    .innerHTML = "";

    document.getElementById("error")
    .innerHTML = "";

    document.getElementById("city")
    .innerHTML =
    data.name;

    document.getElementById("temp")
    .innerHTML =
    Math.round(data.main.temp) + "°C";

    document.getElementById("feels-like")
    .innerHTML =
    "Feels Like " +
    Math.round(data.main.feels_like)
    + "°C";

    document.getElementById("humidity")
    .innerHTML =
    data.main.humidity + "%";

    document.getElementById("wind")
    .innerHTML =
    data.wind.speed + " km/h";

    document.getElementById("pressure")
    .innerHTML =
    data.main.pressure + " hPa";

    document.getElementById("weather-type")
    .innerHTML =
    data.weather[0].main;

    const weatherMain =
    data.weather[0].main;

    const weatherIcon =
    document.getElementById("weather-icon");

    if(weatherMain == "Clouds"){
        weatherIcon.src = "clouds.png";
    }
    else if(weatherMain == "Rain"){
        weatherIcon.src = "rain.png";
    }
    else if(weatherMain == "Clear"){
        weatherIcon.src = "clear.png";
    }
    else if(weatherMain == "Mist"){
        weatherIcon.src = "mist.png";
    }
    else if(weatherMain == "Snow"){
        weatherIcon.src = "snow.png";
    }

}

searchBtn.addEventListener("click", ()=>{

    checkWeather(cityInput.value);

});

cityInput.addEventListener("keypress",(e)=>{

    if(e.key === "Enter"){

        checkWeather(cityInput.value);

    }

});

darkBtn.addEventListener("click", ()=>{

    document.body.classList.toggle("dark");

});

locationBtn.addEventListener("click", ()=>{

navigator.geolocation.getCurrentPosition(
async(position)=>{

const lat = position.coords.latitude;

const lon = position.coords.longitude;

const apiURL =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const response =
await fetch(apiURL);

const data =
await response.json();

document.getElementById("city")
.innerHTML = data.name;

document.getElementById("temp")
.innerHTML =
Math.round(data.main.temp) + "°C";

document.getElementById("feels-like")
.innerHTML =
"Feels Like " +
Math.round(data.main.feels_like)
+ "°C";

document.getElementById("humidity")
.innerHTML =
data.main.humidity + "%";

document.getElementById("wind")
.innerHTML =
data.wind.speed + " km/h";

document.getElementById("pressure")
.innerHTML =
data.main.pressure + " hPa";

document.getElementById("weather-type")
.innerHTML =
data.weather[0].main;

});

});