// comando para crear un componente rapido rafce

import React, { useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CarritoContext } from '../context/CarritoContext';

const Cart = () => {
    
    const {listaPizzas,carrito,totalCarrito,aumentarCantidad, disminuirCantidad, agregarAlCarrito} = useContext(CarritoContext)

    return (
        <>  
            {/* Mostrar el título solo si el carrito tiene elementos */}
            {carrito.length > 0 && (

            <>
                <h3 className="highlighted-text">Productos en tu carrito:</h3>
                <h4 className="highlighted-text">Total: ${totalCarrito.toFixed(2)}</h4> {/* Mostrar el total formateado */}
                <button className="btn btn-primary">Pagar</button> {/* Botón Pagar */}
            </>
            )}
            
            <div className="container">
                <div className="row">
                    {/* Mapeo de las pizzas en el carrito */}
                    {carrito.map((pizzaCarrito) => (
                        <div key={`carrito-${pizzaCarrito.uniqueId}`} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={pizzaCarrito.img} className="card-img-top" alt={pizzaCarrito.name} />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{pizzaCarrito.name}</h5>
                                    <h5 className="card-title">${pizzaCarrito.price}</h5>
                                    <h5 className="card-title">Cantidad: {pizzaCarrito.cantidad}</h5>
                                </div>
                                <div className='d-grid gap-3 justify-content-around d-flex'>
                                    {/* Botón para aumentar la cantidad */}
                                    <button className="btn btn-dark" onClick={() => aumentarCantidad(pizzaCarrito.uniqueId)}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                    {/* Botón para disminuir la cantidad */}
                                    <button className="btn btn-dark" onClick={() => disminuirCantidad(pizzaCarrito.uniqueId)}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <h3 className="highlighted-text">¡Escoge tu pizza preferida!</h3>
            <div className="row">
                {/* Mapeo de la lista principal de pizzas */}
                {listaPizzas.map((pizza, index) => (
                    <div key={`principal-${pizza.id}`} className="col-md-4 mb-4">
                        <div className="card" style={{ width: "18rem" }}>
                            <img src={pizza.img} className="card-img-top" alt={pizza.name} />
                            <div className="card-body text-center">
                                <h5 className="card-title">{pizza.name}</h5>
                                <h5 className="fs-6 fw-light">${pizza.price}</h5>
                            </div>
                            <div className="d-flex justify-content-around align-items-center mb-3">
                                {/* Botón para añadir una pizza al carrito */}
                                <button className="btn btn-dark" onClick={() => agregarAlCarrito(pizza.id)}>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    Añadir
                                </button>
                            </div>
                            {/* Mostrar la cantidad en el carrito si la pizza ya ha sido añadida */}
                            {carrito.find(p => p.id === pizza.id) && (
                                <div className="text-center mb-3">
                                    <h6>Cantidad en el carrito: {carrito.find(p => p.id === pizza.id).cantidad}</h6>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Cart;




