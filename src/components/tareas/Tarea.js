import React, { Fragment, useContext } from 'react'
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({ tarea }) => {
    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext)
    const { proyecto } = proyectosContext;

    const [proyectoActual] = proyecto;

    // Extraer las funciones del context de tarea
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, guardarTareaActual, actualizarTarea } = tareasContext;

    // Función que se ejecuta al eliminar tarea
    const tareaEliminar = (tarea) => {
        eliminarTarea(tarea, proyectoActual._id);

        if (tarea.estado === false) {
            proyectoActual.numTareas--;
        }

        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual);
    }

    // Función para cambiar el estado de la tarea
    const CambiarEstado = (tarea) => {
        if (tarea.estado === false) {
            proyectoActual.numTareas--;
        } else {
            proyectoActual.numTareas++;
        }

        tarea.estado = !tarea.estado;

        actualizarTarea(tarea);
    }

    const EditarTarea = (tarea) => {
        if (tarea.estado === true) { proyectoActual.numTareas-- }

        guardarTareaActual(tarea);
    }

    return (
        <Fragment>
            <li className="tarea sombra">
                <p className="texto-tarea">{ tarea.nombre.charAt(0).toUpperCase() + tarea.nombre.slice(1) }</p>
                <div className="d-flex">
                    <div className="estado">
                        {
                            tarea.estado
                                ? (<button className="completo" type="button" onClick={ () => CambiarEstado(tarea) }>Completo</button>)
                                : (<button className="incompleto" type="button" onClick={ () => CambiarEstado(tarea) }>Incompleto</button>)
                        }
                    </div>
                    <div className="acciones">
                        <button className="btn btn-terciario btn-submit" type="button" onClick={ () => EditarTarea(tarea) }>Editar</button>
                        <button onClick={ () => tareaEliminar(tarea) } className="btn btn-secundario" type="button">Eliminar</button>
                    </div>
                </div>
            </li>

        </Fragment>
    )
}

export default Tarea
