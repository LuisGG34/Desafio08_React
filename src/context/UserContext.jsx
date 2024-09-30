import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { CarritoContext } from './CarritoContext'; // Asegúrate de importar el contexto del carrito

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [profileData, setProfileData] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const { carrito } = useContext(CarritoContext); // Obtener el carrito del contexto de Carrito

    const logout = () => {
        setToken('');
        setEmail('');
        setPassword(''); // Limpiar la contraseña al salir
        navigate('/login');
    };

    const handleSubmitLogin = async () => {
        setLoading(true);
        setError(''); // Limpia el error al comenzar

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
                setPassword(''); // Limpiar la contraseña al iniciar sesión
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
        setError(''); // Limpia el error al comenzar
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el registro');
            }

            const data = await response.json();
            console.log(data); // Maneja la respuesta si el registro es exitoso
        } catch (error) {
            console.error('Error en el registro:', error.message);
            setError(error.message); // Manejo de errores durante el registro
        }
    };

    const handleCheckout = async () => {
        setMensaje('');
        console.log(carrito)
        if (!carrito || carrito.length === 0) {
            setMensaje('El carrito está vacío.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ cart: carrito }),
            });

            if (!response.ok) {
                throw new Error('Error al procesar la compra.');
            }

            const data = await response.json();
            setMensaje('Compra realizada con éxito.');
        } catch (error) {
            setMensaje(`Error: ${error.message}`);
        }
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
        handleCheckout,
        loading,
        error,
        mensaje,
        setEmail,
        setPassword,
        email,
        password,
        profileData,
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


