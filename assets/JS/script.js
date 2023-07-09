// Favorites button add to favorites list
var addFav = document.getElementById("addToFavorites");

function addFavorite() {
    var favoritesList = JSON.parse(localStorage.getItem("allFavorites"));
    if(favoritesList == null) favoritesList = [];
    var cityName = document.getElementById("city").value;

localStorage.setItem(cityName,JSON.stringify(cityName));
favoritesList.push(cityName);
localStorage.setItem("allFavorites", JSON.stringify(favoritesList));
console.log(favoritesList);
}

addFav.addEventListener("click", function(){
    console.log("Done!");
  });

var searchBar = document.querySelector(".search-bar");
var searchButton = document.getElementById("search-button");
var searchInput = document.getElementById("search-input");
var form = document.getElementById("form");
var apiKey = "c3adaa7e48d20b2f65d6246f1225cb77";
// establish the API URL- save in a variable
// make another function get forecast weather info

function getCurrentWeatherInfo(cityName) {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`; 
  
  // run fetch on this

  fetch(currentWeatherUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });

   function getForecastWeatherInfo(cityName) {
    var forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}lat={lat}&lon={lon}&appid=${apiKey}`

    fetch(forecastWeatherUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
      
      
      function displayCurrentWeather(data) {
        const { name } = data;
        const description = data.weather[0].description;
        const { temp, humidity } = data.main;
        console.log(temp, humidity)
        const { speed } = data.wind;
        const icon  = data.weather[0].icon;
        const sunriseTimestamp = data.sys.sunrise;
        const sunsetTimestamp = data.sys.sunset;
        const sunriseTime = new Date(sunriseTimestamp * 1000);
        const sunsetTime = new Date(sunsetTimestamp * 1000);
        const longitude  = data.coord.lon;
        const latitude = data.coord.lat;
        console.log(lon, lat)
        
              
        // To display the current weather on the site
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".short").innerText = description;
        document.querySelector(".temperature").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind-speed").innerText = "Wind Speed: " + speed + " MPH";
        document.querySelector(".sunrise").innerText = "Sunrise time: " + sunriseTime;
        document.querySelector(".sunset").innerText = "Sunset time: " + sunsetTime
        document.querySelector(".sunset").innerText = "Sunset time: " + sunsetTime;
        document.querySelector(".weather-today").classList.remove("loading");
        document.querySelector(".weather-icon").src = "http://openweathermap.org/img/wn/"+ icon +".png";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "')";
        console.log(icon);
        document.querySelector(".longitude").innerText = "longitude: " + lon;
        document.querySelector(".latitude").innerText = "lat: " + lat;
    }

      function displayForecastWeather(data) {
        const forcastDays=5
        const { Name } = data;
        const description = data.weather[0].description;
        const { temp, humidity } = data.main;
        const icon = data.weather[0].icon;

        for(let i=0; i<forcastDays; i++)

        // To display the forecast weather on the site
        document.querySelector(".city").innerText = "Weather In " + Name;
        document.querySelector(".short").innerText = description;
        document.querySelector(".temperature").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".weather-icon").src = "http://openweathermap.org/img/wn/"+ icon +".png";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "')";
        console.log(icon); 
      
      }
  }


form.addEventListener ("submit", function (event) {
  event.preventDefault();
  var cityName = searchInput.value;
  console.log(cityName);
  getCurrentWeatherInfo(cityName);
})

form.addEventListener ("submit", function (event) {
  event.preventDefault();
  var cityName = searchInput.value;
  console.log(cityName);
  getForecastWeatherInfo(cityName);
})
}