import axios from "axios";
import Swal from 'sweetalert2';

export function getCountries(){
    return async function(dispatch) {
        try {
            const json = await axios.get("/countries");
            return dispatch({
                type: "GET_COUNTRIES",
                payload: json.data
            });
        } catch (error) {
            console.log(error);
        }
    }
};

export function getCountryName(name) {
    return async function(dispatch) {
        try {
            const json = await axios.get(`/countries?name=${name}`);
            return dispatch({
                type: "GET_COUNTRY_NAME",
                payload: json.data
            }); 
        } catch(error) {
            console.log(error);
            Swal.fire({
                title: "No encontrado",
                text: "El país no se encontró!",
                icon: "error",
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
        }
    }
};

export function getDetails(id) {
    return async function(dispatch) {
        try {
            const json = await axios.get(`/countries/${id}`);
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            })
        } catch(error){
            console.log(error);
            Swal.fire({
                title: "No encontrado",
                text: "El detalle del país no se encontró!",
                icon: "error",
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
        }
    }
};

export function getActDetails(id) {
    return async function(dispatch) {
        try {
            const json = await axios.get(`/activities/${id}`);
            return dispatch({
                type: "GET_ACT_DETAIL",
                payload: json.data
            })
        } catch(error){
            console.log(error);
            Swal.fire({
                title: "No encontrado",
                text: "El detalle de la actividad no se encontró!",
                icon: "error",
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
        }
    }
};

export function clearDetail() {
    return {
        type: "CLEAR_DETAIL",
        payload: []
    }
};

export function deleteCountryOrAct(id, payload) {
    return async function(dispatch) {
        try {
            const json = await axios.put(`/countries/${id}`, payload);
            return dispatch({
                type: "DELETE_COUNTRY_ACT",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export function getActivities() {
    return async function(dispatch) {
        try {
            const json = await axios.get("/activities");
            return dispatch({
                type: "GET_ACTIVITIES",
                payload: json.data
            })
        } catch(error){
            console.log(error);
        }
    }
};

export function postActivity(payload) {
    return async function(dispatch) {
        try {
            const json = await axios.post("/activities", payload);
            return dispatch({
                type: "POST_ACTIVITY",
                payload: json.data
            })
        } catch(error){
            console.log(error);
        }
    }
};

export function updateActivity(id, payload) {
    return async function(dispatch) {
        try {
            const json = await axios.put(`/activities/${id}`, payload)
            return dispatch({
                type: "UPDATE_ACITVITY",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export function filterByActivity(payload){
    return {
        type: "FILTER_ACTIVITY",
        payload
    }
}

export function filterByContinent(payload){
    return {
        type: "FILTER_BY_CONTINENT",
        payload
    }
};

export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    }
};

export function orderByPopulation(payload){
    return {
        type: "ORDER_BY_POPULATION",
        payload
    }
};

export function setPaginado(payload){
    return {
        type: "SET_PAGINADO",
        payload
    }
};

export function setPaginado1(payload){
    return {
        type: "SET_PAGINADO1",
        payload
    }
};


