const cloudinary = require("cloudinary")
  .v2;


cloudinary.config({
  cloud_name: "dmuills8f",
  api_key: '787193955193337',
  api_secret: 'XXfrxR-6HN0LVd1w3CiLx9Kxbi0',
});

module.exports = cloudinary;