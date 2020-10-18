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

  static chooseDressByWeatherIdAndTemperature(weather_id, temp) {
    weather_id = weather_id.toString();

    return new Promise((resolve, reject) => {
        this.chooseDressByTemperature(temp).then((data) => {
            data = data.filter(elem => {
                if(weather_id != 800){
                    return elem.weather_id.find(elem => elem.toString()[0] == weather_id[0] && elem.toString() != '800')
                }
                else{
                    return elem.weather_id.find(elem => elem.toString()[0] == '800')
                }
            })
           resolve(data);
        });
    });
  }

  static chooseDressByTemperature(temperature){
    console.log(temperature);
      temperature = this.fromKelvinToCelsius(temperature);

    return new Promise((resolve, reject) => {
        this.getAll().then((data) => {
          data = data.filter(elem => temperature >= elem.mintemperature && temperature <= elem.maxtemperature);
          resolve(data);
        });
      });
  }

  static fromKelvinToCelsius(temperature){
        temperature = temperature - 273.15;
        return temperature;
  }

  
}
module.exports = Dress;
