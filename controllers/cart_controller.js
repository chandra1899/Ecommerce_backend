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

module.exports.changeqyt=async (req,res)=>{
    try {
        let cartProduct=await Cart.findById(req.query.id);
        if(req.query.type==='inc'){
            cartProduct.quantity+=1
        }else{
            cartProduct.quantity-=1
        }
        cartProduct.save();
        return res.status(200).json({msg:'sucessfully changed'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
}

module.exports.emptyCart=async (req,res)=>{
    try {
        await Cart.deleteMany({
            user:req.user._id
        })
        return res.status(200).json({msg:'sucessfully changed'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
}