import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'; // Importa BrowserRouter, Routes y Route
import Index from './Index';
import Navbar from './components/navbar';
import Menu_publicaciones from './components/menu_publicaciones';
import PublicacionesPropias from './components/propias/PublicacionesPropias';
import PublicacionesCompartidas from './components/compartir/publicaciones_compartidas';
import Usuario from './components/usuario/Perfil'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Usuario userId={1} />

        <nav className="mt-3 navbar navbar-expand-lg navbar-dark color_nav mb-3">
          <div className="container-fluid">


            <div className='container-fluid'>
              <div className='row'>
                <div className="" id="navbarNav2">

                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink className="nav-link" activeClassName="active" exact to="/mis-publicaciones">Mis publicaciones</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" activeClassName="active" exact to="/mis-compartidos">Mis compartidos</NavLink>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Mis Amigos</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </nav>

        <Routes>
          <Route path="/" element={<PublicacionesPropias />} /> {/* Ruta para la página principal */}
          <Route path="/mis-publicaciones" element={<PublicacionesPropias />} /> {/* Ruta para tus publicaciones propias */}
          <Route path="/mis-compartidos" element={<PublicacionesCompartidas />} /> {/* Ruta para tus publicaciones compartidas */}
          {/* <Route path="/mis-amigos" element={<ContactoDinamico />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
