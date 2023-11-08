import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';

import { TasksPage, Projects } from './pages';

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route exact path="/project/:id" element={<TasksPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
