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
    rankingAverage:{
        type: Number,
        default: 4.2,
        // klad nebutu minusiniu reiksmiu
        min:[1, 'Ranking must be above 1'],
        max:[5, "Ranking must be bellow 5"]
    },
    room_price:{
      type: Number,
      require:[true, 'A hotel must have price']
    },
    comfort:{
      type:String,
      required:[true, 'A hotel must have stars level'],
      // tam tikra reiksme
      enum:{
        values:["1", "2", '3', "4", "5", "6", "7"]
      }

    },
    price_discount:{
      type: Number
      
    },
    summary:{
      type: String,
      trim: true,
      required:[true, 'A hote must have summary']
    },
    description:{
      type: String,
      trim: true
    },
    image_cover:{
      type:String,
      required:[true, 'A hotel must have image cover']
    },
    createdAt:{
      type:Date,
      default: Date.now(),
      // nebus atvaizduojami 
      select: false
    }
  });
  


// musu modelis
const Hotel = mongoose.model('Hotel', hotelShema);

module.exports = Hotel;