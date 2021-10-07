import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
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
        <button className="btn btn-success">Product</button>
      </Link>
    </div>
  );
}

export default Home;
