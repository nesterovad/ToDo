import { configureStore } from "@reduxjs/toolkit";

import projectsReduser from './projectsSlice';
import tasksReduser from './tasksSlice';

export default configureStore({
    reducer: {
        projects: projectsReduser,
        tasks: tasksReduser
    }
})