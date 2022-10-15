const ProductDetails = require('../model/productDetails');



exports.getAllDetailsOfRestaurant = (req, res) => {
    let { name, veg, lcost, hcost, sort } = req.body;

    page = req.params.pageNo;

    page = page ? page : 1; // default page no. = 1
    sort = sort ? sort : 1; // 1 is ascending -1 is descending

    let proDetails = {};
   

    let startIndex = 2 * page - 2; // 2 * 1 - 2 = 0 
    let endIndex = 2 * page; // 2 * 1 = 2

    if (name) {
        proDetails["restaurantName"] = name;
    
    }

    if(name && veg) {
        proDetails["restaurantName"] = name;
        proDetails["isVeg"] = veg;
    }

    if (name && veg && lcost && hcost) {
        proDetails["restaurantName"] = name;
        proDetails["isVeg"] = veg;
        proDetails["itemPrice"] = { $lte: hcost, $gte: lcost };
    }
    


    console.log(proDetails);
    ProductDetails.find(proDetails).sort({ itemPrice: sort }).then(result => {
        // Pagination Logic 
        const filteredResponse = result.slice(startIndex, endIndex);
        res.status(200).json({
            message: "Data Fetched Successfully",
            data: filteredResponse
        })
    })
        .catch(error => {
            res.status(500).json({
                message: "Error in database",
                error: error
            })
        })

        
}


