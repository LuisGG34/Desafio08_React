import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = ({onLogout }) => {
  return (
    <div>
      <h1>Profile</h1>
      <p>luis@gmail.com</p>
      <button onClick={onLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Profile