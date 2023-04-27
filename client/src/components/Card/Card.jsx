import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ flag_img, name, continent, id }) {

    return (
        <Link className="link" to={`/home/${id}`}>
            <div className="card">
                <img className="card-image" src={flag_img} alt="Country Flag" />
                <h3 className="countryname">{name}</h3>
                <div className="div-continent">
                    <p className="countrycont">Continent:</p>
                    <p className="countrycont-p">{continent}</p>
                </div>
            </div>
        </Link>
    )
};