import React, { useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    function onRegister() {
      signInWithEmailAndPassword(auth, email, password).catch((error) =>
        console.log(error)
      );
      navigate("/");
    }
    onRegister();
  };
  
  return (
    <div className="max-w-xl m-4 p-10 bg-gray-100 rounded shadow-xl mx-auto mt-12">
        <form  onSubmit={handleSubmit}>
        <label className="block text-gray-700 pb-2 pt-4 text-sm font-bold mb-2">
        Email
        </label>
        <input
          className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}></input>
        <label className="block text-gray-700 pb-2 pt-4 text-sm font-bold mb-2">
        Password
        </label>
        <input
          className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}></input>
          <div class="md:flex md:justify-center mb-6 pt-10 ">
          <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 shadow ">Sign In</button>
          </div>

          <p className="block text-sm text-gray-00 mb-2">Create account ? <Link to="/signup" className="text-blue-900 text-base">Sign Up</Link></p>
          <p className="block text-sm text-gray-00">Go to home : <Link to="/" className="text-blue-900 text-base">HomeSpaces</Link></p>
      </form>
    </div>
  )
}

export default Login