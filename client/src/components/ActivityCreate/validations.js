export default function Validate(input) {

    let errors = {};

    if(!input.name) {
        errors.name = "Un nombre de actividad es necesario en esta casilla";
    }

    if(!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(input.name)) {
        errors.name = "No debe contener números o caracteres especiales";
    }

    if (!input.difficulty) {
        errors.difficulty = "Debe marcar una dificultad";
    }

    if (!input.duration) {
        errors.duration = "Debe marcar una duración";
    }

    if (!input.season) {
        errors.season = "Debe marcar una temporada";
    }

    if (!input.countries) {
        errors.countries = "Debe agregar al menos un país";
    }

    return errors
}
