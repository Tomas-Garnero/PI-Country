import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
    getActivities, 
    filterByActivity,
    setPaginado1 
    } from "../../Redux/Actions";
import NavBar1 from "../NavBar1/NavBar1";
import Paginado1 from "../Paginado1/Paginado1";
import CardAct from "../CardAct/CardAct";
import Header1 from "../Header1/Header1";


export default function VerActivity() {

    const dispatch = useDispatch();

    const allActivities = useSelector((state) => state.activities);
    const pagination1 = useSelector((state) => state.paginado1);

    // declaro un estado local, en donde declaro la pagina actual y cual va a ser la pagina actual. Y que la pagina actual comienze en 1
    const [currentPage, setCurrentPage] = useState(1);
    // declaro otro estado local en donde tengo la acntidad de paises por pagina y el set. Ademas arranco en 10
    const [activitiesPerPage, setActivitiesPerPage] = useState(10);
    // declaro que el indice del ultimo pais va a ser igual a la pagina actual multiplicado por los paises por paginas
    const indexOfLastActivity = pagination1.current * activitiesPerPage;  
    // declaro que el indice del primer pais va a ser igual a el indice del ultimo pais menos los paises por pagina
    const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage 
    // guardo en la variable declarada una porcion del array total, la cual va a ir desde el indice del primer pais hasta el indice del ultimo pais sin incluirlo
    const currentActivities = allActivities.slice(indexOfFirstActivity, indexOfLastActivity)  // slice divide un array segun lo que le pase por parametro

    // el paginado setea la pagina en la que yo este y de ahi se modifica lo de arriba
    const paginado1 = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getActivities());
    }, [])

    useEffect(() => {
        dispatch(setPaginado1({current: currentPage}));
    }, [currentPage])

    function handleSortActivity(e){
        e.preventDefault();
        dispatch(filterByActivity(e.target.value));
        setCurrentPage(1);
    }

    return (
        <div className="home">
            <Header1 />
            <NavBar1
                byActivities={handleSortActivity}
            />
            <div className="paginado-top">
                <Paginado1
                    activitiesPerPage={activitiesPerPage}
                    allActivities={allActivities.length}
                    paginado1={paginado1}
                />
            </div>
            {currentActivities.length ? (
                <div className="container">
                    {currentActivities.map(act => {
                        return (
                            <CardAct 
                                name={act.name}
                                difficulty={act.difficulty}
                                duration={act.duration}
                                season={act.season}
                                countries={act.countries}
                                id={act.id}
                                key={act.id}
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
            <div className="paginado-top">
                <Paginado1
                    activitiesPerPage={activitiesPerPage}
                    allActivities={allActivities.length}
                    paginado1={paginado1}
                />
            </div>
        </div>
    )
}
