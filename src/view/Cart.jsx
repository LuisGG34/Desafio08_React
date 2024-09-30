import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CarritoContext } from '../context/CarritoContext';
import { UserContext } from '../context/UserContext';

const Cart = () => {
    const { listaPizzas, totalCarrito,carrito, aumentarCantidad, disminuirCantidad, agregarAlCarrito } = useContext(CarritoContext);
    const { token, handleCheckout, mensaje, setMensaje } = useContext(UserContext); // Usar handleCheckout y mensaje del UserContext

    return (
        <>
            {mensaje && <div className="alert alert-info">{mensaje}</div>}

            {carrito.length > 0 ? (
                <>
                    <h3 className="highlighted-text">Productos en tu carrito:</h3>
                    <h4 className="highlighted-text">Total: ${totalCarrito.toFixed(2)}</h4>

                    {/* Botón Pagar que llama a handleCheckout */}
                    {token && (
                        <button className="btn btn-primary" onClick={handleCheckout}>
                            Pagar
                        </button>
                    )}
                </>
            ) : (
                <h3 className="highlighted-text">El carrito está vacío</h3>
            )}

            <div className="container">
                <div className="row">
                    {carrito.map((pizzaCarrito) => (
                        <div key={`carrito-${pizzaCarrito.uniqueId}`} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={pizzaCarrito.img} className="card-img-top" alt={pizzaCarrito.name} />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{pizzaCarrito.name}</h5>
                                    <h5 className="card-title">${pizzaCarrito.price.toFixed(2)}</h5>
                                    <h5 className="card-title">Cantidad: {pizzaCarrito.cantidad}</h5>
                                </div>
                                <div className='d-grid gap-3 justify-content-around d-flex'>
                                    <button className="btn btn-dark" onClick={() => aumentarCantidad(pizzaCarrito.uniqueId)}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
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
                {listaPizzas.map((pizza) => (
                    <div key={`principal-${pizza.id}`} className="col-md-4 mb-4">
                        <div className="card" style={{ width: "18rem" }}>
                            <img src={pizza.img} className="card-img-top" alt={pizza.name} />
                            <div className="card-body text-center">
                                <h5 className="card-title">{pizza.name}</h5>
                                <h5 className="fs-6 fw-light">${pizza.price.toFixed(2)}</h5>
                            </div>
                            <div className="d-flex justify-content-around align-items-center mb-3">
                                <button className="btn btn-dark" onClick={() => agregarAlCarrito(pizza.id)}>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    Añadir
                                </button>
                            </div>
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









