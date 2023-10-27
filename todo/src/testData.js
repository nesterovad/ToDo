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
        createDate: new Date(),
        priority: 'low',
        finishDate: undefined,
        endDate: undefined,
        startDate: undefined,
        subtasks: [],
        comments: [],
        files: []
    },
    {
        id: 1,
        name: 'test task 2',
        status: 'new',
        description: 'this is test task 2',
        createDate: new Date(),
        priority: 'high',
        finishDate: undefined,
        endDate: undefined,
        startDate: undefined,
        subtasks: [
            {
                id: 0,
                name: 'sub1',
                status: 'new',
            },
            {
                id: 1,
                name: 'sub2',
                status: 'in process',
            },
            {
                id: 2,
                name: 'sub3',
                status: 'done',
            },
        ],
        comments: [],
        files: []
    }
]

export {
    shortTasks,
    tasks
}