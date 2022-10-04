import React, { useState } from 'react'
import Products from "../data/Data";
import { BsBasket3 } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";
import { FaGreaterThanEqual } from "react-icons/fa";
import { useCart } from "react-use-cart";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Bed() {

  const { addItem } = useCart();
  const [ price, setPrice] = useState(0);

  const handleInput = (e) => {
    setPrice(e.target.value);
  }

  return (
    <div>
      <Header/>

      <div className='mt-4'>
        <div className="max-w-2xl m-4 p-4 rounded mx-auto mt-4">
          <p className="block text-lg text-gray-00 mb-2 text-center">Filters</p>
          <div className='flex'>
            <label htmlFor='price' className="block text-base text-gray-00">Price</label>
            <input className='form-range w-9/12 cursor-pointer ml-4'
              id="price"  type="range" min="0" max="40000" step="5000" list="tickmarks" onInput={handleInput}/>
            <datalist id="tickmarks">
              <option value="0">0</option>
              <option value="10000">10000</option>
              <option value="20000">20000</option>
              <option value="30000">30000</option>
              <option value="40000">40000</option>
            </datalist>
            <span className='ml-4 flex items-center'><FaGreaterThanEqual className='mr-2'/>{price}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 items-center pt-11 pb-11 gap-y-10">
      {
        Products.filter( (product) => {return product.price >= parseInt(price)}).map((product) => {
          if(product.category === "bedroom")
            return (
              
              <div key={product.id} >
                
                <div>
                  <img alt={product.name} src={product.img} className="h-72 w-72 mx-auto" />
                    <p id="product-name" className="text-lg text-center pt-4">{product.name}</p>
                    <p id="product-brand" className="text-sm text-center pt-1.5">By {product.brand}</p>             
                </div>
              
                <div className="flex flex-row justify-around items-center">
                  <p id="product-price" className="text-lg text-center pt-1.5"><BiRupee className="inline"/>{product.price}</p> 
                  <button 
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold ml-4 py-1.5 px-1.5 border border-gray-400 shadow"
                    onClick={ ()=> addItem(product)}>
                    <BsBasket3 className="inline"/> Add</button>
                </div>
                
              </div>
            )
            else
              return console.log('No data')
        })
      }
      </div>
      
      <Footer/>
    </div>
  )
}

export default Bed