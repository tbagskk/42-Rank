import './Header.css';
import logo from "../../assets/logo.png"

import Cookies from "js-cookie"
import { Link } from "react-router-dom"

export default function Header() {

    let logout = () => {
        Cookies.remove("id");
    }

    return (
        <>
            <div className="Header">
                <div className="logo_container">
                    <img className="logo" src={logo} alt="logo" ></img>
                </div>
                <div className="navbar_container">
                    <Link to="/login" onClick={logout} className="navbar_logout">Logout</Link>
                </div>
            </div>
        </>
    );
}
