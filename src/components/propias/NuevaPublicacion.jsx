import React, { useState } from 'react';

const NuevaPublicacion = ({ onPostAdded, userId }) => {
    const [postContent, setPostContent] = useState('');

    const handlePostChange = (event) => {
        setPostContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPost = {
            id_usuario: userId,
            publicacion_data: postContent,
            publicacion_imagen: "https://media.istockphoto.com/id/1496943731/es/foto/joven-hermosa-mujer-cauc%C3%A1sica-pelirroja-ri%C3%A9ndose-de-la-c%C3%A1mara-retrato-fondo-verde.jpg?s=2048x2048&w=is&k=20&c=zELQFIRbEGgxCQXCHrBf8QeKINk9hAfItJuBBb3edC0=",
            fecha_publicacion: new Date().toISOString(),
            id_tipo_privacidad: 1
        };

        try {
            const response = await fetch('http://localhost:3000/api/v1/publicaciones/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            });

            if (response.ok) {
                const result = await response.json();
                onPostAdded(result);
                setPostContent('');
            } else {
                console.error('Error en la respuesta del servidor:', response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
                <label htmlFor="newPost" className="form-label">Hazle saber al mundo que piensas...</label>
                <textarea
                    id="newPost"
                    value={postContent}
                    onChange={handlePostChange}
                    placeholder='Hoy fue un buen día porque...'
                    className="form-control border-color-posts border-3"
                />
            </div>
            <div class="d-flex flex-row-reverse">
            
                <button type="submit" className="btn otro-bottom-color">Publicar</button>
            </div>

        </form>
    );
}

export default NuevaPublicacion;
