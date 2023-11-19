
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
            //todo: add function call for deleting project
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

export default projects;