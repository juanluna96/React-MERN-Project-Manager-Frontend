import React, { Fragment, useContext } from 'react'
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Snipper from '../snipper/Snipper';
import BuscadorTareas from './BuscadorTareas';
import escoger_colegio from '../../public/img/escoger_colegio.svg';

const ListadoTareas = () => {
    // Obtener el state del proyecto
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Obtener el state de las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const { tareasproyecto, cargando, tareasProyectoFiltrado } = tareasContext;

    // Si no hay proyecto seleccionado
    if (!proyecto) {

        return (
            <Fragment>
                <h1 className="escoger-colegio">Selecciona un colegio</h1>
                <img src={ escoger_colegio } alt="Escoge un colegio" />
            </Fragment>
        )
    }

    const [proyectoActual] = proyecto;

    if (cargando) {
        return (<Snipper></Snipper>)
    } else {
        return (
            <Fragment>
                <h2>Proyecto: { proyectoActual.nombre }</h2>
                {/* <Snipper></Snipper> */ }
                <BuscadorTareas></BuscadorTareas>
                <ul className="listado-tareas">
                    {
                        tareasproyecto.length === 0
                            ? (<li className="tarea">No hay tareas</li>)
                            : <TransitionGroup>
                                {
                                    tareasProyectoFiltrado.map((tarea) => {
                                        return (
                                            <CSSTransition key={ tarea._id } timeout={ 150 } className="tarea">
                                                <Tarea tarea={ tarea }></Tarea>
                                            </CSSTransition>
                                        )
                                    })
                                }
                            </TransitionGroup>
                    }
                </ul>
            </Fragment>
        )
    }
}

export default ListadoTareas
