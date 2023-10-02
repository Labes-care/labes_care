const express = require("express");
const sequelize = require('./database/db');
const db = require('./model/index')
const app = express();
require('dotenv').config();
const PORT = process.env.PORT||3003
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");





const doctorPofileRouter = require('./router/doctorProfile')
const doctor = require ('./router/doctor')
const events = require ('./router/event')
const auth = require ('./router/auth')
const DoProfile = require('./router/DoProfile')
const admin = require('./router/admin')
const adminDashboard = require('./router/adminDashboard')
const payment = require ('./router/payment') 
const doctorRoutes = require('./router/DoctormobileRoutes');

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors()); 


const server = http.createServer(app);
const io = socketIo(server)

server.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

app.use('/',doctorRoutes);
app.use('/',doctorRoutes);
app.use('/',doctorRoutes);


app.use("/api/doctors",doctor)
app.use("/doctor/event",events)

app.use("/doctorProfile",doctorPofileRouter)
app.use("/auth",auth)
app.use("/admin",admin)
app.use('/adminDashboard',adminDashboard)
app.use('/flouci',payment)



app.use("/",DoProfile)



sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    return sequelize.sync({ force: false}); // Change this to "true" when You need to drop and change Tables (auto change)
  })//Keep it False if you are testing
  .then(() => {
    console.log('Models are synchronized with the database.');
    server
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });



  io.on("connection", (socket) => {
    console.log("A user connected");
  
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    }); 
  
    // Handle user joining a room
    socket.on("user_joined", ({ type, id }) => {
      socket.join(`room_${type}_${id}`);
      console.log(`User joined room: room_${type}_${id}`);
    });
  
    // Handle real-time chat messages
    socket.on("send_message", (data) => {
      // Send the message to the appropriate room
      const { type, id } = data;
      io.to(`room_${type}_${id}`).emit("receive_message", data);
    });
  });
