
/**
 * Функция-облочка для взаимодействия с данными проектов в localStorage
 * @param {string} action - метод запроса (get)
 * @param {object | undefined} data - необходимые для запроса данные
 * @returns {object} - результат выполнения запроса
 */
function projects(action, data){
    let res;
    switch (action){
        case 'get':
            res = getProjects();
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
    let data = getProjectsData();
    if (!data){
        data = [];
    }
    return {
        status: '200',
        message: 'ok',
        data: data
    };
}

/**
 * Функция-оболочка для взаимодействия с данными проекта в localStorage
 * @param {string} action - метод запроса (get, post, delete, update)
 * @param {object} data - результат выполнения запроса
 * @returns 
 */
function project(action, data){
    let res;
    switch (action){
        case 'get':
            res = getProject(data);
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
 * Функция получения данных проекта по id
 * @param {number} id - идентификатор проекта 
 * @returns {object}
 */
function getProject(id){
    let data = getProjectsData();
    if (!data){
        data = [];
    }
    const proj = data.find(item => item.id == id);
    if (!proj){
        return {
            status: '404',
            message: 'Project not found'
        }
    }
    return {
        status: '200',
        message: 'ok',
        data: proj
    }
}
/**
 * Функция сохранения данных нового проекта
 * @param {object} projData - {name: string}
 * @returns {object} - {status: string, message: string, data: {id: number}}
 */
function createProject(projData){
    let data = getProjectsData();
    if (!data){
        data = [];
    }
    let id = data.length;
    let proj = {
        id: id,
        name: projData.name
    };
    data.push(proj);
    setProjectsData(data);
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
    let data = getProjectsData();
    let proj = data.findIndex(proj => proj.id === projData.id);
    if (proj < 0){
        return {
            status: '404',
            message: 'Project not found'
        }
    }
    data.splice(proj, 1, projData);
    setProjectsData(data);
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
    let data = getProjectsData();
    let ind = data.findIndex(proj => proj.id === projData.id);
    if (ind < 0){
        return {
            status: '404',
            message: 'Project not found'
        }
    }
    data.splice(ind, 1);
    setProjectsData(data);
    //удаление связанных с ним задач
    let tmp = localStorage.getItem("tasks");
    data = JSON.parse(tmp);
    if (data && data.length){
    data = data.filter(task => task.projId !== projData.id);
    localStorage.setItem("tasks", JSON.stringify(data));
    }
    return {
        status: '200',
        message: 'ok'
    }
}

function getProjectsData(){
    let tmp = localStorage.getItem("projects");
    return JSON.parse(tmp);
}

function setProjectsData(data){
    localStorage.setItem("projects", JSON.stringify(data));
}

export {projects, project};