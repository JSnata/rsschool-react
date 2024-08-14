import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import UncontrolledFormPage from './pages/UncontrolledFormPage';
import ControlledFormPage from './pages/ControlledFormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/uncontrolled" element={<UncontrolledFormPage />} />
        <Route path="/controlled" element={<ControlledFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
