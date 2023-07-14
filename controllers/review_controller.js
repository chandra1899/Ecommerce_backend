const Review=require('../models/review')
const Product=require('../models/product')

module.exports.create=async (req,res)=>{
    try {
    let product=await Product.findById(req.body.product);
     let review;
     if(product){
        review=await Review.create({
             content:req.body.content,
             product:req.body.product,
             user:req.user._id
         });
         review=await review.populate('user');
         product.reviews.push(review);
         product.save();
         res.status(200).json({review})
     }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
}

module.exports.destroy=async (req,res)=>{
    try {
        // console.log('delete');
        let review=await Review.findById(req.params.id);
        if(review.user==req.user.id){
        let productId=review.product;
        await Review.findByIdAndDelete(review.id);
        await Product.findByIdAndUpdate(productId,{$pull:{reviews:req.params.id}});
        return res.status(200).json({msg:"sucessfully deleted comment"})
    }else{
        return res.status(402).json({msg:"can't delete comment"})
    }
    } catch (err) {
        console.log("error in deleting the comment",err);
        return res.status(500).json({error:err})
    }
}