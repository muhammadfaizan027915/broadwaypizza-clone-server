const { Schema, model } = require("mongoose");

module.exports = model('Product', new Schema({
    name: {
        type: String, 
        required: true
    },
    
    description: {
        type: String, 
        required:true
    },

    persons: {
        type: Number,
        required: true,
        default: 1
    },

    image: {
        type: String, 
        required: true
    },

    price: {
        type: Schema.Types.Decimal128, 
        required: true
    },

    discount: {
        type: Schema.Types.Decimal128,
        default: 0.0
    },
    
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
}))