import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants/API";
import CartModal from "../components/CartModal";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/styles/ProductDetail.css";

export default function ProductDetail(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const reload = () => window.location.reload();
  const handleClose = () => {
    setShow(false);
    return cartGlobal.cartList.map((val) => {
      axios
        .patch(`${API_URL}/carts/${val.idProduct}?idUser=${val.idUser}`, {
          quantity: val.quantity,
        })
        .then(() => {})
        .catch(() => {
          alert(`Server error`);
        });
    });
    // reload();
  };
  const handleShow = () => setShow(true);

  const cartGlobal = useSelector((state) => state.cart);

  const [image, setImage] = useState("");
  const [stock, setStock] = useState([]);
  // GLOBAL STATE //
  const userGlobal = useSelector((state) => state.users);
  // const adminGlobal = useSelector((state) => state.admins);
  const { idUser } = userGlobal;

  //REDIRECT TRIGGER//
  const [redirect, setRedirect] = useState(null);

  //PRODUCT DATA
  const [productDetail, setProductDetail] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState({
    quantity: parseInt(1),
    productNotFound: false,
  });

  const fetchProducts = () => {
    axios
      .get(`${API_URL}/products/${props.match.params.idProduct}`)
      .then((response) => {
        if (response.data.length) {
          setProductDetail(response.data[0]);
          setImage(response.data[0].productImage);
        } else {
          setAdditionalInfo({ productNotFound: true });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const fetchStock = () => {
    axios
      .get(`${API_URL}/userstocks/${props.match.params.idProduct}`)
      .then((response) => {
        setStock(response.data[0]);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const fetchCart = () => {
    axios
      .get(`${API_URL}/carts?idUser=${userGlobal.idUser}`)
      .then((response) => {
        dispatch({
          type: "FILL_CART",
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchStock();
    fetchCart();
  },[]);

  const addToCartHandler = () => {
    // Check Login Condition
    if (idUser) {
      axios
        .get(
          `${API_URL}/carts/${props.match.params.idProduct}?idUser=${userGlobal.idUser}`
        )
        .then((response) => {
          console.log(response);
          if (response.data.length) {
            alert(
              `${productDetail.productName} already exist in cart. You can change the quantity in your cart list`
            );
          } else {
            axios
              .post(`${API_URL}/carts`, {
                idProduct: props.match.params.idProduct,
                idUser: userGlobal.idUser,
                quantity: additionalInfo.quantity,
              })
              .then(() => {
                alert(
                  `${additionalInfo.quantity} x ${productDetail.productName} added to the cart`
                );

                axios
                  .get(`${API_URL}/carts/${userGlobal.idUser}`)
                  .then((response) => {
                    dispatch({
                      type: "FILL_CART",
                      payload: response.data,
                    });
                    reload();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch(() => {
                alert(`Server error`);
              });
          }
        });
    } else {
      alert(`Anda Belum SignIn, Silahkan SignIn Untuk Dapat Bertransaksi `);
      setRedirect("Reload This Page After SignIn !");
    }
  };

  // REDIRECT //
  if (redirect) {
    window.open(`/authentication`);
  }

  return (
    <div
      style={{ height: 650 }}
      className="d-flex justify-content-center align-items-center"
    >
      {additionalInfo.productNotFound ? (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="my-4 display-6">
            Product with ID {props.match.params.idProduct} does not exist
          </div>
          <Link to="/product-list">
            <button className="btn btn-success">
              Click here to return to products list
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="card-product d-flex flex-row justify content evenly align-items-center">
            <div class="photo">
              <img
                src={image.includes("/images/IMG") ? API_URL + image : image}
                alt="productImage"
              ></img>
            </div>
            <div class="description">
              <h2>{productDetail.productName}</h2>
              <h4>{productDetail.category}</h4>
              <h1>Rp. {productDetail.price}</h1>
              <p>{productDetail.description}</p>
              <p style={{ marginBottom: -15 }}></p>

              <div className="d-flex flex-row align-items-center">
                <button
                  style={{ marginLeft: -4 }}
                  className="button-cart"
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>
              <h5 className="h5-light">{redirect}</h5>
            </div>
          </div>
          <button
            style={{ marginLeft: 1000, fontWeight: "bold", marginBottom: 430 }}
            className="btn btn-success col-lg-1 col-6 col-md-3 position-relative"
            onClick={handleShow}
          >
            CART
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartGlobal.cartList.length}
              <span class="visually-hidden">unread messages</span>
            </span>
          </button>
          <CartModal show={show} handleClose={handleClose} stock={stock} />
        </div>
      )}
    </div>
  );
}
