import { useEffect, useState, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';

import { getDetails, clearDetail, deleteCountryOrAct } from "../../Redux/Actions";
import { editar, borrar } from "../../assets";
import "./CountryDetail.css";

export default function CountryDetail() {
    
    const dispatch = useDispatch();

    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
    const [load, setLoad] = useState(false);

    const selectedCountry = useSelector((state) => state.detail);
    const { name, flag_img, continent, capital, subregion, area, population, Activities } = selectedCountry;

    let { id } = useParams();

    useEffect(() => {
        dispatch(getDetails(id));
        setLoad(true);
        return () => {
            dispatch(clearDetail());
        }
    }, [reducerValue])

    function handleActDelete(e, act) {
        e.preventDefault();
        dispatch(deleteCountryOrAct(id, act));
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No sera posible revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4d1a5a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            customClass: {
                title: "swal-title",
                popup: "swal-popup",
                text: "swal-text"
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Eliminado!',
                    text: 'La actividad ha sido eliminada de este país',
                    icon: 'success',
                    customClass: {
                        title: "swal-title",
                        popup: "swal-popup",
                        text: "swal-text"
                    },
                    showClass: {
                        popup: "animate__ animated animate__fadeInDown"
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutUp"
                    }
                });
        forceUpdate();
            };
        })
    }

    return (
        <div className="detail-bg">
            <Link to='/home'className="link-decoration">
                <div className="btn-return">
                    <button className="btndetail">Volver</button>
                </div>
            </Link>
            {selectedCountry.length !== 0 ? (
                <div className="detail_container">
                    <div className="detail_container-country">
                        <h1 className="country-name">{name}</h1>
                        <img className="country-flag" src={flag_img} alt={`${name}' flag`}/>
                        <h3 className="country-info">
                            Continent: &nbsp; &nbsp;
                            <p className="country-info-p">{continent}</p>
                        </h3>
                        <h3 className="country-info">
                            Capital: &nbsp; &nbsp;
                            <p className="country-info-p">{capital}</p>
                        </h3>
                        <h3 className="country-info">
                            Subregion: &nbsp; &nbsp;
                            <p className="country-info-p">{subregion}</p>
                        </h3>
                        <h3 className="country-info">
                            Area: &nbsp; &nbsp;
                            <p className="country-info-p">{area} km2</p>
                        </h3>
                        <h3 className="country-info">
                            Population: &nbsp; &nbsp;
                            <p className="country-info-p">{population}</p>
                        </h3>
                        <h3 className="country-info">
                            ID: &nbsp; &nbsp;
                            <p className="country-info-p">{id}</p>
                        </h3>
                    </div>
                    <div className="container-activity">
                        {load && Activities?.map(act => (
                                <div className="activity-container" key={act.id} >
                                    <h5 className="act-name activity-info">{act.name}</h5>
                                    <h5 className="activity-info">Dificultad: &nbsp; &nbsp; {act.difficulty}</h5>
                                    <h5 className="activity-info">Duración: &nbsp; &nbsp; {act.duration}</h5>
                                    <h5 className="activity-info">Temporada: &nbsp; &nbsp; {act.season}</h5>
                                    <div className="icon-container">
                                        <div className="icon-position" onClick={(e) => handleActDelete(e, act)}>
                                            <img className="icon-image" src={borrar} alt="Editar" width="32px" height="32px" />
                                        </div>
                                        <div className="icon-position">
                                            <Link>
                                                <img 
                                                    className="icon-image" 
                                                    src={editar} 
                                                    alt="Editar" 
                                                    width="32px" 
                                                    height="32px" 
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="not-found">
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
                </div>
            )}
        </div>
    )
}