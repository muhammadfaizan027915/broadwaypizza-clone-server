const { Schema, model } = require("mongoose");

module.exports = model('Branch', new Schema({
    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    directions: {
        type: String, 
        required: true
    },

    cityId: {
        type: Schema.Types.ObjectId,
        ref: 'City'
    }
}))