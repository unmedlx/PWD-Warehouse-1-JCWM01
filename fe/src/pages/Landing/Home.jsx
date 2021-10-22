import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/actions/users";
import axios from "axios"
import { API_URL } from "../../constants/API";



import UserNavbar from "../../components/Landing/UserNavbar";
import HeroSection from "../../components/Landing/HeroSection";
import NewArrival from "../../components/Landing/NewArrival";
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
      <UserNavbar />

      <HeroSection />
      <NewArrival />
      <h1> ini Home Page Ecommerce WareHouse1</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
        corporis excepturi soluta a praesentium deleniti delectus eos doloribus
        inventore temporibus asperiores, nam veniam recusandae commodi tenetur,
        eum nobis, ea quis.
      </p>

      <Link to="/authentication">
        <button className="btn btn-success">Ayok Kita signUp dulu</button>
      </Link>
      <Link to="/profile">
        <button className="btn btn-success">Profile</button>
      </Link>
      <Link to="/product-list">
        <button className="btn btn-success">Product List</button>
      </Link>

      {/* Rendered Only For Admin */}
      {
        // this.props.role === "admin" && 
        <Link to="/add-product">
          <button className="btn btn-success">Admin Add Product</button>
          {/* <button className="btn btn-warning mx-4">Our Products</button> */}
        </Link>
      }

      {/* <Link to="/cart">
        <button className="btn btn-warning mx-4">Cart</button>
      </Link> */}
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
