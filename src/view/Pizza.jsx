import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCartShopping, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pizza = () => {
    const [pizzas, setPizzas] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarDescripcion, setMostrarDescripcion] = useState(false); // Estado para controlar la visibilidad de la descripción

    // Llamamos a la función consultarApi al momento de montar el componente
    useEffect(() => {
        consultarApi();
    }, []);

    // Función que consulta la API
    const consultarApi = async () => {
        try {
            const url = "http://localhost:5000/api/pizzas/p001";
            const response = await fetch(url);

            // Verificamos si la respuesta es exitosa (código 2xx)
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setPizzas(data); // Actualizamos el estado con los datos recibidos
        } catch (err) {
            setError(err.message); // Establecemos el error en el estado
        } finally {
            setLoading(false); // Terminamos la carga, sea exitosa o no
        }
    };

    // Función que muestra u oculta la descripción
    const verDescripcion = () => {
        setMostrarDescripcion(!mostrarDescripcion); // Cambiamos el estado para mostrar u ocultar la descripción
    };

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={pizzas.img} className="card-img-top" alt={pizzas.name} />
            <div className="card-body text-center">
                <h5 className="card-title">{pizzas.name}</h5>
            </div>
            <h5 className="fs-6 fw-light text-center">Ingredientes:</h5>
            <ul className="list-group list-group-flush text-center">
                {pizzas.ingredients?.map((ingredient, index) => (
                    <li key={index} className="list-group-item">
                        <FontAwesomeIcon icon={faPizzaSlice} /> {ingredient}
                    </li>
                ))}
                <li className="list-group-item fs-4">Precio: ${pizzas.price}</li>
            </ul>
            <div className='d-grid gap-3 justify-content-around d-flex'>
                <button className="btn btn-secondary" onClick={verDescripcion}>
                    <FontAwesomeIcon icon={faEye} />
                    Ver Más
                </button>
                <button className="btn btn-dark" onClick={() => agregarAlCarrito(id)}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    Añadir
                </button>
            </div>
            {mostrarDescripcion && (
                <div className="card-body">
                    <p className="card-text">{pizzas.desc}</p>
                </div>
            )}
        </div>
    );
};

export default Pizza;
