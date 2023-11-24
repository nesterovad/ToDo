import {createSlice} from '@reduxjs/toolkit';

const initialState = [
    
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
            state.splice(ind, 1, action.payload);
        },
        projectDeleted(state, action){
            let ind = state.findIndex(i => i.id === action.payload);
            state.splice(ind, 1);
        },
        projectsAdded(state, action){
            state.concat(action.payload);
        }

    }
});

export const {projectAdded, projectEdited, projectDeleted, projectsAdded} = projectsSlice.actions;

export default projectsSlice.reducer;