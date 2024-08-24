const { Schema, model } = require("mongoose");

module.exports = model('Order', new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    branchId: {
        type: Schema.Types.ObjectId,
        ref: 'Branch'
    },

    deliveredBy: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        default: null
    },

    deliveryAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: () => this.orderType === 'delivery'
    },

    paymentMethod: {
        type: String,
        required: true
    },
    
    orderType: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        default: 'pending'
    },

    orderNote: {
        type: String,
        default: ''
    },

    createdAt: {
        type: Schema.Types.Date,
        required: true,
        default: Date.now
    },
    
    orderItems: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
    
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
    
        subTotal: {
            type: Schema.Types.Decimal128,
            required: true
        }
    }],

    total: {
        type: Schema.Types.Decimal128,
        required: true
    }
}))