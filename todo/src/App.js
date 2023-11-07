import logo from './logo.svg';
import './App.css';
import React from 'react';

import { TasksPage, Projects } from './pages';

function App() {
  return (
    <div className="App">
      <main>
        <TasksPage />
      </main>
    </div>
  );
}

export default App;
