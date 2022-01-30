import React, { useEffect, useState } from "react";
import "../../assets/styles/Checkout.css";
import axios from "axios";
import { API_URL } from "../../constants/API";
import { useDispatch, useSelector } from "react-redux";
import { fetchWarehouseAction } from "../../redux/actions/addressWarehouse";
import { Spinner } from "react-bootstrap";

const PreviewOrder = ({
  nextStep,
  prevStep,
  handleChange,
  total,
  shippingInformation,
}) => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.addressWarehouse);
  // const [closestWarehouse, setclosestWarehouse] = useState({})
  const [dataCourier, setdataCourier] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [selectedCourier, setselectedCourier] = useState();

  console.log(shippingInformation);

  const Continue = () => {
    handleChange(selectedCourier);
    nextStep();
  };
  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  const getClosestWarehouse = async () => {
    try {
      dispatch(fetchWarehouseAction(shippingInformation));
      // const getClosestAddress = await axios.post(`${API_URL}/address/closest-address/`, shippingInformation)
      // console.log(getClosestAddress);
      // setclosestWarehouse(getClosestAddress.data)
      // setisLoadingWarehouse(false)
    } catch (err) {
      console.log(err);
    }
  };

  const getDeliveryRate = async (e) => {
    let courier = e.target.value;
    if (courier) {
      try {
        const getDeliveryRate = await axios.post(
          `${API_URL}/transaction/delivery-rate`,
          {
            originCity: shippingInformation.kota,
            destinationCity: data.kota,
            courier: courier,
          }
        );
        setdataCourier(getDeliveryRate.data.results.rajaongkir.results[0]);
      } catch (err) {
        console.log(err);
        console.log("Pilih COurier");
      }
    }
  };

  const renderDelivery = () => {
    console.log(dataCourier.costs);
    if (dataCourier.costs.length === 0) {
      return (
        <div className="courier-card-notavail">
          <div>
            <div>Courier is not available</div>
            <div className="text-muted"></div>
          </div>
          <div></div>
        </div>
      );
    }
    return dataCourier.costs.map((courier) => {
      courier.name = dataCourier.name;
      courier.code = dataCourier.code;
      courier.warehouse = data.warehouse;
      courier.idWarehouse = data.idWarehouse;
      return (
        <div
          className="courier-card"
          onClick={() => {
            getSelectedCourier(courier);
          }}
        >
          <div>
            <div>{courier.service}</div>
            <div className="text-muted">{courier.description}</div>
          </div>
          <div>Rp. {courier.cost[0].value.toLocaleString()}</div>
        </div>
      );
    });
  };

  const getSelectedCourier = (courier) => {
    setselectedCourier(courier);
    setisLoading(false);
  };

  useEffect(() => {
    getClosestWarehouse();
  }, []);

  return (
    <div className="mt-5 ms-4">
      <div className="shipping-information-container ">
        <div className="row">
          <div className="col-6 preview-order-left">
            <div className="row">
              <div>
                <label>Recipient</label>
                <p className="subtitle"> {shippingInformation.recipientName}</p>
              </div>
              <div className="">
                <label>Destination</label>
                <p className="subtitle">
                  {" "}
                  {shippingInformation.jalan}, {shippingInformation.kota}, {shippingInformation.provinsi}
                </p>
              </div>

              <label htmlFor="deliveryRate">Courier</label>
              {loading ? (
                <>
                  <Spinner className="ms-3 mt-2" animation="border" />
                </>
              ) : (
                <div>
                  <select
                    className="custom-select courier-choose"
                    id="deliveryRate"
                    onChange={(e) => getDeliveryRate(e)}
                  >
                    <option value="">Choose Courier</option>
                    <option value="jne">JNE</option>
                    <option value="pos">POS Indonesia</option>
                    <option value="tiki">TIKI</option>
                  </select>
                </div>
              )}
            </div>
            {dataCourier && <div className="row mt-4">{renderDelivery()}</div>}
          </div>
          <div className="col-6 preview-order-right">
            <div className="row">
              <h4 className="subtitle">Order Summary</h4>
              <div className="col checkout-detail mt-2">
                <p className="subtitle">Product Subtotal</p>
                {selectedCourier && (
                  <p className="subtitle">Estimated Shipping</p>
                )}
              </div>
              <div className="col checkout-detail mt-2">
                <p>Rp. {total.toLocaleString()}</p>
                {selectedCourier && (
                  <p>Rp. {selectedCourier.cost[0].value.toLocaleString()}</p>
                )}
              </div>

              <hr />
              <div className="col checkout-detail mt-2">
                {selectedCourier && <p className="subtitle">Total</p>}
              </div>
              <div className="col checkout-detail mt-2 subtitle">
                {selectedCourier && (
                  <p>
                    Rp.{" "}
                    {(total + selectedCourier.cost[0].value).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 ">
          <button
            className="button nav-button"
            onClick={Previous}
            type="submit"
          >
            Previous
          </button>
          <button
            className="button nav-button"
            onClick={Continue}
            type="submit"
            disabled={isLoading}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewOrder;
