
/**
 * Функция-оболочка для взаимодействия с данными задач в localStorage
 * @param {string} action - метод запроса {get, update}
 * @param {object} data - необходимые для запроса данные
 * @returns {object} - результат выполнения запроса
 */
function tasks(action, data){
    let res;
    switch (action){
        case 'get':
            //todo: add function call for getting tasks with projId
            break;
        case 'update':
            //todo: add function call for updatin status 
            break;
        default:
            res = {
                status: '400',
                message: 'Invalid method'
            };
            break;
    };
    return res;
}

/**
 * Функци-оболочка для взаимодействия с данными задачи в localStorage
 * @param {string} action - метод запроса {get, post, update, delete}
 * @param {object} data - необходимые для запроса данные
 * @returns {object} - результат выполнения запроса 
 */
function task(action, data){
    let res;
    switch (action){
        case 'get':
            //todo: add function call for getting task with id and projId
            break;
        case 'post':
            //todo: add function call for creating task
            break;
        case 'delete':
            //todo: add function call for deleting task
            break;
        case 'update': 
            //todo: add function call for updating task
            break;
        default:
            res = {
                status: '400',
                message: 'Invalid method'
            };
            break;
    };
    return res;
}

export {tasks, task};