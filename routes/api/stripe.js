const express=require('express');
const router=express.Router();
const stripe = require('stripe')('sk_test_51NS1E9SGZImZqwPWElOwBfpasGSSAHJN0DPp9AWbsKSz2beXXEofAhoUTgKFVi6xCK6UqARADilGv9Tca4YT7Dcx00GxL5GHOI')

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:5173/checkoutSuccess',
    cancel_url: 'http://localhost:5173/cart',
  });

//   console.log(session.url);
  return res.status(200).json({url:session.url});
});

module.exports=router;