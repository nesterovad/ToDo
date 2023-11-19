import projects from "./projects";
import { tasks, task } from "./tasks";

/**
 * Функция-оболочка для работы с localStorage, эмулирует работу удаленного сервера
 * @param {string} endpoint - точка, к которой выполняется запрос 
 * @param {string} action - метод запроса (get, post, delete, update) 
 * @param {object | undefined} data - необходимые для запроса данные
 * @returns {object} - результат выполнения запроса
 */
function api(endpoint, action, data){
    let res;
    switch (endpoint){
        case 'projects': 
            res = projects(action, data);
            break;
        case 'tasks':
            res = tasks(action, data);
            break;
        case 'task':
            res = task(action, data);
            break;
        default:
            res ={
                status: '404',
                message: 'Invalid path'
            };
            break;
    };
    return res;

};

export default api;