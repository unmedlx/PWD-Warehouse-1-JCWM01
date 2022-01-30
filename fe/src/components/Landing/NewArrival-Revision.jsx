import React from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";

import "../../assets/styles/Landing/NewArrival.css";
import { API_URL } from "../../constants/API";

const NewArrival = () => {
    const { newArrival } = useSelector((state) => state.product);
    //Price Formatter
    const formatter = new Intl.NumberFormat("id-ID");
    const renderNewArrival = () => {
        return newArrival.map((arrival) => {
            return (
                <Carousel.Item>
                    <div className="new-container">
                        <div className="new-image">
                            <img
                                className="arrival-img"
                                src={`${API_URL}/${arrival.productImage}`}
                                alt=""
                            />
                        </div>
                        <div className="new-description">
                            <h3 className="new-product-name">{arrival.productName}</h3>
                            <p className="new-product-description">{arrival.description}</p>
                            <h4 className="new-product-price">
                                Rp {formatter.format(arrival.price)}
                            </h4>
                        </div>
                    </div>
                </Carousel.Item>
            );
        });
    };

    return (
        <>
            <div className="new-arrival-container">
                <div className="new-arrival">
                    <div className="d-flex justify-content-center align-items-center new-arrival-head">
                        <div className="me-5">
                            <div>
                                <h6 className="m-0 p-0 new-arrival-subtitle">never out of style/</h6>
                                <h6 className="m-0 p-0 new-arrival-subtitle">Brange.</h6>
                            </div>
                        </div>
                        <h4 className="new-arrival-title">NEW ARRIVAL</h4>
                    </div>
                    <div className="new-arrival-cards">
                        <Carousel>{renderNewArrival()}</Carousel>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewArrival;
