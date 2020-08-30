if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position) {
      
      document.getElementById('data').innerHTML="latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude;
  
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=c76fa16fefb5da3b6fefe63f6e0fcdc2", function (data) {
              var rawJson = JSON.stringify(data);
              var json = JSON.parse(rawJson);
              $('#data').append('data: ' + json.weather[0].main);
              console.log(json);
          });
      });
  }