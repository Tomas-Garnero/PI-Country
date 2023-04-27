import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

import { getCountries, updateActivity, getActDetails } from "../../Redux/Actions";
import { remove } from "../../assets";
import validate from "./validations.js";


export default function EditAct() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let { id } = useParams();

    const countries = useSelector((state) =>  state.allCountries);
    const activity = useSelector((state) => state.actDetail);

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: []
    });

    useEffect(() => {
        dispatch(getCountries())
        dispatch(getActDetails(id))
    }, [])

    useEffect(() => {
        const { name , difficulty, duration, season, Countries } = activity
        setInput({
            name: name || "",
            difficulty: difficulty || "",
            duration: duration || "",
            season: season || "",
            countries: Countries ? Countries.map(c => c.id) : []
        })
    }, [activity]) 
    
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSelect(e) {
        if (!input.countries.includes(e.target.value)) {
            setInput({
                ...input,
                countries: [...input.countries, e.target.value]
            })
        }
    }

    function handleDelete(e) {
        setInput({
            ...input, 
            countries: input.countries.filter(el => el !== e)
        })
    }
    
    function handleUpdate(e) {
        e.preventDefault();
        const errorSaver = validate(input);
        setErrors(errorSaver);
        if(Object.values(errorSaver).length === 0) {
            dispatch(updateActivity(id, input));
            Swal.fire({
                title: "Editada",
                text: "La actividad ha sido editada con exito!",
                icon: "success",
                confirmButtonText: 'Return to home',
                confirmButtonColor: "#4d1a5a",
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
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/veract");
                    setInput({
                        name: "",
                        difficulty: "",
                        duration: "",
                        season: "",
                        countries: []
                    });
                };
            });
        };
    };


    return (
        <div className="create-bg">
            <Link to="/home">
                <button className="btncreate animate__animated animate__heartBeat animate__infinite animate__slower">
                    Volver
                </button>
            </Link>
            <form className="form-container" onSubmit={(e) => handleUpdate(e)}>
                <h1 className="form-title">Edita tu Actividad Turística</h1>
                <div>
                    <div className="label-container">
                        <label>Nombre : &nbsp; &nbsp; &nbsp;</label>
                        <input 
                            className="input-name"
                            text="text" 
                            required
                            name="name" 
                            placeholder="Nombre de la actividad"
                            value={input.name} 
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="div-error">
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                </div>
                <div>
                    <div className="label-container">
                        <label>Dificultad : &nbsp; &nbsp; &nbsp;</label>
                        <select 
                            className="form-select" 
                            name="difficulty"
                            value={input.difficulty} 
                            onChange={(e) => handleChange(e)}
                        >
                            <option hidden>Dificultad...</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                    <div className="div-error">
                        {errors.difficulty && <p className="error">{errors.difficulty}</p>}
                    </div>
                </div>

                <div>
                    <div className="label-container">
                        <label>Duración: &nbsp; &nbsp; &nbsp;</label>
                        <select 
                            className="form-select" 
                            name="duration"
                            value={input.duration} 
                            onChange={(e) => handleChange(e)}
                        >
                            <option hidden>Duration...</option>
                            <option value={'1hr'}>1 hr</option>
                            <option value={'2hs'}>2 hs</option>
                            <option value={'3hs'}>3 hs</option>
                            <option value={'4hs'}>4 hs</option>
                            <option value={'5hs'}>5 hs</option>
                            <option value={'6hs'}>6 hs</option>
                            <option value={'7hs'}>7 hs</option>
                            <option value={'8hs'}>8 hs</option>
                            <option value={'9hs'}>9 hs</option>
                            <option value={'10hs'}>10 hs</option>
                            <option value={'11hs'}>11 hs</option>
                            <option value={'12hs'}>12 hs</option>
                        </select>
                    </div>
                    <div className="div-error">
                        {errors.duration && <p className="error">{errors.duration}</p>}
                    </div>
                </div>

                <div>
                    <div className="label-container">
                        <label>Temporada: &nbsp; &nbsp; &nbsp;</label>
                        <select 
                            className="form-select"
                            name="season"
                            value={input.season} 
                            onChange={(e) => handleChange(e)}
                        >
                            <option hidden>Season...</option>
                            <option value={'Summer'}>Verano</option>
                            <option value={'Fall'}>Otoño</option>
                            <option value={'Winter'}>Invierno</option>
                            <option value={'Spring'}>Primavera</option> 
                        </select>
                    </div>
                    <div className="div-error">
                        {errors.season && <p className="error">{errors.season}</p>}
                    </div>
                </div>

                <div className="label-container">
                    <label>Países: &nbsp; &nbsp; &nbsp;</label>
                    <select className="form-select" onChange={(e) => handleSelect(e)}>
                        <option hidden>País...</option>
                        {countries.map(c => (
                            <option value={c.id} key={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className="item-country">
                    {input.countries.map(e => (
                        <div className="p-items" key={e}>
                            <p className="input-country-name">{e}</p>
                            <div 
                                className="div-btn-remove" 
                                onClick={() => handleDelete(e)}
                            >
                                <img src={remove} alt="icon_remove" weight="24px" height="24px" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="div-create-btn">
                    <button 
                        className="btncreate animate__animated animate__pulse animate__infinite animate__slow" 
                        type="submit"
                        disabled={input.countries.length < 1 ? true : false}
                        onClick={(e) => handleUpdate(e)}
                    >
                        EDITAR ACTIVIDAD
                    </button>
                </div>

                {(Object.values(errors).length !== 0) &&
                    <p className="p-errors">
                        Completa los campos correctamente para editar tu Actividad
                    </p> 
                }
            </form>
        </div>
    )
}