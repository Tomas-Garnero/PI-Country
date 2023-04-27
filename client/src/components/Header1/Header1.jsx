import {Link} from "react-router-dom";


export default function Header1() {

    return (
        <div className="header">
            <Link 
                to={"/home"} 
                className="link-header animate__animated animate__headShake animate__infinite animate__slow"
            >
                VOLVER A LOS PAÍSES
            </Link>
        </div>
    )
}