import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [profileData, setProfileData] = useState(null);
    const [carrito, setCarrito] = useState([]); // Estado del carrito
    const navigate = useNavigate();

    const logout = () => {
        setToken('');
        setEmail('');
        setPassword('');
        setCarrito([]); // Limpiar el carrito al salir
        navigate('/login');
    };

    const handleSubmitLogin = async () => {
        setLoading(true);
        setError('');

        const fields = { email, password };

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fields),
            });

            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            if (data.token) {
                setToken(data.token);
                setEmail(data.email);
                setPassword('');
                navigate('/profile');
            } else {
                setError('Contraseña o correo incorrectos');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitRegister = async () => {
        // Resetea el estado de error y comienza la carga
        setError('');
        setLoading(true);
    
        // Verificar que email y password no estén vacíos
        if (!email || !password) {
            setError('El email y la contraseña son obligatorios.');
            setLoading(false);
            return;
        }
    
        // Datos del usuario a enviar
        const userData = { email, password };
        console.log("Datos enviados:", userData); // Verificar datos enviados
    
        try {
            // Enviar solicitud al backend para registrar el usuario
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
    
            // Si la respuesta no es exitosa, lanzar un error
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el registro');
            }
    
            // Procesar la respuesta de la API
            const data = await response.json();
            console.log('Registro exitoso:', data);
    
            // Limpia los campos de email y password tras el registro exitoso
            setEmail('');
            setPassword('');
    
            // Opcional: Redirigir a otra página tras el registro exitoso, por ejemplo, al perfil o login
            navigate('/login');
        } catch (error) {
            console.error('Error en el registro:', error.message);
            setError(error.message);  // Mostrar mensaje de error en la UI
        } finally {
            // Finaliza el estado de carga
            setLoading(false);
        }
    };
    

    // Agregar un producto al carrito
    const agregarAlCarrito = (producto) => {
        setCarrito((prevCarrito) => {
            const existe = prevCarrito.find(item => item.id === producto.id);
            if (existe) {
                return prevCarrito.map(item =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...prevCarrito, { ...producto, cantidad: 1 }];
        });
    };

    // Aumentar la cantidad de un producto
    const aumentarCantidad = (id) => {
        setCarrito(prevCarrito =>
            prevCarrito.map(item =>
                item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
            )
        );
    };

    // Disminuir la cantidad de un producto
    const disminuirCantidad = (id) => {
        setCarrito(prevCarrito => {
            const producto = prevCarrito.find(item => item.id === id);
            if (producto.cantidad === 1) {
                return prevCarrito.filter(item => item.id !== id);
            }
            return prevCarrito.map(item =>
                item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
            );
        });
    };

    useEffect(() => {
        const getData = async () => {
            if (!token) return;
            try {
                const res = await fetch('http://localhost:5000/api/auth/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error(`Error en la petición: ${res.status} ${res.statusText}`);
                }

                const data = await res.json();
                setProfileData(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        getData();
    }, [token]);

    const value = {
        token,
        setToken,
        logout,
        handleSubmitLogin,
        handleSubmitRegister,
        loading,
        error,
        setEmail,
        setPassword,
        email,
        password,
        profileData,
        carrito, // Añadir carrito al contexto
        agregarAlCarrito,
        aumentarCantidad,
        disminuirCantidad,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};