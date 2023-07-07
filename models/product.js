const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        reqiured:true
    },
    categery:{
        type:String
    },
    quantity:{
        type:Number,
        reqiured:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    starts:{
        type:Number,
        default:3
    },
    belongsTo:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const Product=mongoose.model('Product',productSchema);

module.exports=Product;