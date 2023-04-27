import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getActivities } from "../../Redux/Actions";


export default function NavBar({ byActivities }) {

    const dispatch = useDispatch();

    function handleClick(e){
        e.preventDefault();
        dispatch(getActivities())
    }
    
    const allActivities = useSelector((state) => state.allActivities);

    useEffect(()=>{
        dispatch(getActivities())
    }, []);
    
    
    return (
        <div className="nav">
            <button 
                className="reload animate__animated animate__pulse animate__infinite animate__slow" 
                onClick={(e) => handleClick(e)}
            >
                Reload
            </button>
            <div className="div-select">
                <select className="select" onChange={(e) => byActivities(e)}>
                    <option value="default" hidden>Actividades</option>
                    <option value="All">Todas</option>
                    {allActivities?.map(e => (
                        <option value={e.name} key={`${e.id}-${e.name}`}>
                            {e.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}