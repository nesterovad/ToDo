import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        projId: 0,
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
        files: ["testFile.txt"]
    },
    {
        projId: 0,
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
];

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        taskAdded(state, action){
            state.push(action.payload);
        },
        taskDeleted(state, action){
            let ind = state.findIndex(i => (i.id === action.payload.id && i.projId === action.payload.projId));
            state.splice(ind, 1);
        },
        taskEdited(state, action){
            let ind = state.findIndex(i => (i.id === action.payload.id && i.projId === action.payload.projId));
            state.splice(ind, 1);
            state.push(action.payload);
        },
        taskDropped(state, action){
            let ind = state.findIndex(i => (i.id === action.payload.id && i.projId === action.payload.projId));
            state.splice(ind, 1, action.payload);
        }
    }
});

export const {taskAdded, taskDeleted, taskEdited, taskDropped} = tasksSlice.actions;

export default tasksSlice.reducer;