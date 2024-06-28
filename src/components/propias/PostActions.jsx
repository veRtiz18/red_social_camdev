import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const PostActions = ({ onEdit, onDelete }) => (
    <div className="position-absolute top-0 end-0 mt-2 me-2 d-flex flex-column">
        <button className="btn text-btn_azul_previous_next mb-2" onClick={onEdit}>
            <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="btn text-danger" onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} />
        </button>
    </div>
);

export default PostActions;
