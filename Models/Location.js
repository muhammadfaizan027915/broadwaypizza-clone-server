const { Schema, model } = require("mongoose");

module.exports = model('Location', new Schema({
    name: {
        type: String, 
        required: true
    },

    cityId: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },

    branchId: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    }
}))