import React, { useState } from 'react';
import PostActions from './PostActions';
import Reaccion from './../reaccionar/Reaccion'
import Comentario from './../comentario/Comentario';
import ComentarioBox from './../comentario/ComentarioBox';

const PostCard = ({ post, onSave, onDelete, }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.publicacion_data);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(post.id_publicacion, editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(post.publicacion_data);
  };

  return (
    <div className="">
      <div className="card rounded-top border-color-publications border-2 position-relative">
        <PostActions onEdit={handleEdit} onDelete={() => onDelete(post.id_publicacion)} />
        <div className="d-flex flex-row align-items-center pt-3 ps-3 pe-3">
          <img
            className="rounded-circle"
            src="https://mymodernmet.com/wp/wp-content/uploads/2020/01/meow-meow-angry-internet-cat-5.jpg"
            alt="Profile"
            style={{ width: '50px', height: '50px' }}
          />
          <div className="ms-3">
            <h5 className="card-title text-color-camdev">
              {post.usuario.nombre_usuario} {post.usuario.ap1} {post.usuario.ap2}
            </h5>
            <p className="text-muted">{new Date(post.fecha_publicacion).toLocaleString()}</p>
          </div>
        </div>
        <div className="ms-3 me-3 mb-3">
          {isEditing ? (
            <div>
              <textarea
                className="form-control border-color-posts border-3"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />

              <div className="d-flex flex-row-reverse mt-1 mb-1 ms-1">
                <button className="btn btn-badge ms-2" onClick={handleSave}>Guardar</button>
                <button className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
              </div>
            </div>
          ) : (
            <p className="card-text">{post.publicacion_data}</p>
          )}
          {post.publicacion_imagen && (
            <img
              className="rounded mx-auto d-block"
              src={post.publicacion_imagen}
              alt="Publicación"
              style={{ maxWidth: '100%' }}
            />
          )}
        </div>
        <div className="d-flex flex-wrap">
          <div className="col-4 p-0">
            <Reaccion idPublicacion={post.id_publicacion} idUsuario={post.id_usuario} />
          </div>
          <div className="col-4 p-0">
            <Comentario id_publicacion={post.id_publicacion} idUsuario={post.id_usuario} />

          </div>
          <div className="col-4 p-0">
            <button className='btn bottom-color w-100 rounded-0'>Compartir</button>
          </div>

        </div>
        <ComentarioBox id_publicacion={post.id_publicacion} />
      </div>
    </div>
  );
};

export default PostCard;
