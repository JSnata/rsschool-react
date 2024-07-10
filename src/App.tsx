import React, { Component } from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    );
  }
}

export default App;
