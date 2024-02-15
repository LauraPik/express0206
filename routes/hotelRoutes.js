const express = require('express');

const router = express.Router();

const hotelController = require('./../controllers/hotelController');


  
// router.param('id', hotelController.checkHotel)

router
.route('/top-5-best')
// pirmas kaip isrinkineja duomenis, o antras kokie reikalingi duomenys
.get(hotelController.aliasTopHotels, hotelController.getAllHotels)
router
.route('/')
.get(hotelController.getAllHotels)
.post(hotelController.createHotel, hotelController.createHotel)

router
.route('/:id')
.get(hotelController.getHotel)
.patch(hotelController.updateHotel)
.delete(hotelController.deleteHotel)

module.exports = router;