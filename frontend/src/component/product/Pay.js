import React, { useState, useContext, useEffect} from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js";
import { useCart} from "react-use-cart"
import { uid } from "uid";
import { db } from "../../firebase/firebase";
import { ref, set, onValue } from "firebase/database";
import { AuthContext } from "../../firebase/AuthProvider";
import Checkout from './Checkout';

const stripePromise = loadStripe("pk_test_51LAALMSCku9c68HGAvDKddzzC6wLQqLHIJgYGB80lcpEvIyNZLpvlQlGwhdy9fAqwfauIgPQhJbR9eL5DBZKkGZe004VLZSwQU");

function Pay() {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { items, cartTotal, totalUniqueItems} = useCart();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [itemId, setItemId] = useState([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (currentUser) {
      const starCountRef = ref(db, "users/" + currentUser.uid);
      onValue(starCountRef, (snapshot) => {
        if (snapshot.exists()) {
          var data = snapshot.val();
          setUsername(data.firstName + " " + data.lastName);
          setEmail(data.email);
        }
      });
    }
  }, [currentUser]);
  

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    const id = uid();

    setItemId(prev => [...prev , ...items.map(item => {return item.id})])

    function writeData(id,cartTotal,username,email,totalUniqueItems,itemId,address) {
      set(ref(db, "Purchase/" + id ), {
        total: cartTotal,
        user: username,
        email: email,
        totalItem: totalUniqueItems,
        proId: itemId,
        address: address,
      });
  
    }
    writeData(id,cartTotal,username,email,totalUniqueItems,itemId,address);
    

  
  
  }
  
     

  
  const successMessage = () => {
    return (
      <div className="success-msg">
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
        </svg>
        <div className="block text-lg text-gray-00 mb-2">Payment Successful</div><div className="mt-2">
            <label className="block text-sm text-gray-00 mb-2" htmlFor="cc-address">Shipping Address</label>
            <input
              id="cc-address"
              type="text"
              className="w-full h-8 px-5 py-1 text-gray-700 bg-gray-200 rounded"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className='mt-5'>
            <button className="px-4 py-1 text-white font-light  bg-gray-900 rounded" onClick={handleSubmit}>
             Complete Order
            </button>
          </div>

         
        <div className="block text-lg text-gray-00 mb-2 mt-5">Go to Home : <Link to="/" >Home Spaces</Link></div>
      </div>
    )
  }

  return (
    <div className="max-w-xl m-4 p-10 bg-gray-100 rounded shadow-xl mx-auto mt-12">
        <div>
        {paymentCompleted ? successMessage(): <React.Fragment>
          <div>
            <Elements stripe={stripePromise}>
              <Checkout amount={cartTotal} setPaymentCompleted={setPaymentCompleted}/>
            </Elements>
          </div>
        </React.Fragment>}
      </div>

      
    </div>
  )
}

export default Pay