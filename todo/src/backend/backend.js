
/**
 * Функция-оболочка для работы с localStorage, эмулирует работу удаленного сервера
 * @param {string} endpoint - точка, к которой выполняется запрос 
 * @param {string} action - тип запроса (get, post, delete, update) 
 * @param {object | undefined} data - необходимые для звпроса данные
 * @returns {object} - результат выполнения запроса
 */
function api(endpoint, action, data){
    let res;
    switch (endpoint){
        case 'projects': 
            //todo: add function call for projects
            break;
        case 'tasks':
            //todo: add function call for tasks
            break;
        case 'task':
            //todo: add function call for task
            break;
        default:
            res ={
                status: '404',
                message: 'Invalid path'
            };
            break;
    };
    return res;

}