const fs = require('fs');
const Hotel = require('./../models/hotelModel');
const { match } = require('assert');
const APIFeatures = require('./../utilities/apiTools');

// hotel Data
const data = fs.readFileSync("./data/hotels.json");
const dataPars = JSON.parse(data);

exports.checkBody = (req, res, next)=>{

  if(!req.body.name || !req.body.room_price){
    return res.status(400).json({
      status: 'Failed',
      message:"Missing name and price"
    })
  }

  next()
}


exports.aliasTopHotels = (req, res, next)=>{
  req.query.limit = '5';
  req.query.sort = '-comfort, room_price';
  req.query.fields = 'name, room_price, comfort';
  next();
}
// duomenu filtravimas


  // Callbacks
  
exports.getAllHotels = async (req, res) => {
  
    try{
    // kurimo metu kuriamas konstruktorius su query=Hotel.find(); queryString = req.query
    const hotelsData = new APIFeatures(Hotel.find(), req.query)
     .filter()
     .sort()
     .limitFields()
     .paginate()

      const hotels = await hotelsData.query;

      res
      .status(200).json({
        status: "sucess",
        results: hotels.length,
        data: {
          hotels
        },
      });

    }catch(err){
      res.status(404).json({
        status: 'failed',
        message: err.message
      })

    }
      
    }



exports.createHotel = async(req, res) => {
     try{
      const newHotel = await Hotel.create(req.body);
      res.status(201)
          .json({
            status: "success",
            message: "New hote created",
            data: newHotel,
          });

     }catch(err){
      res.status(404).json({
        status: 'failed',
        message: err
      })
      
     }
      
    }
    
exports.getHotel = async (req, res) => {
  try{
    const hotel = await Hotel.findById(req.params.id);

    console.log(hotel)
    res
    .status(200).json({
      status: "success",
        // paduoti ilgi, kiek yra
        data: {
          hotel
        }
    });

  }catch(err){
    res.status(404).json({
      status: 'failed',
      message: err
    })


  }
      // jei yra viena eilute return ir skliausteliu
      
     
    }
    
    
exports.updateHotel = async(req, res)=>{
  // findandupdate mongo db funkcija, nekurta
  try{
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true

    });
    res.status(200)
      .json({
        status: "success",
        message: "Hotel Updated",
        data:{
          hotel

        }
      });
  }catch(err){
    res.status(404).json({
      status: 'failed',
      message: err
    })
   
  };
       
}
    
    
    // __________________Update, naudojamas metodas patch
    
exports.deleteHotel = async (req, res)=>{
  try{
    await Hotel.findOneAndDelete(req.params.id);
    res.status(200)
      .json({
        status: "success",
        message: "Hotel is deleted",
        data: null
      });

  }catch(err){
    res.status(404).json({
      status: 'failed',
      message: err
    })

  }
      
    }


// tikrina kontroleris, kuris id is json failo
// middileweare nereikia funkcijos, kuri buvo checkId
