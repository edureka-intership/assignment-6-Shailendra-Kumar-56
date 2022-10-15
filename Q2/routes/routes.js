const express=require('express');
const restaurantDetails=require('../controller/restaurantsDetails');



const router=express.Router();


router.get('/:pageNo',restaurantDetails.getAllDetailsOfRestaurant);





module.exports = router; 