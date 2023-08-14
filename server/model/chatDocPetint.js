const { DataTypes} = require("sequelize");
const sequelize = require('../database/db');



const Chat = sequelize.define('Chat',
  {
    message: {
       type: DataTypes.STRING, 
       allowNull: false,
    },
    
  }
);



module.exports = Chat;