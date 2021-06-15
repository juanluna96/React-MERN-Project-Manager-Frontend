import React, { useContext, useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import ImagenTarea from './ImagenTarea';

const FormTareas = () => {
    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext)
    const { proyecto, eliminarProyecto } = proyectosContext;

    // Extraer funcion para agregar tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea, cargando } = tareasContext;

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if (tareaseleccionada !== null) {
            const { cierre } = tareaseleccionada;
            tareaseleccionada.cierre !== undefined
                ? setTarea({ ...tareaseleccionada, cierre: new Date(cierre) })
                : setTarea(tareaseleccionada)
        } else {
            setTarea({
                nombre: '',
                cierre: new Date(),
                estado: false
            });
        }
    }, [tareaseleccionada]);

    // State del formulario
    const [tarea, setTarea] = useState({
        nombre: '',
        cierre: new Date(),
        estado: false
    });

    // Si no hay proyecto seleccionado
    if (!proyecto) {
        return null;
    }

    const [proyectoActual] = proyecto;

    // Leer los valores del formulario
    const handleChange = (e) => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    // Cambiar los valores de la fecha
    const handleChangeDate = (value) => {
        setTarea({
            ...tarea,
            cierre: value
        })
    }

    // Extraer el nombre del proyecto
    const { nombre, cierre } = tarea;


    const onSubmit = (e) => {
        e.preventDefault();

        // Validar
        if (nombre.trim() === '') {
            validarTarea();
            return;
        }
        // Si es edicion o es nueva tarea
        if (tareaseleccionada === null) {
            // Agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // Actualizar tarea existente
            actualizarTarea(tarea);

            // Elimina tarea seleccionada del state
            limpiarTarea();
        }
        // Sumar una tarea mas al proyecto
        proyectoActual.numTareas++;

        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual);

        // Reiniciar el form
        setTarea({
            ...tarea,
            nombre: ''
        })
    }

    if (cargando) {
        return null;
    } else {
        return (
            <div className="formulario">
                <button type="submit" className="btn btn-eliminar" onClick={ () => eliminarProyecto(proyectoActual) }>Eliminar colegio &times;</button>
                <form onSubmit={ onSubmit }>
                    { errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null }
                    <div className="contenedor-input">
                        <input type="text" name="nombre" value={ nombre } onChange={ handleChange } className="input-text" placeholder="Nombre de la tarea..." />
                    </div>
                    <div className="contenedor-input">
                        <DateTimePicker className="w-100 input-time" onChange={ (value) => handleChangeDate(value) } value={ cierre } />
                    </div>
                    <ImagenTarea tarea={ tarea } setTarea={ setTarea }></ImagenTarea>
                    <div className="contenedor-input">
                        <input type="submit" className="btn btn-terciario btn-submit btn-block" value={ tareaseleccionada ? "Editar tarea" : "Agregar tarea" } />
                    </div>
                </form>
            </div>
        )
    }
}

export default FormTareas
