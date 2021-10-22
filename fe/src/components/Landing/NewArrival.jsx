import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Card, Button } from 'react-bootstrap'


import '../../assets/styles/Landing/NewArrival.css'
import { API_URL } from "../../constants/API";

const NewArrival = () => {
    const { newArrival } = useSelector(state => state.product)
    console.log(newArrival);
    // const newArrival = [1, 2]
    const renderNewArrival = () => {
        return newArrival.map((arrival) => {
            return (
                <Carousel.Item>
                    <div className="new-container">
                        <div className="new-image">
                            <img className="arrival-img" src={`${API_URL}/${arrival.productImage}`} alt="" />
                        </div>
                        <div className="new-description">
                            <h3 className="subtitle-600">
                                {arrival.productName}
                            </h3>
                            <p className="subtitle-600">
                                {arrival.description}
                            </p>
                            <h5 className="subtitle-600">
                                Rp. {arrival.price}
                            </h5>
                        </div>
                    </div>
                </Carousel.Item>
            )
        })
    }

    return (
        <>
            <div>
                <div className="new-arrival-container">
                    <h4>New Arrival</h4>
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
