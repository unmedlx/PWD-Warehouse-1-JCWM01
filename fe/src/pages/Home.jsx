import React from "react";
import { Link, Redirect } from "react-router-dom";

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

      <Link to="/register">
        <button className="btn btn-success">
          Ayok Kita Login/Register dulu
        </button>
      </Link>
    </div>
  );
}

export default Home;
