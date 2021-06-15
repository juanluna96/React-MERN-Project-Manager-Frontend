import React, { useReducer } from 'react';
import download from 'downloadjs';

import tareaContext from './tareaContext'
import { TareaReducer } from './tareaReducer'

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA,
    DESACTIVAR_CARGANDO,
    BUSCAR_TAREA
} from '../../types';
import clienteAxios from '../../config/axios';

const TareaState = (props) => {
    const initialState = {
        tareasproyecto: [],
        tareasProyectoFiltrado: [],
        errortarea: false,
        tareaseleccionada: null,
        cargando: false
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    // Crear las funciones

    // Obtener las tareas de un proyecto
    const obtenerTareas = async (proyecto_info) => {
        try {
            let proyecto = proyecto_info._id;
            const resultado = await clienteAxios.get('api/tareas', { params: { proyecto } });
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
            // console.log(resultado.data.tareas);
            setTimeout(() => {
                dispatch({
                    type: DESACTIVAR_CARGANDO
                })
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }

    // Agregar una tarea al proyecto seleccionado
    const agregarTarea = async (tarea) => {
        try {
            console.log(tarea);
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado.data);
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }

    }

    // Valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // Eliminar tarea
    const eliminarTarea = async (tarea, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${tarea._id}`, { params: { proyecto } })
            dispatch({
                type: ELIMINAR_TAREA,
                payload: tarea._id
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    // Edita o modifica una tarea
    const actualizarTarea = async (tarea) => {
        console.log(tarea);
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    // Extrae una tarea para edición
    const guardarTareaActual = (tarea) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }


    // Elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    // Buscar una tarea en la lista de tareas
    const buscarTareas = (valor) => {
        dispatch({
            type: BUSCAR_TAREA,
            payload: valor
        });
    }

    // Descargar una tarea
    const descargarTarea = async (tarea) => {
        try {
            const { archivo, _id } = tarea;
            const resultado = await clienteAxios.get(`/api/tareas/download_file`, { responseType: 'blob', params: { archivo } });
            const extension = resultado.data.type.split('/')[1];
            download(resultado.data, `${_id}.${extension}`);
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <tareaContext.Provider value={ {
            tareasproyecto: state.tareasproyecto, errortarea: state.errortarea, tareaseleccionada: state.tareaseleccionada, cargando: state.cargando, tareasProyectoFiltrado: state.tareasProyectoFiltrado,
            obtenerTareas, agregarTarea, validarTarea, eliminarTarea, guardarTareaActual, actualizarTarea, limpiarTarea, descargarTarea, buscarTareas
        } }>
            { props.children }
        </tareaContext.Provider>
    )
}

export default TareaState
