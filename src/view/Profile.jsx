import React, { useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../context/UserContext';

const Profile = ({ onLogout }) => {
  const { token, logout, profileData } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [profileEmail, setProfileEmail] = useState('');

  useEffect(() => {
    // Cargar el email del profileData cuando se inicie sesión
    if (profileData && profileData.email) {
      setProfileEmail(profileData.email);
    }
  }, [profileData]); // Añadir profileData a las dependencias

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setProfileEmail(value);
  };

  const handleSave = async () => {
    // Aquí podrías enviar los cambios al servidor si fuera necesario
    try {
      const response = await fetch('http://localhost:5000/api/auth/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: profileEmail }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }

      setEditMode(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="perfil-container">
      {editMode ? (
        <div>
          <input
            type="email"
            name="correo"
            value={profileEmail}
            onChange={handleChange}
            placeholder="Correo"
          />
        </div>
      ) : (
        <div>
          <p>Correo: {profileEmail}</p>
        </div>
      )}

      <div>
        <button onClick={onLogout || logout}>Cerrar Sesión</button>
        <button onClick={editMode ? handleSave : handleEdit}>
          {editMode ? 'Guardar' : 'Editar'}
        </button>
      </div>
    </div>
  );
};

export default Profile;


