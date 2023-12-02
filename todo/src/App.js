import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';

import { TasksPage, Projects } from './pages';
import { EditProjectModal, EditTaskModal, TaskModal, TaskPreview } from './components';

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <div className="App">
      <main>
        <Routes location={previousLocation || location}>
          <Route path="/" element={<Projects />} />
          <Route exact path="/project/:id" element={<TasksPage />} />
        </Routes>

        {previousLocation && (
          <Routes>
            <Route path="/editProject/:id" element={<EditProjectModal />} />
            <Route path="/createProject/" element={<EditProjectModal />} />
            <Route path="/project/:id/:taskId" element={<TaskModal />} />
            <Route path="/project/:id/createTask" element={<EditTaskModal />} />
            <Route path="/project/:id/:taskId/edit" element={<EditTaskModal />} />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
