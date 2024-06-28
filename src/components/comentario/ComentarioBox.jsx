import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import TituloUsuario from './../compartir/Titulo_usuario';

const ComentarioBox = ({ onSubmit, id_publicacion }) => {
    const [textoComentario, setTextoComentario] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [detallesComentarios, setDetallesComentarios] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerDetallesComentarios = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/comentarios/comentarios_detail?id_publicacion=${id_publicacion}`);
                if (!response.ok) {
                    throw new Error('Respuesta de red incorrecta');
                }
                const data = await response.json();
                if (!data || !Array.isArray(data)) {
                    throw new Error('Formato de datos incorrecto');
                }
                setDetallesComentarios(data);
            } catch (error) {
                setError(error.message);
            }
        };

        obtenerDetallesComentarios();
    }, [id_publicacion]); // Asegúrate de incluir id_publicacion en la lista de dependencias

    const handleSubmit = (e) => {
        e.preventDefault();
        if (textoComentario.trim() !== '') {
            onSubmit(textoComentario);
            setTextoComentario('');
        }
    };

    const handleVerComentariosClick = () => {
        setMostrarModal(true);
    };

    const handleCloseModal = () => {
        setMostrarModal(false);
    };

    return (
        <Form className="custom-form" onSubmit={handleSubmit}>
            <Form.Group controlId="formComentario">
                <Form.Control
                    className="custom-textarea"
                    as="textarea"
                    rows={3}
                    placeholder="Escribe tu comentario..."
                    value={textoComentario}
                    onChange={(e) => setTextoComentario(e.target.value)}
                />
            </Form.Group>
            <a href="#" className="ver-comentarios-link links" onClick={handleVerComentariosClick}>
                Ver todos los comentarios de este post { }
            </a>

            {/* Modal para mostrar los detalles de los comentarios */}
            <Modal show={mostrarModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles de los comentarios </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error ? (
                        <p>Error al cargar los comentarios: {error}</p>
                    ) : (



                        <div>
                            {detallesComentarios.map((comentario) => (
                                <div className='card mb-3'>
                                    <div className='container'>
                                        <div className='row'>
                                            <div key={comentario.id_comentario}>
                                                <h4 className='mt-2'><TituloUsuario userId={comentario.id_usuario} /></h4>
                                                <p className='text-secondary'>{comentario.fecha_comentario}</p>
                                                <p>{comentario.comentario_data}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="d-flex flex-row-reverse mt-2">
                <Button className="custom-button" variant="primary" type="submit">
                    Comentar
                </Button>
            </div>
        </Form>
    );
};

export default ComentarioBox;
