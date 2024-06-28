import React from 'react'

const menu_publicaciones = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark color_nav">
      <div className="container-fluid">

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">Mis publicaciones</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Mis compartidos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Mis Amigos</a>
            </li>

          </ul>
        </div>
      </div>
    </nav>

  )
}

export default menu_publicaciones
