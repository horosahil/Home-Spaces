import React, { useState, useContext, useEffect} from 'react';
import { auth, db } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../firebase/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";

function Header() {
    
    const { totalUniqueItems } = useCart();
    const { currentUser } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      if (currentUser) {
        const starCountRef = ref(db, "users/" + currentUser.uid);
        onValue(starCountRef, (snapshot) => {
          if (snapshot.exists()) {
            var data = snapshot.val();
            setUsername(data.firstName + " " + data.lastName);
          }
        });
      }
    }, [currentUser]);
  
    const clickLogin = () => {
      if (currentUser) {
        signOut(auth);
      } else {
        navigate("/login");
      }
    };
  
    const clickSignup = () => {
      navigate("/signup");
    };

    const clickBag = () => {
      navigate("/cart");
    };

  return (
    <div>
      <nav className="relative flex flex-wrap items-center justify-between px-8 py-4 bg-gray-100 ">
        <Link to="/">
        <p className="text-xl font-normal flex items-center justif-between tracking-widest">
        <img src="https://i.ibb.co/94BBrCd/logo2.jpg" className="w-16 h-12 pr-3" alt="Logo" border="0" />
          Home Spaces</p>
        </Link>
          {currentUser && <p>Welcome, {username}</p>}
        <div >
          <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 shadow " 
          onClick={clickLogin}>
            {currentUser ? "Log Out" : "Sign In"}
          </button>
          {!currentUser && <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold ml-4 py-2 px-4 border border-gray-400 shadow " 
          onClick={clickSignup}>Sign Up</button>}
          <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold ml-4 py-2 px-4 border border-gray-400 shadow " 
          onClick={clickBag}><p className='flex items-center'><FaShoppingBag className='mr-2'/>Bag {totalUniqueItems}</p></button>
        </div>
      </nav>
    </div>
  )
}

export default Header