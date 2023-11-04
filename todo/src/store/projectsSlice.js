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
    }
});

export const {projectAdded} = projectsSlice.actions;

export default projectsSlice.reducer;