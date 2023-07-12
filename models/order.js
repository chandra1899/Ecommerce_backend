const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
        },
    customerId:{
            type:String
        },
    paymentIntentId:{
            type:String
        },
    products: [
      { 
        productId: { 
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Product'
        }, 
        quantity: { 
        type: Number, 
        default: 1 
    }
        },
    ],
    delivary_charge: { 
        type: Number,
        default:0
        },
    shipping: { 
        type: Object,
        required: true 
        },
    delivery_status: { 
        type: String, 
        default: "pending"
     },
    payment_status: { 
        type: String,
        required: true
        },
    mobile:{
        type:String,
    },
    paymentBy:{
        type:String
    }
  },{
     timestamps: true
     }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;