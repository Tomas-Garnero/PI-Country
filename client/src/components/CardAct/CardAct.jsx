import { Link } from "react-router-dom";
import "./CardAct.css";

export default function CardAct({ name, difficulty, duration, season, id, countries }) {

    return (
        <div className="activity_card">
            <Link to={`/updateact/${id}`} className="link_act">
                <h5 className="act_edit">EDITAR</h5>
            </Link>
            <div className="card-act">
                <h3 className="act_name">{name}</h3>
                <div className="div-continent">
                    <p className="countrycont">Dificultad: &nbsp; &nbsp; {difficulty}</p>
                    <p className="countrycont">Duración: &nbsp; &nbsp; {duration}</p>
                </div>
                <h4 className="act_season">Temporada: &nbsp; &nbsp; {season}</h4>
                <div className="act-div-container" >
                    {countries.map(c => (
                        <span className="act_country" key={c.id}>[ {c.id} ]</span>
                    ))}
                </div>
            </div>
        </div>
    )
}