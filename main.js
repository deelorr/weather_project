const currentDate = new Date();
const currentDayOfMonth = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

const my_form = document.querySelector('form');
console.log(my_form);

my_form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const zipcode = event.target[0].value;
  await weatherData(zipcode);
});

const weatherData = async (zipcode) => {
  const locationResponse = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},us&appid=51438966e355f15d7ee85db66db192a4`);
  const locationData = await locationResponse.json();
  console.log('Location Data:', locationData);
  const lat = locationData.lat;
  const lon = locationData.lon;
  const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude={part}&appid=51438966e355f15d7ee85db66db192a4`);
  const weatherData = await weatherResponse.json();
  console.log('Weather Data:', weatherData);
  const highTemp = weatherData.main.temp_max;
  const lowTemp = weatherData.main.temp_min;
  const forecast = weatherData.weather[0].description;
  const humidity = weatherData.main.humidity;
  const city = weatherData.name;
  cardBox.innerHTML = `
    <div id="card">
      <div id="card-top">
              <h2>${city}</h2>
              <h4>Date: ${dateString}</h4>
      </div>
      <div id="card-bottom">
              <p>High Temp: ${Math.round((highTemp - 273.15) * 1.8 + 32).toFixed(0)}°F</p>
              <p>Low Temp: ${Math.round((lowTemp - 273.15) * 1.8 + 32).toFixed(0)}°F</p>
              <p>Forecast: ${forecast}</p>
              <p>Humidity: ${humidity}%</p>
      </div>
  </div>
  `
}