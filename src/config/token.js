import clienteAxios from './axios';

export default function tokenAuth(token) {
    clienteAxios.defaults.headers.common['x-auth-token'] = '';
    delete clienteAxios.defaults.headers.common['x-auth-token'];

    if (token) {
        clienteAxios.defaults.headers.common['x-auth-token'] = `${token}`;
    }
}