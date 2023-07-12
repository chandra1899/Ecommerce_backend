const Cart=require('../models/cart')
const Order=require('../models/order')
const stripe = require('stripe')('sk_test_51NS1E9SGZImZqwPWElOwBfpasGSSAHJN0DPp9AWbsKSz2beXXEofAhoUTgKFVi6xCK6UqARADilGv9Tca4YT7Dcx00GxL5GHOI')

module.exports.checkoutSession=async (req, res) => {
    let cartProducts=await Cart.find({
        user:req.user._id
    }).populate({
        path:'cartProduct',
        select:'-photo'
    })
    // console.log(cartProducts);
    console.log( req.body.userId);
    const customer = await stripe.customers.create({
        metadata: {
          userId: req.body.userId,
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

  const handleOrders=async (customer,data)=>{
        let cartProducts=await Cart.find({user:customer.metadata.userId}).populate({
          path:'cartProduct',
          select:'-photo'
      })
  // let orderedProducts= cartProducts.map((product)=>product.cartProduct)
  let order=await Order.create({
    userId:customer.metadata.userId,
    customerId:data.customer,
    paymentIntentId:data.payment_intent,
    delivary_charge:data.total_details.amount_shipping,
    shipping:data.shipping_details,
    payment_status:data.payment_status,
    mobile:data.customer_details.phone,
    paymentBy:data.payment_method_types[0]
  })

  for(cartProduct of cartProducts){
    order.products.push({
      productId:cartProduct.cartProduct._id,
      quantity:cartProduct.quantity
    })
  }
  await order.save();
  // console.log(order);

  //empty cart
  await Cart.deleteMany({
    user:customer.metadata.userId
  })

  }

module.exports.webhook=async  (req, res) => {
    const event = req.body;
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        break;
      case 'checkout.session.completed':
        data = event.data.object;
        eventType = event.type;
          stripe.customers
            .retrieve(data.customer)
            .then(async (customer) => {
              try {
                // CREATE ORDER
                console.log('customer',customer);
                console.log('data',data);
                handleOrders(customer,data);

              } catch (err) {
                console.log(err);
              }
            })
            .catch((err) => console.log(err.message));
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a res to acknowledge receipt of the event
    res.json({received: true});
  }