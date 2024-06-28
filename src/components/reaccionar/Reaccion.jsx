import React, { useEffect, useState } from 'react';

const Reaccion = ({ idUsuario, idPublicacion }) => {
    const [totalReacciones, setTotalReacciones] = useState(0);
    const [reaccionada, setReaccionada] = useState(false);

    useEffect(() => {
        // Endpoint para obtener el conteo total de reacciones
        const urlTotalReacciones = `http://localhost:3000/api/v1/reacciones/reacciones_publicacion/${idPublicacion}`;
        // Endpoint para verificar si el usuario ya ha reaccionado
        const urlReaccionUsuario = `http://localhost:3000/api/v1/reacciones/count_reaccion_only_one/${idPublicacion}/${idUsuario}`;

        // Obtener el conteo total de reacciones
        fetch(urlTotalReacciones)
            .then(response => response.json())
            .then(data => {
                setTotalReacciones(data.reacciones);
            })
            .catch(error => console.error('Error fetching total reacciones:', error));

        // Verificar si el usuario ya ha reaccionado
        fetch(urlReaccionUsuario)
            .then(response => response.json())
            .then(data => {
                setReaccionada(data.reacciones > 0);
            })
            .catch(error => console.error('Error fetching user reaccion:', error));
    }, [idPublicacion, idUsuario]);

    const handleReaccion = () => {
        if (reaccionada) {
            handleEliminarReaccion();
        } else {
            handleAgregarReaccion();
        }
    };

    const handleAgregarReaccion = () => {
        const url = `http://localhost:3000/api/v1/reacciones/`;
        const requestBody = {
            id_usuario: idUsuario,
            id_publicacion: idPublicacion
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (response.ok) {
                    setTotalReacciones(prevReacciones => prevReacciones + 1);
                    setReaccionada(true);
                } else {
                    console.error('Error posting reaccion');
                }
            })
            .catch(error => console.error('Error posting reaccion:', error));
    };

    const handleEliminarReaccion = () => {
        const url = `http://localhost:3000/api/v1/reacciones/delete_reactions/${idPublicacion}/${idUsuario}`;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    setTotalReacciones(prevReacciones => prevReacciones - 1);
                    setReaccionada(false);
                } else {
                    console.error('Error deleting reaccion');
                }
            })
            .catch(error => console.error('Error deleting reaccion:', error));
    };

    return (
        <div className="comentario">
            <button className='btn bottom-color w-100 rounded-0' onClick={handleReaccion}>
                {reaccionada ? `💔 (${totalReacciones})` : `❤ (${totalReacciones})`}
            </button>
        </div>
    );
};

export default Reaccion;
