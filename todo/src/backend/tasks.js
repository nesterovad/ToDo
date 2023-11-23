
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
            res = getTasks(data);
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
 * Функция получения задач для предпросмотра
 * @param {number} projId  - идентификатор проекта, для которого необходимо получить задачи
 * @returns {Array} - массив данных задач
 */
function getTasks(projId){
    const tmp = localStorage.getItem("tasks");
    const allTasks = JSON.parse(tmp);
    const tasks = allTasks.filter(item => item.projId === projId).map(task => (
        {
            projId: task.projId,
            id: task.id,
            name: task.name,
            status: task.status,
            startDate: task.startDate,
            createdate: task.createdate,
            finishDate: task.finishDate,
            endDate: task.endDate
        }
    )
    ) ;
    if (!tasks.length){
        return {
            status: '404',
            message: 'Project does not exist'
        }
    }
    return {
        status: '200',
        message: 'ok',
        data: tasks
    };

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