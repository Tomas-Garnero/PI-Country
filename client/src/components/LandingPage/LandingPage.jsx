import React from "react";
import {Link} from "react-router-dom";

import "animate.css";
import "./LandingPage.css";

export default function LandingPage() {

    return(
        <div className="main">
            <section className="showcase">
                <div>
                    <Link to="/home">
                        <button 
                            className="button animate__animated animate__heartBeat animate__infinite animate__slower"
                        >
                            Ingresar
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    )
};