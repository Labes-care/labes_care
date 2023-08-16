const Sequelize = require('sequelize');
require('dotenv').config()
const user=process.env.user||'root'
const password=process.env.password||'root'
const sequelize = new Sequelize('labescare', user, password, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,                 
  sync:false,
});

sequelize.query("CREATE DATABASE IF NOT EXISTS`labescare`;") // Create the database if it doesn't exist
  .then(() => { console.log("database connetcted")
  })
  .catch((error) => {
    console.error('Unable to create the database:', error);
    sequelize.close();
  });
console.log(user)
module.exports = sequelize;        