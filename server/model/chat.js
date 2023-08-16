const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Chat = sequelize.define('Chat', {
    messages: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },

})


module.exports = Chat