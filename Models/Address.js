const { Schema, model, SchemaType } = require("mongoose");

module.exports = model('Address', new Schema({
    cityId : {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },

    locationId : {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    
    userAddress : {
        type: String, 
        required: true
    }
}))