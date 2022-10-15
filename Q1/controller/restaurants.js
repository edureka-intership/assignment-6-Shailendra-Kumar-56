const Restaurants=require('../model/restaurants')




exports.getAllRestaurantsDetails = (req,res) => {
    let { mealtype, cuisine, location, lcost, hcost, sort } = req.body;
    
    page = req.params.pageNo;
    
    page = page ? page : 1; // default page no. = 1
    sort = sort ? sort : 1; // 1 is ascending -1 is descending

    let filterLoad = {};

    let startIndex = 2 * page - 2; // 2 * 1 - 2 = 0 
    let endIndex = 2 * page; // 2 * 1 = 2

    if (mealtype) {
        filterLoad["type.mealtype"] = mealtype; 
    }
    if (mealtype && cuisine) {
        filterLoad["type.mealtype"] = mealtype;
        filterLoad["Cuisine.cuisine"] = cuisine;
    }
    if (mealtype && hcost && lcost) {
        filterLoad["type.mealtype"] = mealtype;
        filterLoad["cost"] = { $lte: hcost, $gte: lcost };
    }
    if (mealtype && cuisine && lcost && hcost) {
        filterLoad["type.mealtype"] = mealtype;
        filterLoad["cost"] = { $lte: hcost, $gte: lcost };
        filterLoad["Cuisine.cuisine"] = cuisine;
    }
    if (mealtype && location) {
        filterLoad["type.mealtype"] = mealtype;
        filterLoad["locality"] = location;
    }
    if (mealtype && location && cuisine) {
        filterLoad["type.mealtype"] = mealtype;
        filterLoad["locality"] = location;
        filterLoad["Cuisine.cuisine"] = cuisine;
    }
    if (mealtype && location && lcost && hcost) {
        filterLoad["type.mealtype"] = mealtype;
        filterLoad["locality"] = location;
        filterLoad["cost"] = { $lte: hcost, $gte: lcost };
    }
    if (mealtype && location && cuisine && lcost && hcost) {
        filterLoad["type.mealtype"] = mealtype;
        filterLoad["locality"] = location;
        filterLoad["Cuisine.cuisine"] = cuisine;
        filterLoad["cost"] = { $lte: hcost, $gte: lcost };
    }
    if (lcost && hcost) {
        filterLoad["cost"] = { $lte: hcost, $gte: lcost };
    }
    console.log(filterLoad);
    Restaurants.find(filterLoad).sort({ cost: sort }).then(result => {
            // Pagination Logic 
            const filteredResponse = result.slice(startIndex, endIndex);
            res.status(200).json({
                message: "Data Fetched Successfully",
                data: filteredResponse })
        })
        .catch(error => {
            res.status(500).json({ 
                message: "Error in database",
                error: error })
        })
}

