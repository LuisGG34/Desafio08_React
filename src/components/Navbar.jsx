import React,{ useContext, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CarritoContext } from '../context/CarritoContext';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    
    const {totalCarrito} = useContext(CarritoContext);
    const {token, setToken} = useContext(UserContext);
    const total = totalCarrito;
    const formattedTotal = total.toLocaleString('es-ES');

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid bg-danger">
                <NavLink className={({ isActive }) =>
                                        isActive ? "navbar-brand is-active" : "navbar-brand"
                                    } to="/">¡Pizzería El Sabor de Luis!</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-start">
                    <li className="nav-item">
                        <NavLink className={({ isActive }) =>
                                        isActive ? "nav-link active is-active" : "nav-link active text-white"
                                    } aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) =>
                                        isActive ? "nav-link is-active" : "nav-link text-white"
                                    } to={token ? "/profile" : "/login"}>{token ? "Profile" : "Login"}</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) =>
                                        isActive ? "nav-link is-active" : "nav-link text-white"
                                    } to={token ? "/logout" : "/register"}>{token ? "Logout" : "Register"}</NavLink>
                    </li>
                    <li className="nav-item ms-auto">
                        <NavLink className={({ isActive }) =>
                                        isActive ? "nav-link is-active" : "nav-link text-white"
                                    } aria-disabled="true" to="/cart"><FontAwesomeIcon icon={faCartShopping} /> Total: ${formattedTotal}</NavLink>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;