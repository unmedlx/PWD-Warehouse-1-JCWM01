import React from "react";
import { Link } from "react-router-dom";

function Cart() {
  return (
    <div className="body">
      <h1 className="h1"> ini Cart Page</h1>
      <table className="table">
        <thead>
          <tr>product</tr>
          <tr>price</tr>
          <tr>qty</tr>
        </thead>
        <tbody>
          <tr>Kaos Putih</tr>
          <tr>Rp. 2000</tr>
          <tr>5</tr>
        </tbody>
      </table>
      <Link to="/product-list">
        <button className="btn btn-warning mx-4">Our Products</button>
      </Link>
    </div>
  );
}

export default Cart;
