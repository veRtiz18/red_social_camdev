import React from 'react';
import PostCard from './PostCard';
import Reaccion from './../reaccionar/Reaccion'
const PostList = ({ posts, onSave, onDelete }) => (
    <div className='row'>
        {posts.map((post) => (
            <div className='col-12 col-md-4 col-lg-4 mb-3'>
                <PostCard key={post.id_publicacion} post={post} onSave={onSave} onDelete={onDelete} />
                
            </div>
        ))}


    </div>
);

export default PostList;
