const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
 
const stripe = require('stripe')('sk_test_51LAALMSCku9c68HG2eiXzIaXWbqsSNhiNEDH0u6rFVeTjQq37FRLwAHKKrgXas3xGKz9YxYXCINqvYfbEcruDfeh007T0GO6lx');
 
var app = express();
var port = process.env.PORT || 4000;
 
// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
 
// confirm the paymentIntent
app.post('/pay', cors(), async (request, response) => {
  try {
    // Create the PaymentIntent
    let intent = await stripe.paymentIntents.create({
      payment_method: request.body.payment_method_id,
      amount: request.body.amount*100,
      description: "Test payment",
      currency: 'inr',
      confirmation_method: "automatic",
      confirm: true
    });
    // Send the response to the client
    //response.send(generateResponse(intent));
    /*console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})*/
    response.status(200).send({success: true})
  } catch (e) {
    // Display error on client
    /*console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
        })*/
    return response.send({ error: e.message });
  }
});
 
const generateResponse = (intent) => {
  if (intent.status == '200') {
    // The payment didn’t need any additional actions and completed!
    // Handle post-payment fulfillment
    return {
      success: true
    };
  } else {
    // Invalid status
    return {
      error: 'Invalid PaymentIntent status'
    };
  }
};
 
// request handlers
app.get('/', (req, res) => {
  res.send('Stripe Integration');
});
 
app.listen(port, () => {
  console.log('Server started on: ' + port);
});