import React, { useState, useEffect } from 'react';

const Comentario = ({ id_publicacion, id_usuario }) => {
    const [numeroComentarios, setNumeroComentarios] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/comentarios/comentarios_publicacion/${id_publicacion}`)
            .then(response => response.json())
            .then(data => {
                setNumeroComentarios(data.comentarios);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Manejar el error aquí
            });
    }, [id_publicacion, id_usuario]);


    return (
        <div>
            <button className='btn bottom-color w-100 rounded-0'>
                Comentario <span>({numeroComentarios})</span>
            </button>
        </div>
    );
};

export default Comentario;
