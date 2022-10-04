import React from 'react'
import { AiOutlineCopyright } from "react-icons/ai";

function Footer2() {
  return (
    <div>
        <footer className = "bg-gray-100 text-center">
          <div className = "text-center text-gray-700 p-4">
            <p className = "md:flex md:justify-center items-center"><AiOutlineCopyright className = "mr-2"/>2022 Copyright: Home World</p>
          </div>
        </footer>
    </div>
  )
}

export default Footer2