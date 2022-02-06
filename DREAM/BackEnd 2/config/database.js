const Sequelize = require('sequelize');


//Connecting to db
                        //Db name, name, password
const db = new Sequelize("Dream", "dream", "Dream123", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: 0,
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;