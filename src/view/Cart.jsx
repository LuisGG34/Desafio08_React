// comando para crear un componente rapido rafce

import React, { useState } from 'react';
import { pizzas } from '../utils/pizzas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

const Cart = () => {
    // Estado para almacenar la lista de pizzas y el carrito de compras
    const [listaPizzas, setListaPizzas] = useState(pizzas);
    const [carrito, setCarrito] = useState([]);

    // Función para agregar una pizza al carrito
    const agregarAlCarrito = (id) => {
        // Buscar la pizza en la lista de pizzas usando el ID proporcionado
        const pizzaAgregada = listaPizzas.find((pizza) => pizza.id === id);
    
        // Verificar si la pizza ya está en el carrito
        const pizzaEnCarrito = carrito.find((pizza) => pizza.id === id);
    
        // Si la pizza no está en el carrito, se agrega
        if (!pizzaEnCarrito) {
            // Actualizar el estado del carrito con la nueva pizza
            // Se utiliza el spread operator para copiar el array actual del carrito
            // Se agrega una nueva pizza con un ID único y cantidad inicial de 1
            setCarrito([
                ...carrito, 
                { 
                    ...pizzaAgregada,        // Copia las propiedades de la pizza encontrada
                    uniqueId: uuidv4(),      // Asigna un identificador único a la pizza en el carrito
                    cantidad: 1              // Inicializa la cantidad en 1
                }
            ]);
        }
    };

    // Función para disminuir la cantidad de una pizza en el carrito
    // Si la cantidad llega a 0, se elimina la pizza del carrito
    const disminuirCantidad = (uniqueId) => {
        // Actualiza el estado del carrito basado en el estado previo
        setCarrito((estadoPrevio) =>
            // Mapear sobre el array de pizzas en el carrito
            estadoPrevio
                .map((pizza) =>
                    // Verificar si el ID único de la pizza coincide con el ID proporcionado
                    pizza.uniqueId === uniqueId
                        // Si coincide, disminuir la cantidad de esa pizza en el carrito
                        ? { ...pizza, cantidad: pizza.cantidad - 1 }
                        // Si no coincide, mantener la pizza sin cambios
                        : pizza
                )
                // Filtrar las pizzas para eliminar aquellas con cantidad menor o igual a 0
                .filter((pizza) => pizza.cantidad > 0)
        );
    };
    

    // Función para aumentar la cantidad de una pizza en el carrito
    const aumentarCantidad = (uniqueId) => {
        // Actualiza el estado del carrito basado en el estado previo
        setCarrito((estadoPrevio) =>
            // Mapear sobre el array de pizzas en el carrito
            estadoPrevio.map((pizza) =>
                // Verificar si el ID único de la pizza coincide con el ID proporcionado
                pizza.uniqueId === uniqueId
                    // Si coincide, aumentar la cantidad de esa pizza en el carrito
                    ? { ...pizza, cantidad: pizza.cantidad + 1 }
                    // Si no coincide, mantener la pizza sin cambios
                    : pizza
            )
        );
    };
    
     // Calcular el total del carrito
     const totalCarrito = carrito.reduce((total, pizza) => total + (pizza.price * pizza.cantidad), 0);

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




