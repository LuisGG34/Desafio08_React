import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCartShopping, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';  // Asegúrate de importar PropTypes

const CardPizza = ({ pizza: { name, price, img, ingredients,id },agregarAlCarrito}) => {
    return (
        <>
        <div className="card" style={{ width: "18rem" }}>
            <img src={img} className="card-img-top" alt={name} />
            <div className="card-body text-center">
                <h5 className="card-title">{name}</h5>
            </div>
            <h5 className="fs-6 fw-light text-center">Ingredientes:</h5>
            <ul className="list-group list-group-flush text-center">
                {ingredients.map((ingredient, index) => (
                    <li key={index} className="list-group-item">
                        <FontAwesomeIcon icon={faPizzaSlice}/> {ingredient}
                    </li>
                ))}
                <li className="list-group-item fs-4">Precio: ${price}</li>
            </ul>
            <div className='d-grid gap-3 justify-content-around d-flex'>
                <button className="btn btn-secondary">
                    <FontAwesomeIcon icon={faEye} />
                    Ver Mas
                </button>
                <button className="btn btn-dark" onClick={() => agregarAlCarrito(id)}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    Añadir
                </button>
            </div>
        </div>
        </>
    );
};

CardPizza.propTypes = {
    pizza: PropTypes.shape({
        id: PropTypes.string.isRequired, 
        name: PropTypes.string.isRequired, 
        price: PropTypes.number.isRequired, 
        img: PropTypes.string.isRequired, 
    }).isRequired,
    agregarAlCarrito: PropTypes.func,
    eliminarDelCarrito: PropTypes.func,
};

export default CardPizza;

