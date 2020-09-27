if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position) {
      
      document.getElementById('data').innerHTML="latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude;
  
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + 50.45466 + "&lon=" + 30.5238 + "&APPID=c76fa16fefb5da3b6fefe63f6e0fcdc2", function (data) {
              var rawJson = JSON.stringify(data);
              var json = JSON.parse(rawJson);
              console.log(json.weather[0].main);
              $.getJSON('https://api.opencagedata.com/geocode/v1/json?q='+50.45466 + '+' + 30.5238 + '&key=dd213a1665164379bd4ecd4a2fe296b6', function (data1) {
                var rawJson1 = JSON.stringify(data1);
                var json1 = JSON.parse(rawJson1);
                console.log(json1.results[0].components.city, json.weather[0].main);
                $('#data').append('<br>Location: ' + json1.results[0].components.city+
              '<br>Weather:' + json.weather[0].main);
              })
              
              console.log(json);
              const weather = {
                id: json.weather[0].id
              }
              showDressRequest(weather);
              
          });
      });
  }

  function showDressRequest(weather) {
    fetch('/' + weather.id)
     .then(function(response) {
         return response.json()
       })
     .then(function(cloth) {
         console.log(cloth);
         $('#data').append('<br>upcloth: ' + cloth.upcloth
         +'<br>downcloth: ' + cloth.downcloth 
         +'<br>accesories: ' + cloth.accesories);
       });
  }