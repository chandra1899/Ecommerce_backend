const Cart=require('../models/cart')

module.exports.addProduct=async (req,res)=>{
    try {
        let cart=Cart.create({
            user:req.user._id,
            cartProduct:req.params.id
        })
        return res.status(200).json({cart})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
}

module.exports.getProducts=async (req,res)=>{
    try {
        let cartProducts=await Cart.find({
            user:req.user._id
        }).populate({
            path:'cartProduct',
            select:'-photo'
        })
        return res.status(200).json({cartProducts})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
}

module.exports.deleteProduct=async (req,res)=>{
    try {
        await Cart.findOneAndDelete({
            user:req.user._id,
            cartProduct:req.params.id
        })
        return res.status(200).json({deleted:true})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
}