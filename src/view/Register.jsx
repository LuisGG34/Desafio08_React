import React, { useState, useContext } from 'react';
import AlertComponent from '../components/AlertComponent'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; 
import { UserContext } from '../context/UserContext';

const Register = () => {
    const { setEmail, setPassword, handleSubmit_register, loading, error } = useContext(UserContext);
    const [confirmPassword, setConfirmPassword] = useState(''); // Confirmar contraseña
    const [password, setPasswordLocal] = useState(''); // Contraseña
    const [email, setEmailLocal] = useState(''); // Estado local para el email
    const [alertProps, setAlertProps] = useState(null); 
    const navigate = useNavigate();

    const validateForm = (e) => {
        e.preventDefault(); 

        // Verifica que los campos no estén vacíos
        if (!email || !password || !confirmPassword) {
            setAlertProps({ title: 'Error', text: 'Por favor completa todos los campos', icon: 'error' });
            return false;
        }

        // Validación de formato de correo
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailValidate = pattern.test(email);

        if (!emailValidate) {
            setAlertProps({ title: 'Error', text: 'El email ingresado no es válido', icon: 'error' });
            return false;
        }

        // Verifica que la contraseña tenga al menos 6 caracteres
        if (password.length < 6) {
            setAlertProps({ title: 'Error', text: 'La contraseña debe tener al menos 6 caracteres', icon: 'error' });
            return false;
        }

        // Verifica que las contraseñas coincidan
        if (password !== confirmPassword) {
            setAlertProps({ title: 'Error', text: 'Las contraseñas no coinciden', icon: 'error' });
            return false;
        }

        return true;
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm(e);
        if (isFormValid) {
            console.log("Email:", email);
            console.log("Password:", password);
            setEmail(email); // Actualiza el email en el contexto
            setPassword(password); // Establece la contraseña desde el estado local
            
            const result = await handleSubmit_register(); // Llama a la función de registro desde el contexto
            
            // Verifica si el registro fue exitoso
            if (result) {
                setAlertProps({ title: 'Éxito', text: 'Usuario registrado con éxito', icon: 'success' });
                navigate('/login'); // Redirige al login si es necesario
            } else {
                setAlertProps({ title: 'Error', text: 'Error al registrar el usuario', icon: 'error' });
            }
        }
    };

    return (
        <>
            {alertProps && <AlertComponent {...alertProps} />} 
            <form className="highlighted-text">
                <h3>Formulario de Registro</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Dirección de correo electrónico</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        value={email} // Agrega el valor del estado local
                        onChange={(e) => setEmailLocal(e.target.value)} // Actualiza el estado local
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="*******" 
                        value={password} // Usa el valor del estado local para la contraseña
                        onChange={(e) => setPasswordLocal(e.target.value)} // Actualiza el estado local de la contraseña
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
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                </div>
                <button onClick={handleClick} className="btn btn-primary" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>
                {error && <p className="text-danger">{error}</p>} {/* Muestra errores desde el contexto */}
            </form>
        </>
    );
};

export default Register;






