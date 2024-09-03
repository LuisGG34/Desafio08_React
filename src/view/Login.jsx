import React, { useState } from 'react';
import AlertComponent from '../components/AlertComponent'; // Importa el componente AlertComponent
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertProps, setAlertProps] = useState(null);

    const validateForm = (e) => {
        e.preventDefault(); // Evita que el formulario se envíe y recargue la página

        if (email === "" || password === "") {
            setAlertProps({ title: 'Error', text: 'Por favor completa todos los campos', icon: 'error' });
        } else {
            const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const emailValidate = pattern.test(email);

            if (!emailValidate) {
                setAlertProps({ title: 'Error', text: 'El email ingresado no es válido', icon: 'error' });
            } else if (password.length < 6) {
                setAlertProps({ title: 'Error', text: 'La contraseña debe tener al menos 6 caracteres', icon: 'error' });
            } else {
                setAlertProps({ title: '¡Éxito!', text: 'Tu operación se completó exitosamente', icon: 'success' });
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
                        onInput={(e) => setEmail(e.target.value)} 
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
                        onInput={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button onClick={validateForm} className="btn btn-primary">Login</button>
            </form>
        </>
    );
};

export default Login;