import React from 'react'
import NuevoProyecto from '../proyectos/NuevoProyecto';
import Listado from '../proyectos/Listado';
import logo_datasis from '../../public/img/logo_datasis.png';

const Sidebar = () => {
    return (
        <aside>
            <img src={ logo_datasis } alt="Logo datasistemas" className="logo" />
            {/* <h1>MERN<span>Tasks</span></h1> */ }

            <NuevoProyecto></NuevoProyecto>

            <div className="proyectos">
                <h2>Colegios</h2>
                <Listado></Listado>
            </div>
        </aside>
    )
}

export default Sidebar
