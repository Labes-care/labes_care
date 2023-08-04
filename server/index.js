const express = require("express");
const sequelize = require('./database/db');
const db = require('./model/index')



const app = express();
require('dotenv').config();
const PORT = process.env.PORT||5000
const cors = require("cors");


const doctor = require ('./router/doctor')
const auth = require ('./router/auth')








app.use(express.urlencoded({extended:true}))

app.use(express.json());
app.use(cors()); 



app.use("/api/doctors",doctor)
app.use("/auth",auth)




sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    return sequelize.sync({ force: false}); // Change this to "true" when You need to drop and change Tables (auto change)
  })//Keep it False if you are testing
  .then(() => {
    console.log('Models are synchronized with the database.');
    app.listen(PORT, function () {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });