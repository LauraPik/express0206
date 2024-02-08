const express = require("express");

const router = express.Router();
// parsinasi, kai naudojame middleweare naudojame use
const app = express();
// susimportavau
const hotelsRoutes = require('./routes/hotelRoutes')
app.use(express.json());


const morgan = require('morgan');

app.use(morgan('dev'));
// Mouting Router, antras parametras naudoju, tai ka susinstaliavau
app.use('/api/v1/hotels', hotelsRoutes);

// _________

module.exports = app;