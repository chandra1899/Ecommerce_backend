const Cart=require('../models/cart')
const stripe = require('stripe')('sk_test_51NS1E9SGZImZqwPWElOwBfpasGSSAHJN0DPp9AWbsKSz2beXXEofAhoUTgKFVi6xCK6UqARADilGv9Tca4YT7Dcx00GxL5GHOI')

module.exports.checkoutSession=async (req, res) => {
    let cartProducts=await Cart.find({
        user:req.user._id
    }).populate('cartProduct')
    // console.log(cartProducts);
    // return ;
    const line_items=await cartProducts.map((cartProduct)=>{
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                  name: cartProduct.cartProduct.name,
                  images:[`http://localhost:8000/api/product/photo/${cartProduct.cartProduct._id}`],
                  description:cartProduct.cartProduct.description,
                  metadata:{
                    id:cartProduct._id
                  }
                },
                unit_amount: parseInt(cartProduct.cartProduct.price)*100,
              },
              quantity: cartProduct.quantity,
        }
    })
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: 'http://localhost:5173/checkoutSuccess',
      cancel_url: 'http://localhost:5173/cart',
    });
  
  //   console.log(session.url);
    return res.status(200).json({url:session.url});
  }