const shortTasks = [
    {
        id: 0,
        name: "test task 1",
        status: 'new'
    },
    {
        id: 1, 
        name: "test task 2",
        status: 'new'
    }
];

const tasks = [
    {
        id: 0,
        name: 'test task 1',
        status: 'new',
        description: 'this is test task 1',
        createDate: '19.10.2023',
        priority: 'low',
        finishDate: '',
        subtasks: [],
        comments: [],
        files: []
    },
    {
        id: 1,
        name: 'test task 2',
        status: 'new',
        description: 'this is test task 2',
        createDate: '19.10.2023',
        priority: 'high',
        finishDate: '',
        subtasks: [],
        comments: [],
        files: []
    }
]

export {
    shortTasks,
    tasks
}