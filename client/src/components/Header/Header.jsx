import React from "react"
import {Link} from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

export default function Header() {

    return (
        <div className="header">
            <Link 
                to={"/home/createact"} 
                className="link-header animate__animated animate__headShake animate__infinite animate__slow"
            >
                CREAR ACTIVIDAD
            </Link>
            <Link 
                to={"/veract"} 
                className="link-header animate__animated animate__headShake animate__infinite animate__slow"
            >
                VER ACTIVIDADES
            </Link>
            <SearchBar/>
        </div>
    )
}