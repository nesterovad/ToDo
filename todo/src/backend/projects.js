
/**
 * Функция-облочка для взаимодействия с данными проектов в localStorage
 * @param {string} action - метод запроса {get, post, update, delete}
 * @param {object | undefined} data - необходимые для запроса данные
 * @returns {object} - результат выполнения запроса
 */
function projects(action, data){
    let res;
    switch (action){
        case 'get':
            //todo: add function call for getting projects;
            break;
        case 'post':
            //todo: add functuin call for saving new project
            break;
        case 'delete':
            //todo: add function call for deleting project
            break;
        case 'update':
            //todo: add function call for updating project
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

export default projects;