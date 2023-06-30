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
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        reqiured:true
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{
    timestamps:true
});

const Product=mongoose.model('Product',productSchema);

module.exports=Product;