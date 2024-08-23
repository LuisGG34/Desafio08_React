// Register.jsx
import React, { useState } from 'react';
import AlertComponent from './AlertComponent'; // Importa el componente AlertComponent
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertProps, setAlertProps] = useState(null);

    const validateForm = (e) => {
        e.preventDefault(); // Evita que el formulario se envíe y recargue la página

        if (email === "" || password === "" || confirmPassword === "") {
            setAlertProps({ title: 'Error', text: 'Por favor completa todos los campos', icon: 'error' });
        } else {
            const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const emailValidate = pattern.test(email);

            if (!emailValidate) {
                setAlertProps({ title: 'Error', text: 'El email ingresado no es válido', icon: 'error' });
            } else if (password.length < 6) {
                setAlertProps({ title: 'Error', text: 'La contraseña debe tener al menos 6 caracteres', icon: 'error' });
            } else if (password !== confirmPassword) {
                setAlertProps({ title: 'Error', text: 'Las contraseñas no coinciden', icon: 'error' });
            } else {
                setAlertProps({ title: '¡Éxito!', text: 'Tu operación se completó exitosamente', icon: 'success' });
            }
        }
    };

    return (
        <>
            {alertProps && <AlertComponent {...alertProps} />} {/* Renderiza la alerta si alertProps está definido */}
            <form onSubmit={validateForm}>
                <h3>Formulario de Registro</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Dirección de correo electrónico</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
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
                        placeholder="*******" 
                        value={password} 
                        onInput={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPass" className="form-label">Confirmar Contraseña</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="confirmPass" 
                        placeholder="*******" 
                        value={confirmPassword} 
                        onInput={(e) => setConfirmPassword(e.target.value)} 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </>
    );
};

export default Register;

