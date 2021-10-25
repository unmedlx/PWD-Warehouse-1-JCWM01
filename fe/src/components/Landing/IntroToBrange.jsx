import React from "react";
import "../../assets/styles/Landing/IntroToBrange.css";
import "../../assets/styles/Typography.css";

import Intro from "../../assets/images/intro.png";
import MidEclipse from "../../assets/images/mid-eclipse.svg";

const IntroToBrange = () => {
  return (
    <>
      <div className="presentation-intro">
        <div className="intro">
          <div className="cover-intro">
            <img src={Intro} alt="hero" />
          </div>
          <div className="intro-texts">
            <h1 className="intro-head subtitle-600">Brange.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
              vitae laudantium iste tempore repellendus a incidunt quaerat est
              illum in, omnis dolores quis. Itaque natus aut dolorum, impedit
              alias esse? Saepe, velit. Quo officiis itaque iste deleniti est
              inventore, quam doloremque nobis, temporibus, saepe soluta
              sapiente eum architecto recusandae eius similique dolores totam
              tenetur nesciunt aut sed aliquid reprehenderit iure.
            </p>
          </div>
        </div>
      </div>
      <img className="mid-circle-intro-2" src={MidEclipse} alt="" />
      <img className="mid-circle-intro" src={MidEclipse} alt="" />
    </>
  );
};

export default IntroToBrange;
