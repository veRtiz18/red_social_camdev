import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TituloUsuario = ({ userId }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/usuarios/${userId}`);
                setUsuario(response.data);
            } catch (error) {
                console.error('Error fetching the user data', error);
            }
        };

        fetchUsuario();
    }, [userId]);

    if (!usuario) {
        return <div>Loading...</div>;
    }

    return (

        <span className='text-color-camdev'>{usuario.nombre_usuario} {usuario.ap1} {usuario.ap2}</span>

    );
};

export default TituloUsuario;
