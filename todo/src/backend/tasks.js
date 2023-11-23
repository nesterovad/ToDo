
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
            res = updateTasks(data);
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
 * Функция обновления задачи в предпросмотре (для drag-n-drop)
 * @param {object} task - {projId: number, id: number, startDate: Date, finishDate: Date} 
 * @returns {object}
 */
function updateTasks(task){
    const tmp = localStorage.getItem("tasks");
    const tasks = JSON.parse(tmp);
    let utask = tasks.filter(item => item.projId === task.projId && item.id === task.id);
    utask = {...utask, 
        status: task.status,
        startDate: task.startDate,
        finishDate: task.finishDate,
    };
    const ind = tasks.findIndex(item => item.projId === task.projId && item.id === task.id);
    tasks.splice(ind, 1, utask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return {
        status: '200',
        message: 'ok'
    }
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
            res = getTask(data);
            break;
        case 'post':
            res = createTask(data);
            break;
        case 'delete':
            res = deleteTask(data);
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

/**
 * Функция получения данных задачи
 * @param {object} data - {projId: number, id: number}
 * @returns {object} - данные задачи или сообщение об ошибке
 */
function getTask(data){
    const tmp = localStorage.getItem("tasks");
    const tasks = JSON.parse(tmp);
    const task = tasks.find(item => item.projId === data.projId && item.id === data.id);
    if (!task){
        return {
            status: '404',
            message: 'Task not found'
        }
    }
    return {
        status: '200',
        message: 'ok',
        data: task
    }
}

/**
 * Функция удаления задачи
 * @param {object} data - {projId: number, id: number}
 * @returns {object}
 */
function deleteTask(data){
    const tmp = localStorage.getItem("tasks");
    const tasks = JSON.parse(tmp);
    const ind = tasks.find(item => item.projId === data.projId && item.id === data.id);
    tasks.splice(ind, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return {
        status: '200',
        message: 'ok'
    }
}

/**
 * Функция сохранения данных новой задачи
 * @param {object} task - объект задачи
 * @returns {object} - {status: string, message: string, data: {id: number}}
 */
function createTask(task){
    const tmp = localStorage.getItem("tasks");
    let tasks = JSON.parse(tmp);
    const id = tasks.length;
    const ntask = {...task,
        id: id
    };
    tasks.push(ntask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return {
        status: '200',
        message: 'ok',
        data: {
            id: id
        }
    }
}

export {tasks, task};