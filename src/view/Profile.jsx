import React, { useState }  from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import fotoLuis from '../assets/img/fotoLuis.png'; // Importa la imagen correctamente

const Profile = ({onLogout }) => {

  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    nombre: 'Luis Andres Gutierrez Gonzalez',
    correo: 'luis.gutierrezgo@mail.udp.cl',
    edad: 36,
    sexo: 'Masculino',
    foto: fotoLuis,
  });

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión...');
  };


  return (
    <div className="perfil-container">
      <img src={profileData.foto} alt="Foto de perfil" className="perfil-foto" />
      
      {editMode ? (
        <div>
          <input
            type="text"
            name="nombre"
            value={profileData.nombre}
            onChange={handleChange}
          />
          <input
            type="email"
            name="correo"
            value={profileData.correo}
            onChange={handleChange}
          />
          <input
            type="number"
            name="edad"
            value={profileData.edad}
            onChange={handleChange}
          />
          <select
            name="sexo"
            value={profileData.sexo}
            onChange={handleChange}
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      ) : (
        <div>
          <h2>{profileData.nombre}</h2>
          <p>Correo: {profileData.correo}</p>
          <p>Edad: {profileData.edad}</p>
          <p>Sexo: {profileData.sexo}</p>
        </div>
      )}

      <div>
        <button onClick={handleLogout}>Cerrar Sesión</button>
        <button onClick={handleEdit}>{editMode ? 'Guardar' : 'Editar'}</button>
      </div>
    </div>
  );
};

export default Profile