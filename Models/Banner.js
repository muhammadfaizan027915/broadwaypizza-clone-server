const { Schema, model,} = require('mongoose')

module.exports = model('Banner', new Schema({
    image: {
        type: String,
        required: true
    } 
}))