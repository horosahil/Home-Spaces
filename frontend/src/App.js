import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./firebase/AuthProvider";
import { CartProvider, useCart} from "react-use-cart";
import Home from "./component/home/Home";
import Login from "./component/login/Login";
import SignUp from "./component/signup/Signup";
import Living from "./component/product/Living";
import Bed from "./component/product/Bed";
import WorkFromHome from "./component/product/WorkFromHome";
import Dining from "./component/product/Dining";
import Outdoor from "./component/product/Outdoor";
import ViewAll from "./component/product/ViewAll";
import Cart from "./component/product/Cart";
import Pay from "./component/product/Pay"
import './App.css'

function App() {
  const {emptyCart} =useCart();

  //useBeforeunload(() => "Are you sure to close this tab?");

  

  return (
    
    <AuthProvider>
      <CartProvider>
    
        <div className="app">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/livingroom" element={<Living/>} />
              <Route path="/Bedroom" element={<Bed/>} />
              <Route path="/diningroom" element={<Dining/>} />
              <Route path="/workfromhome" element={<WorkFromHome/>} />
              <Route path="/outdoor" element={<Outdoor/>} />
              <Route path="/viewall" element={<ViewAll/>} />
              <Route path="/cart" element={<Cart/>} />
              <Route path="/checkout" element={<Pay/>} />
            </Routes>
          </BrowserRouter>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
