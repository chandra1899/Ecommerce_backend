const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    cartProduct:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Product'
    }
},{
    timestamps:true
});

const Cart=mongoose.model('Cart',cartSchema);

module.exports=Cart;