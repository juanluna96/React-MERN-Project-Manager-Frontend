import React, { Fragment, useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Buscador = styled.input`
    margin-bottom: 3rem;
    background: #ffffff;
    max-width: 600px;
`;

const BuscadorTareas = () => {

    // Obtener el proyecto actual
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;
    const [proyectoActual] = proyecto;

    // Obtener el state para buscar tareas
    const tareasContext = useContext(tareaContext);
    const { buscarTareas, obtenerTareas } = tareasContext;

    const changeSearch = (e) => {
        const buscar = e.target.value;
        console.log(buscar);
        buscarTareas(buscar.trim());
    }

    return (
        <div className="contendor-buscador">
            <Buscador type="text" name="search" className="input-text" onChange={ changeSearch } placeholder="Ingresa la tarea buscar" />
        </div>
    )
}

export default BuscadorTareas
