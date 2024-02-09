const mongoose = require('mongoose');


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
    ranking:{
        type: String,
        default: 1.2
      },
    room_price:{
      type: Number,
      require:[true, 'A hotel must have price']
    }
  });
  


// musu modelis
const Hotel = mongoose.model('Hotel', hotelShema);

module.exports = Hotel;