import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { ref, set } from "firebase/database";

function Signup() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    function onRegister() {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          set(ref(db, "users/" + userCredential.user.uid), {
            firstName: firstName,
            lastName: lastName,
            email: email,
          });
        })
        .catch((error) => console.log(error));
      navigate("/");
    }
    onRegister();
  };
  
  return (
    <div className="max-w-xl m-4 p-10 bg-gray-100 rounded shadow-xl mx-auto mt-12">
      <form onSubmit={handleSubmit}>
        <label className="block text-gray-700 pb-2 text-sm font-bold mb-2">
        First Name
        </label>
        <input
          className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)}
          required></input>
        <label className="block text-gray-700 pb-2 pt-4 text-sm font-bold mb-2">
        Last Name
        </label>
        <input
          className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="last name"
          onChange={(e) => setLastName(e.target.value)}
          required></input>
        <label className="block text-gray-700 pb-2 pt-4 text-sm font-bold mb-2">
        Email
        </label>
        <input
          className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"></input>
        <label className="block text-gray-700 pb-2 pt-4 text-sm font-bold mb-2">
        Password
        </label>
        <input
          className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"></input>
        <div className="md:flex md:justify-center pt-4">
          <button 
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ">Sign Up</button>
        </div>

        <p className="block text-sm text-gray-00 mb-2 mt-4">Already have account ? <Link to="/login" className="text-blue-900 text-base">Sign In</Link></p>
        <p className="block text-sm text-gray-00">Go to home : <Link to="/" className="text-blue-900 text-base">HomeSpaces</Link></p>

      </form>
    </div>
  )
}

export default Signup