import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultPhoto from './assets/user.png';
import confettiIcon from './assets/confetti.png';
import configIcon from './assets/config.png';
import '../../scss/base/_base.scss';
import EditarPerfil from './EditarPerfil';

const Perfil = ({ userId }) => {
    const [photo, setPhoto] = useState(null);
    const [usuario, setUsuario] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [showEditarPerfil, setShowEditarPerfil] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/usuarios/${userId}`);
                if (!response.ok) throw new Error('Error al cargar los datos del usuario');
                const data = await response.json();
                setUsuario(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsuario();
    }, [userId]);

    const handleConfiguracionClick = useCallback(() => {
        setShowEditarPerfil(true);
    }, []);

    const handlePhotoChange = useCallback((event) => {
        const selectedPhoto = event.target.files[0];
        if (selectedPhoto) {
            const reader = new FileReader();
            reader.onloadend = () => setPhoto(reader.result);
            reader.readAsDataURL(selectedPhoto);
        }
    }, []);

    const handleUpdateUsuario = useCallback((updatedUsuario) => {
        setUsuario(updatedUsuario);
        setUpdateMessage('Perfil actualizado exitosamente');
        setTimeout(() => setUpdateMessage(''), 3000);
        setShowEditarPerfil(false);
    }, []);

    const calcularEdad = useCallback((fechaNacimiento) => {
        const today = new Date();
        const birthDate = new Date(fechaNacimiento);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }, []);

    const formatDate = useCallback((fecha) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', options);
    }, []);

    if (isLoading) {
        return <div className="text-center mt-5">Cargando...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-5" role="alert">{error}</div>;
    }

    return (
        <div className="container text-center mt-5">
            <div className="position-relative d-inline-block" style={{ width: '250px', height: '250px' }}>
                <img
                    src={photo || usuario.foto_perfil || defaultPhoto}
                    alt="Perfil"
                    className="rounded-circle img-fluid"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
                <label
                    className="btn bottom-color rounded-circle position-absolute bottom-0 end-0"
                    style={{ width: '40px', height: '40px', lineHeight: '24px', textAlign: 'center' }}
                    htmlFor="fileInput"
                >
                    <h5>+</h5>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handlePhotoChange}
                    />
                </label>
                <button
                    className="btn rounded-circle position-absolute bottom-0 start-1"
                    style={{ width: '40px', height: '40px', lineHeight: '24px', textAlign: 'center', background: 'none', border: 'none' }}
                    onClick={handleConfiguracionClick}
                >
                    <img src={configIcon} alt="Configuración" style={{ width: '30px' }} />
                </button>
            </div>

            <div className="mt-3">
                <h1 className='class-name-share mb-3 '>
                    Hola, <span className='text-color-camdev'>
                        {usuario.nombre_usuario} {usuario.ap1} {usuario.ap2}
                    </span>.
                </h1>
            </div>

            <div className="mt-2">
                <img src={confettiIcon} alt="Confeti" style={{ width: '24px', marginRight: '8px' }} />
                <span className="text-muted" style={{ fontSize: '30px' }}>
                    {usuario.fecha_nacimiento ? `${formatDate(usuario.fecha_nacimiento)} (${calcularEdad(usuario.fecha_nacimiento)} años)` : ''}
                </span>
            </div>

            {updateMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    {updateMessage}
                </div>
            )}

            {showEditarPerfil && <EditarPerfil usuarioId={userId} handleUpdateUsuario={handleUpdateUsuario} />}
        </div>
    );
};

export default Perfil;
