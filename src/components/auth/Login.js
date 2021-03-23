import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    // Extraer los valores del context
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    // En caso de que el password o usuario no existe
    useEffect(() => {
        if (autenticado) {
            props.history.push('/proyectos');
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensaje, autenticado, props.history]);

    // State para iniciar sesión
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    // Extraer del usuario
    const { email, password } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    // Cuando el usuario quiere iniciar sesión
    const onSubmit = (e) => {
        e.preventDefault();

        // Validar que no haya campos vacíos
        if (email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
        }

        // Pasarlo al action
        iniciarSesion({ email, password });
    }

    return (
        <div className="form-usuario">
            {  alerta ? (<div className={ `alerta ${alerta.categoria}` }>{ alerta.msg }</div>) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesión</h1>
                <form onSubmit={ onSubmit }>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Tu correo electrónico" value={ email } onChange={ onChange } />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" id="password" placeholder="Contraseña" value={ password } onChange={ onChange } />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Logearse" />
                    </div>
                </form>

                <Link to={ '/nueva-cuenta' } className="enlace-cuenta">
                    Registrarme
                </Link>
            </div>
        </div>
    )
}

export default Login
