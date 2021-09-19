const API_KEY = config.API_KEY;
const main = document.querySelector('#main');
const form = document.querySelector("#form");
const search = document.querySelector('#search');

const url = city => `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

const getWeatherByCity = async (city) => {
	const res = await fetch(url(city), {origin: 'cross'});
	const data = await res.json();

	addWeatherToPage(data);
}

function addWeatherToPage(data) {
	const temp = ktoc(data.main.temp); // convert to celcius

	const weather = document.createElement('div');
	weather.classList.add('weather');

	weather.innerHTML = `<h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°c
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
  <span>${data.weather[0].main}</span>
	`;

	main.innerHTML = "";
	main.appendChild(weather);
}

function ktoc(kelvin){
	return Math.floor(kelvin - 273.15);
}

form.addEventListener('submit', e => {
	e.preventDefault();

	const city = search.value;

	if(city){
		getWeatherByCity(city)
	}
});