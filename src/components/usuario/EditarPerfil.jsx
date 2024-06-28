import React, { useState, useEffect } from 'react';
import eliminarIcon from './assets/eliminar.png';
import '../../scss/base/_base.scss';

const EditarPerfil = ({ usuarioId, handleUpdateUsuario }) => {
    const [editUsuario, setEditUsuario] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/usuarios/${usuarioId}`);
                if (!response.ok) {
                    throw new Error('Error al cargar los datos del usuario');
                }
                const data = await response.json();

                if (data.fecha_nacimiento) {
                    data.fecha_nacimiento = data.fecha_nacimiento.split('T')[0];
                }

                setEditUsuario(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchUsuario();
    }, [usuarioId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditUsuario({ ...editUsuario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { nombre_usuario, ap1, ap2, correo_electronico, fecha_nacimiento } = editUsuario;

            const patchData = {
                nombre_usuario,
                ap1,
                ap2,
                correo_electronico,
                fecha_nacimiento
            };

            const response = await fetch(`http://localhost:3000/api/v1/usuarios/${usuarioId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patchData),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el perfil');
            }

            handleUpdateUsuario(editUsuario);
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al actualizar el perfil');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteProfile = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.')) {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/usuarios/${usuarioId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Error al eliminar el perfil');
                }
                alert('Perfil eliminado exitosamente');
                // Aquí puedes redirigir al usuario a una página de inicio de sesión o a otra página adecuada
            } catch (error) {
                console.error('Error:', error);
                alert('Ocurrió un error al eliminar el perfil');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-color-camdev-titles text-center mb-4">Editar Perfil</h2>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="nombreUsuario" className="form-label text-color-camdev-titles">Nombre de Usuario</label>
                        <input
                            type="text"
                            className="form-control border-color-publications"
                            id="nombreUsuario"
                            name="nombre_usuario"
                            value={editUsuario.nombre_usuario || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="ap1" className="form-label text-color-camdev-titles">Primer Apellido</label>
                        <input
                            type="text"
                            className="form-control border-color-publications"
                            id="ap1"
                            name="ap1"
                            value={editUsuario.ap1 || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="ap2" className="form-label text-color-camdev-titles">Segundo Apellido</label>
                        <input
                            type="text"
                            className="form-control border-color-publications"
                            id="ap2"
                            name="ap2"
                            value={editUsuario.ap2 || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="correoElectronico" className="form-label text-color-camdev-titles">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control border-color-publications"
                            id="correoElectronico"
                            name="correo_electronico"
                            value={editUsuario.correo_electronico || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="fechaNacimiento" className="form-label text-color-camdev-titles">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            className="form-control border-color-publications"
                            id="fechaNacimiento"
                            name="fecha_nacimiento"
                            value={editUsuario.fecha_nacimiento || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button type="submit" className="btn bottom-color" disabled={isLoading}>Guardar Cambios</button>
                    <button type="button" className="btn bottom-color-eliminar" onClick={handleDeleteProfile}>
                        <img src={eliminarIcon} alt="Eliminar Perfil" style={{ width: '44px' }} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditarPerfil;
