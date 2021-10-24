import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/actions/users";
import axios from "axios"
import { API_URL } from "../../constants/API";



import HeroSection from "../../components/Landing/HeroSection";
import NewArrival from "../../components/Landing/NewArrival";
import Footer from "../../components/Landing/Footer";
import IntroToBrange from "../../components/Landing/IntroToBrange";

function Home() {
  const dispatch = useDispatch();

  const getArrival = async () => {
    try {
      const newArrival = await axios.get(`${API_URL}/products?newArrival=new`)
      dispatch({
        type: "NEW_ARRIVAL",
        payload: newArrival.data,
      });

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getArrival()
  }, []);



  return (
    <div>
      <HeroSection />
      <NewArrival />
      <IntroToBrange />
    </div>
  );
}

export default Home;
