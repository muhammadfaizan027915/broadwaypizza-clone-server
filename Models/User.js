const {Schema, model, SchemaType} = require('mongoose')

module.exports = model('User', new Schema({
    name: {
        type: String, 
        required: true
    },

    email: {
        type: String, 
        required: true, 
        lowercase: true
    },

    phone: {
        type: Number, 
        required: true
    },

    role: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    addressId: [{
        type: Schema.Types.ObjectId,
        ref: 'Address'
    }],

    favourites: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
}))