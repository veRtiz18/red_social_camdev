import React from 'react'
import defaultImagen from './src/assets/img/camdev.png'


const empty_screen = ({ publication_type }) => {
    return (
        <div>
            <div className='text-center'>
                <img
                    src={defaultImagen}
                    className='rounded rounded-3 shadow text-center'
                    alt="Imagen por defecto"
                    style={{
                        maxWidth: '400px',
                        height: 'auto'
                    }}
                />
            </div>

            <h1 className='class-name-share text-center'>¡Empieza a usar <span className='text-color-camdev'>camdev</span>!</h1>
            <p className='text-center'>Aún no tienes publicaciones {publication_type}.</p>
        </div>
    )
}

export default empty_screen
