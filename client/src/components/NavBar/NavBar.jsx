import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCountries } from "../../Redux/Actions";
import "./NavBar.css";


export default function NavBar({ byName, byPopulation, byContinent }) {

    const dispatch = useDispatch();

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries())
    }

    useEffect(() => {
        dispatch(getCountries())
    }, [])
    
    return (
        <div className="nav">
            <button 
                className="reload animate__animated animate__pulse animate__infinite animate__slow" 
                onClick={(e) => handleClick(e)}
            >
                Reload
            </button>
            <div className="div-select">
                <select className="select" onChange={(e) => byName(e)}>
                    <option value="" >Por Nombre</option>
                    <option value="Asc">A a la Z</option>
                    <option value="Desc">Z a la A</option>
                </select>

                <select className="select" onChange={(e) => byPopulation(e)}>
                    <option value="" >Por Población</option>
                    <option value="Asc">Menor a Mayor</option>
                    <option value="Desc">Mayor a Menor</option>
                </select>

                <select className="select" onChange={(e) => byContinent(e)}>
                    <option value="All">Por Continente</option>
                    <option value="Africa">Africa</option>
                    <option value="North America">Norteamérica</option>
                    <option value="South America">Sudamérica</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europa</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Antarctica">Antártida</option>
                </select>
            </div>
        </div>
    )
}





