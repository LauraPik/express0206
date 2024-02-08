const fs = require('fs');
const data = fs.readFileSync("./data/hotels.json");
const dataPars = JSON.parse(data);


  // Callbacks
  
exports.getAllHotels = (req, res) => {
      res
      .status(200).json({
        status: "sucess",
        data: {
          status: "Succsess",
          // paduoti ilgi, kiek yra
          result: dataPars.name,
          // sukuria, kaip vadinasi objekto duomenys
          data: {
            dataPars,
          },
        },
      });
    }
exports.createHotel = (req, res) => {
      const newId = dataPars[dataPars.length - 1].id + 1;
    
      // prideda prie objekto id
      const hotelData = Object.assign({ id: newId }, req.body);
      dataPars.push(hotelData);
      fs.writeFile(
        `${__dirname}/data/hotels.json`,
        JSON.stringify(dataPars, null, '\t'),
        (err) => {
          res.status(201)
          .json({
            status: "success",
            message: "New hote created",
            data: hotelData,
          });
        }
      );
    }
    
exports.getHotel = (req, res) => {
      // jei yra viena eilute return ir skliausteliu
      const hotel = dataPars.find((hotel) => hotel.id == req.params.id);
      res
      .status(200).json({
        status: "success",
        data: {
          // paduoti ilgi, kiek yra
          data: {
            hotel,
          },
        },
      });
    }
    
    
exports.updateHotel = (req, res)=>{
      res.status(200)
      .json({
        status: "success",
        message: "New hote Updated",
        data:'<Updated>'
      });
    
    }
    
    
    // __________________Update, naudojamas metodas patch
    
exports.deleteHotel = (req, res)=>{
      res.status(200)
      .json({
        status: "success",
        message: "New hote Updated",
        data: null
      });
    }

exports.checkHotel = (req, res, next)=> {
      const hotel = dataPars.find((hotel) => hotel.id == req.params.id);
      if (!hotel) {
        res.status(404).json({
          status: "Failed",
          data: {
            message: "Nerasta",
            // paduoti ilgi, kiek yra
          },
        });
    
        return;
      }
    
      next();
    }