const apiKey = "577b3bd2eec54e5a84a1ae825e746783";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchInput = document.querySelector(".search-box input");

const searchButton = document.querySelector(".search-box button");

const weatherIcon = document.querySelector(".weather-image i");

const weather = document.querySelector(".weather");

const errorText = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    errorText.style.display = "block";
    weather.style.display = "none";
  } else {
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "&#8451";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clear") {
      weatherIcon.className = "fa-solid fa-sun";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.className = "fa-solid fa-cloud-rain";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.className = "fa-solid fa-cloud-mist";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.className = "fa-solid fa-cloud-drizzle";
    }
    getWeatherImage(data.weather[0].description);
    weather.style.display = "block";
    errorText.style.display = "none";
  }
}

function getWeatherImage(weatherDescr) {
  // 1. Создаём новый XMLHttpRequest-объект
  let xhr = new XMLHttpRequest();
  
  // 2. Настраиваем его: GET-запрос по URL /article/.../load
  let url = new URL(`https://api.unsplash.com/search/photos`);
  url.searchParams.set('query', `${weatherDescr}`);
  url.searchParams.set('client_id', 'gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k');
  xhr.open('GET', url);
  xhr.responseType = 'json';
  // 3. Отсылаем запрос
  xhr.send();
  
  // 4. Этот код сработает после того, как мы получим ответ сервера
  xhr.onload = function() {
    if (xhr.status == 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
      let responseObj = xhr.response;
      document.body.style.backgroundImage =  `url(${responseObj.results[0].urls.full})`;
    }
  };
}

searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value);
});

searchInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    checkWeather(searchInput.value);
  }
});
