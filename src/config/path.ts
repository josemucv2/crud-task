export const API = '/api/v1';


export const ENDPOINTS = {
    AUTH: {
        BASE: '/auth',
        LOGIN: '/login',
        REGISTER: '/register'
    },
    TASK: {
        BASE: '/task',
        CREATE: '/create',
        DELETE: '/delete/:id',
        UPDATE: '/update/:id',
        GET: '/get/:id',
        GET_ALL: '/',
    }
}