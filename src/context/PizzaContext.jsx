import { createContext, useState, useEffect } from "react";

export const PizzaContext = createContext({});

export const PizzaProvider = ({children}) => {
    const [listaPizzas, setListaPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <PizzaContext.Provider value={{listaPizzas,setListaPizzas, loading, setLoading, error,setError}}>
            {children}
        </PizzaContext.Provider>
    );
}

