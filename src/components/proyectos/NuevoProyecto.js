import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext)
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    // State para proyecto
    const [proyecto, setProyecto] = useState({
        nombre: ''
    });

    // Lee los contenidos del input
    const onChangeProyecto = (e) => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    };

    // Extraer nombre de proyecto
    const { nombre } = proyecto;

    // Cuando el usuario enviá un proyecto
    const onSubmitProyecto = (e) => {
        e.preventDefault();

        // Validar el proyecto
        if (nombre.trim() === '') {
            mostrarError();
            return;
        }

        // Agregar al state
        agregarProyecto(proyecto);

        // Reiniciar el form
        setProyecto({
            nombre: ''
        })
    }


    return (
        <Fragment>
            <button type="button" className="btn btn-block btn-primario" onClick={ () => mostrarFormulario() }>Nuevo colegio</button>

            { formulario === true
                ? (<form className="formulario-nuevo-proyecto" onSubmit={ onSubmitProyecto }>
                    <input type="text" className="input-text" placeholder="Nombre del nuevo colegio" name="nombre" onChange={ onChangeProyecto } value={ nombre } />
                    <input type="submit" value="Agregar colegio" className="btn btn-primario btn-block" />
                </form>)
                : null
            }
            {errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null }
        </Fragment>
    )
}

export default NuevoProyecto
