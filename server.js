const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const port = process.env.PORT;
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB)
.then(con=>{
  console.log(con.connection);
  console.log("Connected to DATABASE")
})

// ---DB demo/
// sukuriame schema

const hotelShema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'A hotel must have name'],
    unique: true
  },
  address:{
    type: String,
    require:[true, 'Must have adress']
  },
  room_price:{
    type: Number,
    require:[true, 'A hotel must have price']
  }
});

// musu modelis
const Hotel = mongoose.model('Hotel', hotelShema);

const testHotel = new Hotel({
  "name":"Grand Hotel ++++",
  "address":"123 djklafna",
  "room_price":200
});

testHotel.save()
.then(doc=>console.log(doc))
.catch(err=>{
  console.log(err)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

