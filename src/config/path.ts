/**
 * Base URL for the API.
 * 
 * @constant {string}
 * @example
 * // Example usage:
 * const url = `${API}/auth/login`;
 */
export const API = '/api/v1';

/**
 * Object containing all the API endpoints organized by feature.
 *
 * @constant {Object}
 * @property {Object} AUTH - Endpoints related to authentication.
 * @property {string} AUTH.BASE - Base endpoint for authentication routes.
 * @property {string} AUTH.LOGIN - Endpoint for user login.
 * @property {string} AUTH.REGISTER - Endpoint for user registration.
 * 
 * @property {Object} TASK - Endpoints related to task management.
 * @property {string} TASK.BASE - Base endpoint for task routes.
 * @property {string} TASK.CREATE - Endpoint for creating a task.
 * @property {string} TASK.DELETE - Endpoint for deleting a task (requires `:id` parameter).
 * @property {string} TASK.UPDATE - Endpoint for updating a task (requires `:id` parameter).
 * @property {string} TASK.GET - Endpoint for fetching a single task (requires `:id` parameter).
 * @property {string} TASK.GET_ALL - Endpoint for fetching all tasks.
 *
 * @example
 * // Example usage:
 * const loginUrl = `${API}${ENDPOINTS.AUTH.LOGIN}`;
 * const deleteTaskUrl = `${API}${ENDPOINTS.TASK.DELETE.replace(':id', taskId)}`;
 */
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
};
