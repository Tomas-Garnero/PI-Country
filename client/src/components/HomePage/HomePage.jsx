import { useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import { 
    getCountries, 
    getActivities, 
    filterByContinent, 
    orderByName, 
    orderByPopulation, 
    setPaginado 
    } from "../../Redux/Actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";
import Header from "../Header/Header";
import "./HomePage.css"


export default function HomePage () { 

    const dispatch = useDispatch();

    const allCountries = useSelector((state) => state.countries);
    const pagination = useSelector((state) => state.paginado);

    // declaro un estado local, en donde declaro la pagina actual y cual va a ser la pagina actual. Y que la pagina actual comienze en 1
    const [currentPage, setCurrentPage] = useState(1);
    // declaro otro estado local en donde tengo la acntidad de paises por pagina y el set. Ademas arranco en 10
    const [countriesPerPage, setCountriesPerPage] = useState(10);
    // declaro que el indice del ultimo pais va a ser igual a la pagina actual multiplicado por los paises por paginas
    const indexOfLastCountry = pagination.current * countriesPerPage;  
    // declaro que el indice del primer pais va a ser igual a el indice del ultimo pais menos los paises por pagina
    const indexOfFirstCoutry = indexOfLastCountry - countriesPerPage 
    // guardo en la variable declarada una porcion del array total, la cual va a ir desde el indice del primer pais hasta el indice del ultimo pais sin incluirlo
    const currentCountries = allCountries.slice(indexOfFirstCoutry, indexOfLastCountry)  // slice divide un array segun lo que le pase por parametro

    // el paginado setea la pagina en la que yo este y de ahi se modifica lo de arriba
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
    }, [])

    useEffect(() => {
        dispatch(setPaginado({current: currentPage}));
    }, [currentPage])
    
    function handleFilterContinent(e) {
        e.preventDefault();
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1);
    }

    function handleSortName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
    }

    function handleSortPopulation(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setCurrentPage(1);
    }


    return (
        <div className="home">
            <Header/>
            <NavBar
                byName={handleSortName}
                byPopulation={handleSortPopulation}
                byContinent={handleFilterContinent}
            />
            <div className="paginado-top">
                <Paginado
                    countriesPerPage={countriesPerPage}
                    allCountries={allCountries.length}
                    paginado={paginado}
                />
            </div>
            {currentCountries.length ? (
                <div className="container">
                    {currentCountries.map(country => {
                        return (
                            <Card
                                flag_img={country.flag_img}
                                name={country.name}
                                continent={country.continent}
                                id={country.id}
                                key={country.id}
                            />
                        )
                    })}
                </div>
            ) : (
                <div className="sk-cube-grid">
                    <div className="sk-cube sk-cube1"></div>
                    <div className="sk-cube sk-cube2"></div>
                    <div className="sk-cube sk-cube3"></div>
                    <div className="sk-cube sk-cube4"></div>
                    <div className="sk-cube sk-cube5"></div>
                    <div className="sk-cube sk-cube6"></div>
                    <div className="sk-cube sk-cube7"></div>
                    <div className="sk-cube sk-cube8"></div>
                    <div className="sk-cube sk-cube9"></div>
                </div>
            )}
            <div className="paginado-bottom">
                <Paginado
                    countriesPerPage={countriesPerPage}
                    allCountries={allCountries.length}
                    paginado={paginado}
                />
            </div>
        </div>
    )
};