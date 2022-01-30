import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../assets/styles/Checkout.css";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom"

const ShippingInformation = ({ nextStep, prevStep, handleChange }) => {
  const addressGlobal = useSelector((state) => state.addresses);
  const [chooseAddress, setchooseAddress] = useState([]);

  console.log(Object.values(addressGlobal).length);
  const addressLength = Object.values(addressGlobal).length

  const Continue = () => {
    handleChange(chooseAddress);
    nextStep();
  };
  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  const handleSelectedId = (e) => {
    const selectedId = e.target.value;
    let arrAddress = Object.values(addressGlobal);
    const result = arrAddress.filter(
      (address) => address.idAddress === selectedId
    );
    setchooseAddress(result[0]);
  };

  const renderAddress = () => {
    let arrAddress = Object.values(addressGlobal);
    return arrAddress.map((address) => {
      return <option value={address.idAddress}>{address.recipientName}</option>;
    });
  };

  const fetchPrimaryAddress = () => {
    let arrAddress = Object.values(addressGlobal);
    setchooseAddress(arrAddress[0]);
  };

  useEffect(() => {
    fetchPrimaryAddress();
  }, []);

  if (addressLength != 0) {
    return (
      <div className="mt-5 ms-4">
        <h4>Shipping Information</h4>

        <div className="shipping-information-container">
          <div>
            <label htmlFor="selectAddress">Select your address</label>
            <select
              className="custom-select ms-3"
              name="selectAddress"
              onChange={(e) => handleSelectedId(e)}
            >
              {renderAddress()}
            </select>
          </div>
          <div className="shipping-card row">
            <div>
              <div className="status">
                {chooseAddress.isDefault === 1 && (
                  <p>
                    <Badge bg="#32b280">Primary</Badge>
                  </p>
                )}
              </div>
              <div className="row mt-2">
                <div className="col-4">
                  <h4 className="recipient-name">
                    {chooseAddress.recipientName}
                  </h4>
                  <h6 className="phoneNumber">{chooseAddress.phoneNumber}</h6>
                </div>
                <div className="col-2 address-field">
                  <p>Street</p>
                  <p className="mt-5">Province</p>
                  <p>ZIP</p>
                </div>
                <div className=" col-5">
                  <p>{chooseAddress.jalan}</p>
                  <p className="mt-4">
                    {chooseAddress.kecamatan}, {chooseAddress.kota},{" "}
                    {chooseAddress.provinsi}
                  </p>
                  <p>{chooseAddress.zip}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="button nav-button" onClick={Previous} type="submit">
          Previous
        </button>
        <button className="button nav-button" onClick={Continue} type="submit">
          Next
        </button>
      </div>
    );
  } else {
    return (
      <div className="mt-5 ms-4">
        <h4>Shipping Information</h4>

        <div className="shipping-information-container">
          <div>
            <label htmlFor="selectAddress">You have no address</label>
          </div>
        </div>
        <button className="button nav-button" onClick={Previous} type="submit" >
          Previous
        </button>
        <button className="button nav-button" onClick={Continue} type="submit" disabled>
          Next
        </button>
        <Link to="/address">
          <button className="button nav-button" type="submit">
            Profile
          </button>
        </Link>
      </div>
    );
  }
};

export default ShippingInformation;
