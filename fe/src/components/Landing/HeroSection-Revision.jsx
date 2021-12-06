import React from "react";
import { Link } from "react-router-dom";

import styles from '../../assets/styles/Landing/HeroSection.module.css'

import Hero from "../../assets/images/hero.png";
import BigEclipse from "../../assets/images/big-eclipse.svg";
import MidEclipse from "../../assets/images/mid-eclipse.svg";

const HeroSection = () => {
    return (
        <>
            <div className={styles.container}>
                <div className="new-arrival">
                    <div className="d-flex justify-content-center align-items-center hero-head">
                        <div className="me-5">
                            <div>
                                <h6 className="m-0 p-0 new-arrival-subtitle">never out of style/</h6>
                                <h6 className="m-0 p-0 new-arrival-subtitle">Brange.</h6>
                            </div>
                        </div>
                        <h4 className="new-arrival-title">BRANGE COLLECTION</h4>
                    </div>
                </div>

                <div className={styles["hero-container"]}>
                    <div className={styles["image-replace"]}>
                        {/* <h5 className={styles.cta}>View Collection</h5> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroSection;
