import React from 'react'
import "../assets/styles/Footer.css"
import {AiOutlineGithub} from "react-icons/ai"
import moment from "moment"

function Footer() {
    return (
        <footer className="footer-dark">
                <div className="d-flex flex-row justify-content-center ">
                    <div className="col-sm-6 col-md-3 item ">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="#">Warehousing</a></li>
                            <li><a href="#">Shipping</a></li>
                            <li><a href="#">Shopping</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Brange Company</a></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div className="col-6 item text">
                        <h3>Brange.co</h3>
                        <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
                    </div>
                </div>
                     <div className="col item social">
                        <a href="#">
                            <AiOutlineGithub className="payment-action-svg"/>
                        </a>
                        <a href="#">
                            <i className="icon ion-social-twitter"></i>
                        </a>
                        <a href="#">
                            <i className="icon ion-social-snapchat"></i>
                        </a>
                        <a href="#">
                            <i className="icon ion-social-instagram"></i>
                        </a>
                    </div>
                <p className="copyright"> © {moment().format('YYYY')} BRANGE. All Right Reserved </p>
        </footer>
    )
}

export default Footer
