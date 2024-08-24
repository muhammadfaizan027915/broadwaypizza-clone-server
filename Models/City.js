const { Schema, model } = require("mongoose");

module.exports = model('City', new Schema ({
    name: {
        type: String,
        required: true
    },

    image: {
        type: String, 
        required: true
    }
}))