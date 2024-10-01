import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CarritoContext } from '../context/CarritoContext';
import { UserContext } from '../context/UserContext';

const Cart = () => {
    const { listaPizzas, totalCarrito, carrito, aumentarCantidad, disminuirCantidad, agregarAlCarrito } = useContext(CarritoContext);
    const { token } = useContext(UserContext); // Obtener token del UserContext
    const [mensaje, setMensaje] = useState(''); // Estado local para el mensaje

    const handleCheckout = async () => {
        setMensaje(''); // Resetea el mensaje al iniciar el checkout
        if (!carrito || carrito.length === 0) {
            setMensaje('El carrito está vacío.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/checkouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,  // Token correcto
                },
                body: JSON.stringify({ cart: carrito }),  // Cuerpo con cart
            });

            if (!response.ok) {
                throw new Error('Error al procesar la compra.');
            }

            const data = await response.json();
            setMensaje('Compra realizada con éxito.');
            console.log(mensaje);
            alert("compra exitosa");

            // Limpia el carrito después de mostrar el mensaje
            setTimeout(() => {
                setMensaje(''); // Limpia el mensaje después de 6 segundos
            }, 6000);
        } catch (error) {
            setMensaje(`Error: ${error.message}`);
            setTimeout(() => {
                setMensaje('');
            }, 3000);
        }
    };

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
                                <h5 className="card-title">${pizza.price.toFixed(2)}</h5>
                                <button className="btn btn-primary" onClick={() => agregarAlCarrito(pizza)}>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Cart;











