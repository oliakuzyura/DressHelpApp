window.addEventListener("load", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      document.getElementById("data").innerHTML =
        "latitude: " +
        position.coords.latitude +
        "<br>longitude: " +
        position.coords.longitude;

      $.getJSON(
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
          position.coords.latitude +
          "&lon=" +
          position.coords.longitude +
          "&APPID=c76fa16fefb5da3b6fefe63f6e0fcdc2",
        function (data) {
          var rawJson = JSON.stringify(data);
          var json = JSON.parse(rawJson);
          console.log(json.weather[0].main);
          $.getJSON(
            "https://api.opencagedata.com/geocode/v1/json?q=" +
              position.coords.latitude +
              "+" +
              position.coords.longitude +
              "&key=dd213a1665164379bd4ecd4a2fe296b6",
            function (data1) {
              var rawJson1 = JSON.stringify(data1);
              var json1 = JSON.parse(rawJson1);
              console.log(
                json1.results[0].components.city,
                json.weather[0].main
              );
              $("#location").append(json1.results[0].components.city);
            }
          );
          $("#data").append("<br>Weather:" + json.weather[0].main);
          console.log(json.main);
          const weather = {
            id: json.weather[0].id,
          };

          showDressRequest(weather, json.main);
        }
      );
    });
  }
});

function showDressRequest(weather, temperature) {
  fetch("/dress/" + weather.id +'/' + temperature.temp)
    .then(function (response) {
      return response.json();
    })
    .then(function (cloth) {
      $("#data").append(
        "<br>upcloth: " +
          cloth.upcloth +
          "<br>downcloth: " +
          cloth.downcloth +
          "<br>accesories: " +
          cloth.accesories
      );

      addWeatherAnimation(cloth);
    });
}

function addWeatherAnimation(cloth) {
  var svgObject = document.getElementById("svg").contentDocument;

  if (cloth.weather == "clear") {

    svgObject.getElementById("sun").style.opacity = 1;

  } else if (cloth.weather == "rain") {

    svgObject.getElementById("rain").style.opacity = 1;
    svgObject.getElementById("cloud").style.opacity = 1;
    svgObject.getElementById("umbrella_1_").style.opacity = 1;

  } else {

    svgObject.getElementById("cloud").style.opacity = 1;
  }
}
