import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import { stripePaymentMethodHandler } from "./Stripe"

/*const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      lineHeight: "27px",
      color: "#212529",
      fontSize: "1.1rem",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};*/


function Checkout(props) {

  const stripe = useStripe();
  const elements = useElements();


  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
        return;
      }

      setLoading(true);
      setErrorMsg('');
  
      const paymentMethodObj = {
        type: 'card',
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name,
          email
        },
      };
      const paymentMethodResult = await stripe.createPaymentMethod(paymentMethodObj);
  
      stripePaymentMethodHandler({
        result: paymentMethodResult,
        amount: props.amount
      }, handleResponse);
  };

  const handleResponse = response => {
    setLoading(false);
    if (response.error) {
      setErrorMsg(response.error.message);
      return;
    }
    props.setPaymentCompleted(response.success ? true : false);
  };

  return (
    <div >
        <p className="text-gray-800 font-medium">Pay with card</p>
        <form onSubmit={handleSubmit}>

          <div className="mt-4">
            <label className="block text-sm text-gray-00 mb-2" htmlFor="cc-name">Name on card</label>
            <input
              id="cc-name"
              type="text"
              className="w-full h-8 px-5 py-1 text-gray-700 bg-gray-200 rounded"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-00 mb-2" htmlFor="cc-email">Email</label>
            <input
              id="cc-email"
              type="text"
              className="w-full h-8 px-5 py-1 text-gray-700 bg-gray-200 rounded"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-2">
            <label className="block text-sm text-gray-00 mb-2" htmlFor="cc-number">Card Number</label>
            <CardNumberElement
              id="cc-number"
              className="w-full h-8 px-5 py-1 text-gray-700 bg-gray-200 rounded"
            />
          </div>
      
          <div className="mt-2">
            <label className="block text-sm text-gray-00 mb-2" htmlFor="expiry">Expiration Date</label>
            <CardExpiryElement
              id="expiry"
              className="w-full h-8 px-5 py-1 text-gray-700 bg-gray-200 rounded"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-00 mb-2" htmlFor="cvc">CVC</label>
            <CardCvcElement
              id="cvc"
              className="w-full h-8 px-5 py-1 text-gray-700 bg-gray-200 rounded"
            />
          </div>

          <div className='mt-8'>
            <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit" disabled={loading}>
            {loading ? <div className="spinner-border spinner-border-sm text-light" role="status"></div> : `PAY ₹${props.amount}`}
            </button>
          </div>
          <div className='mt-2'>
            <p className="block text-sm text-gray-00 mb-2 mt-4">Want to go back ? <Link to="/cart" className="text-blue-900 text-base">Back</Link></p>
          </div>
        {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
      </form>
      


    </div>
  )
}

export default Checkout