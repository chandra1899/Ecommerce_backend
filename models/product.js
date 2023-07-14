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
        type:String,
        required:true
    },
    categery:{
        type:String
    },
    quantity:{
        type:String,
        reqiured:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    starts:{
        type:String,
        default:'3'
    },
    belongsTo:{
        type:String,
        required:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
},{
    timestamps:true
});

const Product=mongoose.model('Product',productSchema);

module.exports=Product;