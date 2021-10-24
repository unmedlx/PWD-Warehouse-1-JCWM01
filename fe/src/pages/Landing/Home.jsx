import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/actions/users";
import axios from "axios"
import { API_URL } from "../../constants/API";



import UserNavbar from "../../components/Landing/UserNavbar";
import HeroSection from "../../components/Landing/HeroSection";
import NewArrival from "../../components/Landing/NewArrival";
import Footer from "../../components/Landing/Footer";
import IntroToBrange from "../../components/Landing/IntroToBrange";
// import { getNewArrival } from "../../redux/actions/product";

function Home() {
  const dispatch = useDispatch();
  // const { newArrival } = useSelector(state => state.product)
  // console.log(newArrival);
  const logout = () => {
    dispatch(userLogout())
  };

  // const getArrival = () => {
  //   dispatch(getNewArrival())
  // }


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
      {/* <UserNavbar /> */}

      <HeroSection />
      <NewArrival />
      <IntroToBrange />
      <Footer />
    </div>
  );
}

export default Home;
