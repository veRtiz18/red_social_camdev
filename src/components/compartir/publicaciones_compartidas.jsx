import React, { useEffect, useState } from 'react';
import TituloUsuario from './Titulo_usuario';
import 'bootstrap/dist/css/bootstrap.min.css';
import Empty_screen from '../../../empty_screen';

const Comentario = () => {
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(6);
    const [offset, setOffset] = useState(0);
    const [userId, setUserId] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/compartidos/find_by_user?id_usuario=${userId}&limit=${limit}&offset=${offset}`)
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setHasMore(data.length === limit);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [limit, offset, userId]);

    const handleNext = () => {
        setOffset(prevOffset => prevOffset + limit);
    };

    const handlePrevious = () => {
        setOffset(prevOffset => Math.max(prevOffset - limit, 0));
    };

    return (

        <div className='container'>
            {posts.length > 0 ? (
                <>
                    <h1 className='class-name-share mb-3'>Publicaciones compartidas por ti:</h1>

                    <div className='row'>
                        {posts.map((post) => (
                            <div className='col-12 col-md-4 col-lg-4 mb-3' key={post.id_compartir}>
                                <div className="card rounded-top border-color-publications border-2">
                                    <div className="d-flex flex-row align-items-center p-3">
                                        <img
                                            className="rounded-circle"
                                            src="https://mymodernmet.com/wp/wp-content/uploads/2020/01/meow-meow-angry-internet-cat-5.jpg"
                                            alt="Profile"
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                        <div className="ms-3">
                                            <h5 className="card-title text-color-camdev mb-0 text-color">
                                                <TituloUsuario userId={post.publicacion.id_usuario} />
                                            </h5>
                                            <p className="text-muted mb-0">{new Date(post.publicacion.fecha_publicacion).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">
                                            {post.publicacion.publicacion_data}
                                        </p>
                                        {post.publicacion.publicacion_imagen && (
                                            <img
                                                className="rounded mx-auto d-block"
                                                src={post.publicacion.publicacion_imagen}
                                                alt="Publicación"
                                                style={{ maxWidth: '100%' }}
                                            />
                                        )}
                                    </div>
                                    <div className="d-flex flex-wrap">
                                        <div className="col-6 p-0">
                                            <button className='btn bottom-color w-100 rounded-0'>❤</button>
                                        </div>
                                        <div className="col-6 p-0">
                                            <button className='btn bottom-color w-100 rounded-0'>Comentar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-between mt-3 mb-4">
                        <button className="btn btn_azul_previous_next" onClick={handlePrevious} disabled={offset === 0}>Anterior</button>
                        <button className="btn btn_azul_previous_next" onClick={handleNext} disabled={!hasMore}>Siguiente</button>
                    </div>
                </>
            ) : (

                <div>

                    <Empty_screen publication_type={"compartidas"} />
                </div>
            )}
        </div>
    );
}

export default Comentario;
