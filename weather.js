const button = document.querySelector('.geoLoc');
let weather = document.querySelector('.getTemp');
const pdata = document.querySelector('.yourLOC');

const myApi = '&appid=16c4afbda3818a3fcda999336b1f57e6&units=metric';

//get weather
function getWeather(city) {
  weather.innerHTML = '';
  const pImg = document.querySelector('.weatherIcon');
  let url_part1 = ' https://api.openweathermap.org/data/2.5/weather?q=';

  //concating URL
  let url = url_part1 + city + myApi;

  if (city !== '') {
    fetch(url)
      .then(response => response.json())
      .then(weather1 => {
        //console.log(weather1.name);
        //console.log(weather1.main.temp);
        weather.innerHTML = weather1.weather[0].description;
        console.log(weather1.weather[0].icon);
        pImg.innerHTML =
          "<img src='http://openweathermap.org/img/wn/" +
          weather1.weather[0].icon +
          ".png'>";
      });
  } else {
    alert('Pls enter location');
  }
}

//Find user Location

function getplace(lat, long) {
  const apiId = '16c4afbda3818a3fcda999336b1f57e6';
  let url_part1 = ' https://api.openweathermap.org/data/2.5/weather?';
  url = url_part1 + 'lat=' + lat + '&lon=' + long + '&appid=' + apiId;
  fetch(url)
    .then(response => response.json())
    .then(name => {
      pdata.innerHTML = name.name;
      getWeather(name.name);
    });
}

function myPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  getplace(lat, long);
}

//Adding Event to button
button.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(myPosition);
  } else {
    pdata.innerHTML = "browser doesn't support";
  }
});

const cityButton = document.querySelector('.weatherButton');
cityButton.addEventListener('click', () => {
  pdata.innerHTML = '';
  getWeather(document.querySelector('input').value);
});

//-----------------------------------------------------------------------

//storing value in local storage
//localStorage.setItem("latitude",JSON.stringify(position.coords.latitude));
//localStorage.setItem("longitude",JSON.stringify(position.coords.longitude));
// //getting value from local storage
// let lat = localStorage.getItem("latitude");
// let long = localstorage.getItem("longitude");
// console.log(lat);
// console.log(long);

//https://www.youtube.com/watch?v=4UoUqnjUC2c
//https://www.youtube.com/watch?v=ecT42O6I_WI
