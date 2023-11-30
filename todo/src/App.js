import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';

import { TasksPage, Projects } from './pages';
import { EditProjectModal } from './components';

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
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
