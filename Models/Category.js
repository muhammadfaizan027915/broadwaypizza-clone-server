const { Schema, model } = require("mongoose");

module.exports = model('Category', new Schema({
    name: {
        type: String, 
        required: true
    }
}))