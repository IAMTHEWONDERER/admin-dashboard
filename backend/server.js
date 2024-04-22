require('dotenv').config();
require('../backend/config/database');
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const specs = require('../backend/middlewares/swagger');
const expressBusboy = require('express-busboy');

const App = express();
const port = 3111;

const authroutesuser = require("../backend/routes/authroutesuser");
const authroutescoach = require("../backend/routes/authroutescoach");
const coachroutes = require('../backend/routes/coachroutes');
const userroutes = require('../backend/routes/userroutes');
const bookingRoutes = require('../backend/routes/bookingroutes');
const reviewRoute = require('../backend/routes/reviewroutes');
const workoutRoute = require('../backend/routes/working-tracking-routes');
const reportRoute = require('../backend/routes/reportroutes');
const messageRoute = require('../backend/routes/messageRoute');
const { app, server } = require("../backend/utils/socket");

// Extend Express app with busboy for file uploads
expressBusboy.extend(App, {
  upload: true,
  path: './uploads'
});

// Middleware
App.use(cors());
App.use(express.json());
App.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
App.use('/users', userroutes);
App.use('/coaches', coachroutes);
App.use("/api", authroutesuser);
App.use("/api", authroutescoach);
App.use("/api", bookingRoutes);
App.use("/api", reviewRoute);
App.use("/api", reportRoute);
App.use("/workout", workoutRoute);
App.use("/messages", messageRoute);

// Error handling middleware (must be the last middleware)
App.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

App.listen(port, () => {
  console.log("SERVER IS WORKING");
});
