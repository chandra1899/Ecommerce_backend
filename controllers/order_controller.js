const Order=require('../models/order');

module.exports.getOrders=async (req,res)=>{
    try {
        let orders=await Order.find({
            userId:req.user._id
        }).populate({
            path:'products.productId',
            select:'-photo'
        })
        return res.status(200).json({orders})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
}