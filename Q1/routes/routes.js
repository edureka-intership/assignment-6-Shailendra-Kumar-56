const express=require('express');
const restaurantController=require('../controller/restaurants');



const router=express.Router();


router.get('/:pageNo',restaurantController.getAllRestaurantsDetails);





module.exports = router;  