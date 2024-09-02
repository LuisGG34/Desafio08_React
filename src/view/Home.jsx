import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import CardPizza from "../components/CardPizza";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [listaPizzas, setListaPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const agregarAlCarrito = (id) => {
        const pizzaAgregada = listaPizzas.find((pizza) => pizza.id === id)

        setCarrito([...carrito,pizzaAgregada]); //spread operator usar como base un arreglo y agregar elementos a el
   
    }

    // Llamamos a la función consultarApi al momento de montar el componente
    useEffect(() => {
        consultarApi();
    }, []);

    // Función que consulta la API
    const consultarApi = async () => {
        try {
        const url = "http://localhost:5000/api/pizzas";
        const response = await fetch(url);

        // Verificamos si la respuesta es exitosa (código 2xx)
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setListaPizzas(data); // Actualizamos el estado con los datos recibidos
        } catch (err) {
        setError(err.message); // Establecemos el error en el estado
        } finally {
        setLoading(false); // Terminamos la carga, sea exitosa o no
        }
    };

    // Renderizamos el componente dependiendo del estado
    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    
    return (
        <>
            <Header/>
            <div className="container mt-4">
                <div className="row">
                        {listaPizzas.map((pizza, index) => (
                            <div className="col-md-4 mb-4">
                                <CardPizza 
                                    key ={`pg-principal-${pizza.id}-${index}`} 
                                    pizza = {pizza}
                                    agregarAlCarrito={agregarAlCarrito}
                                />
                            </div>
                        ))}
                    
                </div>
            </div>
        </>
    );
};

export default Home;
