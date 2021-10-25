import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Card, Button } from 'react-bootstrap'


import '../../assets/styles/Landing/NewArrival.css'
import { API_URL } from "../../constants/API";

const NewArrival = () => {
    const { newArrival } = useSelector(state => state.product)
    console.log(newArrival);
    // const newArrival = [1, 2]
    //Price Formatter
    const formatter = new Intl.NumberFormat('id-ID');
    const renderNewArrival = () => {
        return newArrival.map((arrival) => {
            return (
                <Carousel.Item>
                    <div className="new-container">
                        <div className="new-image">
                            <img className="arrival-img" src={`${API_URL}/${arrival.productImage}`} alt="" />
                        </div>
                        <div className="new-description">
                            <h3 className="subtitle-500">
                                {arrival.productName}
                            </h3>
                            <p className="subtitle-500">
                                {arrival.description}
                            </p>
                            <h4 className="subtitle-600 text">
                               Rp {formatter.format(arrival.price)}
                            </h4>
                        </div>
                    </div>
                </Carousel.Item>
            )
        })
    }

    return (
        <>
            <div className="new-arrival-container">
                <div className="new-arrival">
                    <h4 className="new-arrival-title subtitle-600">NEW ARRIVAL</h4>
                    <div className="new-arrival-cards">
                        <Carousel>
                            {renderNewArrival()}
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewArrival
