import React, { useContext, useEffect } from 'react'
import Sidebar from '../layouts/Sidebar';
import Barra from '../layouts/Barra';
import FormTareas from '../tareas/FormTareas';
import ListadoTareas from '../tareas/ListadoTareas';
import AuthContext from '../../context/autenticacion/authContext';

const Proyectos = () => {

    // Extraer informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="contenedor-app">
            <Sidebar></Sidebar>
            <div className="seccion-principal">
                <Barra></Barra>
                <main>
                    <FormTareas></FormTareas>
                    <div className="contenedor-tareas">
                        <ListadoTareas></ListadoTareas>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Proyectos
