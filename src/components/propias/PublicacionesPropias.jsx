import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NuevaPublicacion from './NuevaPublicacion';
import Empty_screen from '../../../empty_screen';
import PostList from './PostList';

const PublicacionesPropias = () => {
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(6);
    const [offset, setOffset] = useState(0);
    const [userId, setUserId] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, [limit, offset, userId]);

    const fetchPosts = () => {
        fetch(`http://localhost:3000/api/v1/publicaciones/find_by_user/?id_usuario=${userId}&limit=${limit}&offset=${offset}`)
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setHasMore(data.length === limit);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleNext = () => {
        setOffset(prevOffset => prevOffset + limit);
    };

    const handlePrevious = () => {
        setOffset(prevOffset => Math.max(prevOffset - limit, 0));
    };

    const handleNewPostAdded = () => {
        setOffset(0); // Restablecer el offset para recargar las publicaciones desde el inicio
        fetchPosts(); // Obtener la lista actualizada de publicaciones
    };

    const handleSave = (postId, newContent) => {
        fetch(`http://localhost:3000/api/v1/publicaciones/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ publicacion_data: newContent }),
        })
            .then(response => response.json())
            .then(updatedPost => {
                setPosts(posts.map(post => (post.id_publicacion === postId ? updatedPost : post)));
            }) 
            .catch(error => console.error('Error updating post:', error));
    };

    const handleDelete = (postId) => {
        fetch(`http://localhost:3000/api/v1/publicaciones/${postId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setPosts(posts.filter(post => post.id_publicacion !== postId));
                } else {
                    console.error('Failed to delete post');
                }
            })
            .catch(error => console.error('Error deleting post:', error));
    };

    return (
        <div className='container-fluid'>
            {posts.length > 0 ? (
                <>
         

                    <NuevaPublicacion onPostAdded={handleNewPostAdded} userId={userId} />

                    <PostList posts={posts} userId={userId} onSave={handleSave} onDelete={handleDelete} />

                    <div className="d-flex justify-content-between mt-3 mb-4">
                        <button className="btn btn_azul_previous_next" onClick={handlePrevious} disabled={offset === 0}>Anterior</button>
                        <button className="btn btn_azul_previous_next" onClick={handleNext} disabled={!hasMore}>Siguiente</button>
                    </div>
                </>
            ) : (
                <div>
                    <NuevaPublicacion onPostAdded={handleNewPostAdded} userId={userId} />
                    <Empty_screen publication_type={"creadas"} />
                </div>
            )}
        </div>
    );
};

export default PublicacionesPropias;
