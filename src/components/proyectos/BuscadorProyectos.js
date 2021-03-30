import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Buscador = styled.input`
    margin-bottom: 3rem;
    background: #f3f3f3;
`;

const BuscadorProyectos = () => {

    const [terminoBuscar, setBuscar] = useState('');

    // Obtener el proyecto del state inicial
    const proyectosContext = useContext(proyectoContext);
    const { buscarProyecto, obtenerProyectos } = proyectosContext;

    useEffect(() => {
        if (terminoBuscar !== '') {
            buscarProyecto(terminoBuscar);
        } else {
            obtenerProyectos();
        }
    }, [terminoBuscar]);

    const changeSearch = (e) => {
        const buscar = e.target.value;
        setBuscar(buscar);
    }

    return (
        <Buscador type="text" name="search" value={ terminoBuscar } className="input-text" onChange={ changeSearch } placeholder="Ingresa el colegio a buscar" />
    )
}

export default BuscadorProyectos
