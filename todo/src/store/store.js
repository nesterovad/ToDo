import { configureStore } from "@reduxjs/toolkit";

import projectsReduser from './projectsSlice';

export default configureStore({
    reducer: {
        projects: projectsReduser
    }
})