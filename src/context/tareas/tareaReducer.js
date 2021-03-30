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

export const TareaReducer = (state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return { ...state, tareasproyecto: action.payload, tareasProyectoFiltrado: action.payload, cargando: true };
        case AGREGAR_TAREA:
            return { ...state, tareasproyecto: [action.payload, ...state.tareasproyecto], errortarea: false };
        case VALIDAR_TAREA:
            return { ...state, errortarea: true };
        case ELIMINAR_TAREA:
            return { ...state, tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload) };
        case ACTUALIZAR_TAREA:
            return { ...state, tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea) };
        case TAREA_ACTUAL:
            return { ...state, tareaseleccionada: action.payload };
        case LIMPIAR_TAREA:
            return { ...state, tareaseleccionada: null }
        case DESACTIVAR_CARGANDO:
            return { ...state, cargando: false };
        case BUSCAR_TAREA:
            if (action.payload === "") {
                return { ...state, tareasProyectoFiltrado: state.tareasproyecto };
            } else {
                return { ...state, tareasProyectoFiltrado: state.tareasproyecto.filter(tarea => tarea.nombre.toLowerCase().includes(action.payload.toLowerCase())) };
            }
        default:
            return state;
    }
}
