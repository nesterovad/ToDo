
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

export default projects;