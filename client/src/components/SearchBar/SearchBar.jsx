import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { getCountryName, setPaginado } from "../../Redux/Actions";
import "./SearchBar.css";

export default function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if (name !== ""){
            dispatch(getCountryName(name));
            dispatch(setPaginado({current: 1}));
            setName("");
        } else {
            Swal.fire({
                title: "Falta nombre",
                text: "Debe ingresar un país",
                icon: "warning",
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
            })
        }
    }

    return (
        <div className="div-search">
            <input
                className="input-search"
                type="text"
                placeholder="   Buscar..." 
                value={name}
                onChange={(e) => handleInputChange(e)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            />
            <button 
                className="btn-search" 
                type="submit" 
                onClick={(e) => handleSubmit(e)}
            >
                BUSCAR
            </button>
        </div>
    )
}