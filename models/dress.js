const fs = require("fs");
const json_data = require("../data/dresses");

class Dress {
  constructor(upcloth, downcloth, accesories) {
    this.weather = weather;
    this.upcloth = upcloth;
    this.downcloth = downcloth;
    this.accesories = accesories;
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      if (json_data) {
        resolve(json_data);
      } else {
        reject("error");
      }
    });
  }

  static chooseDressByWeatherIdAndTemperature(weather_id, temp_min, temp_max) {
    weather_id = weather_id.toString();
    temp_min = temp_min.toString();
    temp_max = temp_max.toString();
    let temperature = {temp_min, temp_max};
    this.chooseDressByTemperature(temperature);

    return new Promise((resolve, reject) => {
      this.getAll().then((data) => {
        if (weather_id.match(/5\d+/)) {
          resolve(data[0]);
        } else if (weather_id.match(/800/)) {
          resolve(data[2]);
        } else {
          resolve(data[1]);
        }
      });
    });
  }

  static chooseDressByTemperature(temperature){

  }

  static fromKelvinToCelsius(temperature){

  }

  
}
module.exports = Dress;
