const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const {Doctor} = require('./doctor')


const Event = sequelize.define('Event', {
   title : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
        type: DataTypes.ENUM('Work', 'Personal', 'Important','Travel','Frinds'),
        defaultValue: 'Work',
    },
    date : {
    type: DataTypes.DATE,
  
    },
    details : {
        type: DataTypes.STRING,
        allowNull: false,
        }

});
module.exports = Event;
