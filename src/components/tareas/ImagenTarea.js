import React, { Fragment, useState } from 'react'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondOptions from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondOptions, FilePondPluginImagePreview)

// Our app
function ImagenTarea({ setTarea, tarea }) {
    const [files, setFiles] = useState([]);

    // Añadir archivo al state
    const addArchivo = (archivo) => {
        setTarea({
            ...tarea,
            archivo: archivo.fileName
        });
    }

    const file_path = (tarea.archivo !== undefined) ? tarea.archivo : null;

    return (
        <Fragment>
            <FilePond
                files={ files }
                onupdatefiles={ setFiles }
                allowMultiple={ false }
                server={ {
                    process: {
                        url: `${process.env.REACT_APP_BACKEND_URL}api/tareas/archivos`,
                        method: 'POST',
                        onload: (response) => { addArchivo(JSON.parse(response)); }
                    },
                    revert: {
                        url: `${process.env.REACT_APP_BACKEND_URL}api/tareas/delete_file?file=${file_path}`,
                        method: 'GET'
                    }
                }
                }
                maxFiles={ 1 }
                name="files"
                labelIdle='Selecciona & Arrastra tus archivos o <span class="filepond--label-action">buscalos aquí</span>'
            />
        </Fragment>
    )
}

export default ImagenTarea
