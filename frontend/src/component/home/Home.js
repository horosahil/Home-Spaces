import React  from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { Link } from "react-router-dom";

function Home() {
  
  return (
    <div>
      <Header/>

      <div className="pt-11">
        <div className="relative">
          <img src="https://i.ibb.co/7g8QVRk/living2.jpg" className="w-9/12 h-96 mx-auto" alt="living2" border="0"></img>
        </div>
      </div>

      <p className="text-2xl font-medium text-center pt-11 pb-11">Shop by Department</p>

      <div className="grid grid-cols-6 gap-6 pb-11 items-center justify-center">
        <Link to="/livingroom">
          <div>
            <img src="https://i.ibb.co/vVJX6J2/sofa1.jpg" className="mx-auto w-44 h-44"alt="sofa" border="0" />
            <p className="text-center font-normal pt-4">Living Room</p>
          </div>
        </Link>
        <Link to="/bedroom">
          <div>
            <img src="https://i.ibb.co/zxw4YMK/bedroom.jpg" className="mx-auto w-44 h-44"alt="bed" border="0" />
            <p className="text-center font-normal pt-4">Bed Room</p>
          </div>
        </Link>
        <Link to="/diningroom">
          <div>
            <img src="https://i.ibb.co/GCLCsbB/dining.jpg" className="mx-auto w-44 h-44"alt="dining" border="0" />
            <p className="text-center font-normal pt-4">Dining Room</p>
          </div>
        </Link>
        <Link to="/workfromhome">
          <div>
            <img src="https://i.ibb.co/3mpV79w/work.png" className="mx-auto w-44 h-44"alt="table" border="0" />
            <p className="text-center font-normal pt-4">Work from Home</p>
          </div>
        </Link>
        <Link to="/outdoor">
          <div>
            <img src="https://i.ibb.co/zZb6KVn/outdoor.png" className="mx-auto w-44 h-44"alt="outdoor" border="0" />
            <p className="text-center font-normal pt-4">Outdoor</p>
          </div>
        </Link>
        <Link to="/viewall">
          <div>
            <p className="text-center font-normal">View all</p>
          </div>
        </Link>
      </div>
      
      <Footer/>
    </div>
  )
}

export default Home
