import React from 'react'
import "../assets/styles/Footer.css"
import {AiOutlineGithub, AiFillTwitterCircle, AiFillFacebook, AiOutlineInstagram, AiFillInstagram } from "react-icons/ai"
import moment from "moment"

function Footer() {
    return (
        <footer className="footer-dark">
                <div className=" footer-container ">
                    <div className="col-sm-6 col-md-3 item footer-items">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="#">Warehousing</a></li>
                            <li><a href="#">Shipping</a></li>
                            <li><a href="#">Shopping</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-md-3 item  footer-items">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Brange Company</a></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-12 col-md-6 item text footer-items">
                        <h3>Brange.co</h3>
                        <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
                    </div>
                </div>
                     <div className="col item social">
                        <a href="#">
                            <AiOutlineGithub className="payment-action-svg"/>
                        </a>
                        <a href="#">
                            <AiFillTwitterCircle className="payment-action-svg" />
                        </a>
                        <a href="#">
                            <AiFillFacebook className="payment-action-svg" />
                        </a>
                        <a href="#">
                            <AiFillInstagram className="payment-action-svg" />
                        </a>
                       
                    </div>
                <p className="copyright"> © {moment().format('YYYY')} BRANGE. All Right Reserved </p>
        </footer>
    )
}

export default Footer
