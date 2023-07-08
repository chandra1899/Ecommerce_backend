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