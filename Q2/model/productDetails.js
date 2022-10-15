const mongoose = require('mongoose')

const productDetailsSchema = new mongoose.Schema({
    itemPrice: {
        type: Number,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    isVeg: {
        type: Boolean,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("ProductDetails", productDetailsSchema, "menu")