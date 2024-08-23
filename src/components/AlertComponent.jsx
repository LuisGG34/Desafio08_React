import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const AlertComponent = ({ title, text, icon }) => {
    MySwal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'Aceptar'
    });
    
    return null; // Este componente no necesita renderizar nada
};

export default AlertComponent;