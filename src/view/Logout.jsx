import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';

const Logout = () => {

    const {logout} = useContext(UserContext);

  return (
    <>
    <div>Presionar el Boton para cerrar la sesión</div>
    <button onClick={logout}>Cerrar Sesión</button>
    </>
  )
}

export default Logout