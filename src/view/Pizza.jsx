import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCartShopping, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CarritoContext } from '../context/CarritoContext';

const Pizza = () => {
    const { id } = useParams();
    const { agregarAlCarrito } = useContext(CarritoContext);
    
    const [pizza, setPizza] = useState({});
    const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función que muestra u oculta la descripción
    const verDescripcion = () => {
        setMostrarDescripcion(!mostrarDescripcion);
    };

    useEffect(() => {
        consultarApiDetalle();
    }, [id]);

    // Función que consulta la API por ID
    const consultarApiDetalle = async () => {
        try {
            const url = `http://localhost:5000/api/pizzas/${id}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setPizza(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="card" style={{ width: "18rem" }}>
            {pizza.img && <img src={pizza.img} className="card-img-top" alt={pizza.name} />}
            <div className="card-body text-center">
                <h5 className="card-title">{pizza.name}</h5>
            </div>
            <h5 className="fs-6 fw-light text-center">Ingredientes:</h5>
            <ul className="list-group list-group-flush text-center">
                {pizza.ingredients?.map((ingredient, index) => (
                    <li key={index} className="list-group-item">
                        <FontAwesomeIcon icon={faPizzaSlice} /> {ingredient}
                    </li>
                ))}
                <li className="list-group-item fs-4">Precio: ${pizza.price}</li>
            </ul>
            <div className='d-grid gap-3 justify-content-around d-flex'>
                <button className="btn btn-secondary" onClick={verDescripcion}>
                    <FontAwesomeIcon icon={faEye} /> Ver Más
                </button>
                <button className="btn btn-dark" onClick={() => agregarAlCarrito(pizza.id)}>
                    <FontAwesomeIcon icon={faCartShopping} /> Añadir
                </button>
            </div>
            {mostrarDescripcion && (
                <div className="card-body">
                    <p className="card-text">{pizza.desc}</p>
                </div>
            )}
        </div>
    );
};

export default Pizza;

