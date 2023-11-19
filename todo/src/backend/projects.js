
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
            res = getProjects();
            break;
        case 'post':
            res = createProject(data);
            break;
        case 'delete':
            res = deleteProject(data);
            break;
        case 'update':
            res = updateProject(data);
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
 * Функция получения данных всех проектов
 * @returns {object} - {status: string, message: string, data: [{id: number, name: 'string}]}
 */
function getProjects(){
    let tmp = localStorage.getItem("projects");
    let data = JSON.parse(tmp);
    return {
        status: '200',
        message: 'ok',
        data: data
    };
}

/**
 * Функция сохранения данных нового проекта
 * @param {object} projData - {name: string}
 * @returns {object} - {status: string, message: string, data: {id: number}}
 */
function createProject(projData){
    let tmp = localStorage.getItem("projects");
    let data = JSON.parse(tmp);
    let id = data.length;
    let proj = {
        id: id,
        name: projData.name
    };
    data.push(proj);
    localStorage.setItem("projects", JSON.stringify(data));
    return {
        status: '200',
        message: 'ok',
        data: {
            id: id
        }
    };
}

/**
 * Функция обновления данных проекта
 * @param {object} projData - {id: number, name: string}
 * @returns {object} - {status: string, message: string}
 */
function updateProject(projData){
    let tmp = localStorage.getItem("projects");
    let data = JSON.parse(tmp);
    let proj = data.findIndex(proj => proj.id === projData.id);
    if (!proj){
        return {
            status: '404',
            message: 'Project not found'
        }
    }
    data.splice(proj, 1, projData);
    localStorage.setItem("projects", JSON.stringify(data));
    return {
        status: '200',
        message: 'ok'
    }
}

/**
 * Функция удаления проекта и связанных с ним задач
 * @param {object} projData - {id: number}
 * @returns {object} - {status: string, message: string}
 */
function deleteProject(projData){
    //удаление данных о проекте
    let tmp = localStorage.getItem("projects");
    let data = JSON.parse(tmp);
    let ind = data.findIndex(proj => proj.id === projData.id);
    if (!ind){
        return {
            status: '404',
            message: 'Project not found'
        }
    }
    data.splice(ind, 1);
    localStorage.setItem("projects", JSON.stringify(data));
    //удаление связанных с ним задач
    tmp = localStorage.getItem("tasks");
    data = JSON.parse(tmp);
    data = data.filter(task => task.projId !== projData.id);
    localStorage.setItem("tasks", JSON.stringify(data));
    return {
        status: '200',
        message: 'ok'
    }
}

export default projects;