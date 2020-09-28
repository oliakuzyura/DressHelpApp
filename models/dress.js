const fs = require('fs');
const json_data = require('../data/dresses');

class Dress {
  constructor(upcloth, downcloth, accesories) {
    this.weather = weather;
    this.upcloth = upcloth;
    this.downcloth = downcloth;
    this.accesories = accesories;

  }

  static getAll(){
      return new Promise((resolve, reject) => {
         if(json_data){
           resolve(json_data); 
         }
         else{
           reject('error');
         }
 
      })
  }

  static chooseDress(weather_id){
    weather_id = weather_id.toString();
    console.log(weather_id);
    return new Promise((resolve, reject) => {
      this.getAll().then(data => {
        if(weather_id.match(/5\d+/)){
          resolve(data[0]);
        }
        else if(weather_id.match(/800/)){
          resolve(data[2]);
        }else{
          resolve(data[1]);
        }
    })
  })
}

  static insert(new_item, username) {
    if(username){
      return new Promise((resolve, reject) => {
        mysqlConnetion.query(`INSERT INTO items(name, username) VALUES('${new_item}', '${username}')`, (err) => {
                if (!err) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
        });
    })
    }else{
      return new Promise((resolve, reject) => {
        mysqlConnetion.query(`INSERT INTO items(name) VALUES('${new_item}')`, (err) => {
                if (!err) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
        });
    })
    }

  }

  static getAllUserItems(username) {
    return new Promise((resolve, reject) => {
      mysqlConnetion.query(`SELECT * from items WHERE username='${username}'`, (err, rows, fields) => {
              if (!err) {
                  resolve(rows);
              }
              else {
                  reject(err);
              }
      });
   })
  }

  static update(id, Item) {
    return new Promise((resolve, reject) => {
      mysqlConnetion.query(`UPDATE items SET name='${Item}' WHERE id='${id}'`, (err, rows, fields) => {
              if (!err) {
                  resolve(rows);
              }
              else {
                  reject(err);
              }
      });
  })
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
        mysqlConnetion.query(`DELETE FROM items WHERE id="${id}"`, (err) => {
                if (!err) {
                    resolve(true);
                }
                else {
                    console.log(err);
                }
        });
    })
  }
}
module.exports = Dress;
