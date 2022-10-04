import React, { useState} from "react";
import { db } from "../../firebase/firebase";
import { ref, set } from "firebase/database"
import { AiOutlineCopyright } from "react-icons/ai";
import { uid } from "uid";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    const id = uid();
    function writeData(id) {
      set(ref(db, "subscriber/" + id ), {
        email: email
      });
    }
    writeData(id);
    setEmail('');
  }

  return (
    <div>
      <footer className = "bg-gray-100 text-center">
        <div className = "px-6 pt-11">
          <form onSubmit = { handleSubmit }>
            <div className = "grid md:grid-cols-3 gird-cols-1 gap-4 flex justify-center items-center">
              <div className = "md:ml-auto md:mb-6">
                <p className = "text-black-500">
                We like your style. Want to stay in touch?
                </p>
              </div>
              <div className = "md:mb-6">
                <input
                  type = "text"
                  className="form-control block w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding
                         border border-solid border-gray-300 m-0
                         focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="EmailInput"
                  value={email}
                  onChange = {(e) => setEmail(e.target.value)}
                  placeholder = "Email address"
                  />
              </div>
              <div className = "md:mr-auto mb-6">
                <button type = "button" className = "bg-white hover:bg-gray-100 text-gray-800 font-semibold ml-4 py-2 px-4 border border-gray-400 shadow "
                  onClick = { handleSubmit }>Submit</button>
              </div>
            </div>
          </form>

          <div className = "text-center text-gray-700 p-4">
            <p className = "md:flex md:justify-center items-center"><AiOutlineCopyright className = "mr-2"/>2022 Copyright: Home World</p>
          </div>

        </div>
      </footer>
    </div>
  )
}

export default Footer