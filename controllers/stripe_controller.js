const Cart=require('../models/cart')
const stripe = require('stripe')('sk_test_51NS1E9SGZImZqwPWElOwBfpasGSSAHJN0DPp9AWbsKSz2beXXEofAhoUTgKFVi6xCK6UqARADilGv9Tca4YT7Dcx00GxL5GHOI')

module.exports.checkoutSession=async (req, res) => {
    let cartProducts=await Cart.find({
        user:req.user._id
    }).populate({
        path:'cartProduct',
        select:'-photo'
    })
    const customer = await stripe.customers.create({
        metadata: {
          userId: req.user._id,
          // cart: JSON.stringify(cartProducts),
        },
      });
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
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "KE","IN"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "usd",
              },
              display_name: "Free shipping",
              // Delivers between 5-7 business days
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1500,
                currency: "usd",
              },
              display_name: "Next day air",
              // Delivers in exactly 1 business day
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 1,
                },
              },
            },
          },
        ],
        phone_number_collection: {
          enabled: true,
        },
      line_items: line_items,
      mode: 'payment',
      customer: customer.id,
      success_url: 'http://localhost:5173/checkoutSuccess',
      cancel_url: 'http://localhost:5173/cart',
    });
  
  //   console.log(session.url);
    return res.status(200).json({url:session.url});
  }