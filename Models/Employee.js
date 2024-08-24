const { Schema, model } = require("mongoose");

module.exports = model('Employee', new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    branchId: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    }
}))