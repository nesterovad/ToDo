import { createSlice } from "@reduxjs/toolkit";

const initialState = [

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
        },
        tasksAdded(state, action){
            state.concat(action.payload);
        }
    }
});

export const {taskAdded, taskDeleted, taskEdited, taskDropped, tasksAdded} = tasksSlice.actions;

export default tasksSlice.reducer;