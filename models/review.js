const mongoose=require('mongoose');

const reviewSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //comment belong to a user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }
},{
    timestamps:true
});

const Review=mongoose.model('Review',reviewSchema);

module.exports=Review;