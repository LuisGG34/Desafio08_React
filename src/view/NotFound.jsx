import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>404 - Página no encontrada</h1>
      <p>¡Ups! Parece que la página que buscas no existe.</p>
      <Link to="/">
      <button className="btn btn-danger btn-lg">
        Volver al Inicio!!!
      </button>
      </Link>
    </div>
  );
};

export default NotFound