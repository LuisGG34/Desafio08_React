import React, { useState, useContext } from 'react';
import AlertComponent from '../components/AlertComponent'; // Importa el componente AlertComponent
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../context/UserContext'; // Importa el UserContext
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { handleSubmitLogin, loading, error, setEmail, setPassword, email, password } = useContext(UserContext);
    const [alertProps, setAlertProps] = useState(null);
    const navigate = useNavigate();

    const validateForm = () => {
        if (email === "" || password === "") {
            setAlertProps({ title: 'Error', text: 'Por favor completa todos los campos', icon: 'error' });
            return false;
        }
    
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailValidate = pattern.test(email);
    
        if (!emailValidate) {
            setAlertProps({ title: 'Error', text: 'El email ingresado no es válido', icon: 'error' });
            return false;
        } else if (password.length < 6) {
            setAlertProps({ title: 'Error', text: 'La contraseña debe tener al menos 6 caracteres', icon: 'error' });
            return false;
        }
    
        setAlertProps({ title: '¡Éxito!', text: 'Formulario validado correctamente', icon: 'success' });
        return true;
    };

    const handleClick = async (e) => {
        e.preventDefault(); // Evitar la recarga de la página
        const isFormValid = validateForm();
        if (isFormValid) {
            await handleSubmitLogin(); // Cambiado a handleSubmitLogin
            if (!error) { // Redirecciona solo si no hay error
                navigate('/profile'); // Redirecciona al perfil si el login es exitoso
            }
        }
    };

    return (
        <>
            {alertProps && <AlertComponent {...alertProps} />} {/* Renderiza la alerta si alertProps está definido */}
            <form className="highlighted-text">
                <h3>Login</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Dirección de correo electrónico</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="emailHelp" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder='*******' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button onClick={handleClick} className="btn btn-primary" disabled={loading}>
                    {loading ? 'Cargando...' : 'Login'}
                </button>
                {error && <p className="text-danger mt-3">{error}</p>} {/* Mostrar mensaje de error si ocurre */}
            </form>
        </>
    );
};

export default Login;

