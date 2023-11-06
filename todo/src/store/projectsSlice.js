import {createSlice} from '@reduxjs/toolkit';

const initialState = [
    {
        id: 0,
        name: 'Project1',
    },
    {
        id: 1,
        name: 'Project2',
    }
];

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        projectAdded(state, action){
            state.push(action.payload);
        },
        projectEdited(state, action){
            let ind = state.findIndex(i => i.id === action.payload.id);
            state.splice(ind, 1);
            state.push(action.payload);
        },
        projectDeleted(state, action){
            let ind = state.findIndex(i => i.id === action.payload);
            state.splice(ind, 1);
        }
    }
});

export const {projectAdded, projectEdited, projectDeleted} = projectsSlice.actions;

export default projectsSlice.reducer;