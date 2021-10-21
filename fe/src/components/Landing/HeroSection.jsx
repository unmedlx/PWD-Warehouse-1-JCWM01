import React from 'react'
import '../../assets/styles/Landing/HeroSection.css'
import '../../assets/styles/Typography.css'

import Hero from '../../assets/images/hero.png'
import BigEclipse from '../../assets/images/big-eclipse.svg'
import MidEclipse from '../../assets/images/mid-eclipse.svg'
import SmallEclipse from '../../assets/images/small-eclipse.svg'

const HeroSection = () => {
    return (
        <>
            <div className="presentation">
                <div className="introduction">
                    <div className="intro-text">
                        <h1 className="text-heading">It's not about brand it's about style</h1>
                        <p>Join and Shop with us</p>
                    </div>
                    <div className="cta">
                        <button className="cta-add">Products</button>

                    </div>
                </div>
                <div className="cover">
                    <img src={Hero} alt="hero" />
                </div>


            </div>
            <img className="big-circle" src={BigEclipse} alt="" />
            <img className="mid-circle" src={MidEclipse} alt="" />
            {/* <img className="small-circle" src={SmallEclipse} alt="" /> */}
        </>
    )
}

export default HeroSection
