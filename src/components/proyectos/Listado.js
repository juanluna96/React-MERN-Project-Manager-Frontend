import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AlertaContext from '../../context/alertas/alertaContext';

const Listado = () => {

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    // Obtener el proyecto del state inicial
    const proyectosContext = useContext(proyectoContext)
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

    // Obtener proyecto cuando carga el componente
    useEffect(() => {
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos();

        // eslint-disable-next-line
    }, [mensaje]);

    // Revisar si proyecto tiene contenido
    if (proyectos.length === 0) {
        return <p>No hay proyectos comienza creando uno</p>
    }

    return (
        <ul className="listado-proyectos">
            {alerta ? (<div className={ `alerta ${alerta.categoria}` }>{ alerta.msg }</div>) : false }
            <TransitionGroup>
                { proyectos.map((proyecto) => (
                    <CSSTransition key={ proyecto._id } timeout={ 200 } className="proyecto">
                        <Proyecto proyecto={ proyecto }></Proyecto>
                    </CSSTransition>
                )) }
            </TransitionGroup>
        </ul>
    )
}

export default Listado
