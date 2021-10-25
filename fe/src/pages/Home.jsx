import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";

function Home() {
  const dispatch = useDispatch();
  
  const logout = () => {
    localStorage.removeItem("token_shutter");
    dispatch({
      type: "USER_LOGOUT",
    });
    dispatch({
      type: "ADMIN_LOGOUT",
    });
    alert("logout success");
  };
  return (
    <div >
            <div className="body-home-page">
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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat omnis beatae modi minus dignissimos dicta, excepturi facilis voluptatem reiciendis aliquid velit labore voluptas eligendi, cumque accusantium cupiditate ipsa atque doloremque.</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit dolores magni, unde fugit, odio repellendus provident delectus doloremque corporis, at expedita reprehenderit! Iure iste itaque aspernatur eius nostrum officiis cupiditate!</p>
          </div>
          <Footer />
    </div>
   
  );
}

export default Home;
