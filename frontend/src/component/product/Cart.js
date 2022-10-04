import React, { useContext } from 'react'
import { useCart } from "react-use-cart";
import { GrClose, GrFormSubtract, GrFormAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../firebase/AuthProvider"
import Footer from "../footer/Footer2"
import Header from "../header/Header";

function Cart() {

    const {
        
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        cartTotal,
        emptyCart,
    } = useCart();

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

  //if (isEmpty) return <p>Your cart is empty</p>;

  const handleClick = () => {
    if(!currentUser) {
      navigate("/login");
    }
    else {
      navigate("/checkout");
    }
      
  }

  return (
    <div>
       <Header/>
        <div className='grid grid-cols-2 gap-2 items-center'>
       <div className='row-auto mx-auto '>    
        {
        items.map((item) => (
          <div key={item.id} className="flex flex-row justify-center my-9 outline-2">
            <div>
                <img alt={item.name} src={item.img} className="h-36 w-36 mx-auto " />
            </div>
            <div className='flex flex-col justify-evenly'>
            <p className="text-lg text-center pt-4 px-8 py-8 ">{item.name}</p>

            <div className='flex flex-row justify-evenly inline'>
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}><GrFormSubtract className='inline justify-center'/></button>

                <p className="text-lg text-center pt-4 px-8 py-8 inline">{item.quantity}</p>
              
              <button
              
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}><GrFormAdd className='inline justify-center'/></button>
            </div>
            
            </div>
            <button 
              className='px-4 py-4 ml-6'
              onClick={() => removeItem(item.id)}><GrClose /></button>
          </div>
        ))
          
        }
       </div>
       <div className='pt-4'>
           <p className='text-3xl pb-6 justify-center'>Summary</p>
           <div className="pt-6">
               <p className="text-lg">Total Items {totalUniqueItems}</p>
           </div>
           <div>
               {items.map((item)=>(
                   <div key={item.id} className="flex flex-row pt-6">
                       <p className='text-sm mx-5'>{item.name}</p>
                       <p className='text-sm mx-5'>Rs {item.price}/-</p>
                   </div>
               ))}
           </div>
           <div className="flex flex-row pt-6">
               <p className='text-lg font-semibold'>Total price</p>
               <p className='text-lg font-semibold mx-5'>Rs {cartTotal}/-</p>
           </div>
           {/*<div className="pt-6">
               <p className='text-lg pb-2'>Shipping Address</p>
               <input
                  type="text"
                  className="form-control block w-2/4 px-3 py-2 text-gray-700 bg-white bg-clip-padding
                         border border-solid border-gray-300 m-0
                         focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Shipping address"/>
               </div>*/}
           <div className="pt-6">
  
                <button
                  className = "bg-white hover:bg-gray-100 text-gray-800 font-semibold ml-4 py-2 px-4 border border-gray-400 shadow "
                  onClick={handleClick}>
                  Checkout</button>
              
                {!currentUser && <p className='mt-2'>You are not logged in.You will be redirected to Sign In</p>}
           </div>
           <button
                  className = "bg-white hover:bg-gray-100 text-gray-800 font-semibold ml-4 py-2 px-4 border border-gray-400 shadow mt-4 mb-4"
                  onClick={emptyCart}>Clear Cart
            </button>

       </div>

    </div>
    <Footer/>
    </div>
  )
}

export default Cart