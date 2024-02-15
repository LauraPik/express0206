const express = require("express");

const router = express.Router();

const app = express();

const hotelsRoutes = require('./routes/hotelRoutes');
const UserRoutes = require('./routes/userRoutes')

app.use(express.json());


const morgan = require('morgan');

app.use(morgan('dev'));

app.use('/api/v1/hotels', hotelsRoutes);
app.use('/api/v1/users', UserRoutes);



module.exports = app;