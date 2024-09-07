import { createContext, useContext, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import { PizzaContext } from "./PizzaContext";

export const CarritoContext = createContext({});

export const CarritoProvider = ({children}) => {

    const {listaPizzas,setListaPizzas} = useContext(PizzaContext);

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
        <CarritoContext.Provider value={{listaPizzas,carrito,setCarrito,totalCarrito,aumentarCantidad, disminuirCantidad, agregarAlCarrito}}>
            {children}
        </CarritoContext.Provider>
    );
};
