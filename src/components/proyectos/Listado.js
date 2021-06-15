import React, { useContext, useEffect, Fragment } from 'react'
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AlertaContext from '../../context/alertas/alertaContext';
import Snipper from '../snipper/Snipper';

const Listado = () => {

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    // Obtener el proyecto del state inicial
    const proyectosContext = useContext(proyectoContext)
    const { mensaje, proyectos, obtenerProyectos, loading } = proyectosContext;

    // Obtener proyecto cuando carga el componente
    useEffect(() => {
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos();

        // eslint-disable-next-line
    }, [mensaje]);

    if (loading) {
        return <Snipper></Snipper>
    }

    // Revisar si proyecto tiene contenido
    if (proyectos.length === 0) {
        return <p>No hay proyectos comienza creando uno</p>
    }


    // Función para ordenar
    function dynamicSort(property) {
        // Cambiando orden
        var sortOrder = -1;
        if (property[0] === "-") {
            sortOrder = 1;
            property = property.substr(1);
        }
        return function (a, b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    proyectos.sort(dynamicSort("numTareas"));

    return (
        <Fragment>
            <ul className="listado-proyectos">
                { alerta ? (<div className={ `alerta ${alerta.categoria}` }>{ alerta.msg }</div>) : false }
                <TransitionGroup>
                    { proyectos.map((proyecto) => (
                        <CSSTransition key={ proyecto._id } timeout={ 200 } className="proyecto">
                            <Proyecto proyecto={ proyecto }></Proyecto>
                        </CSSTransition>
                    )) }
                </TransitionGroup>
            </ul>
        </Fragment>
    )
}

export default Listado
