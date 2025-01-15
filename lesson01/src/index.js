import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new 'react-dom/client' module
import './index.css';
import App from './App';

// Create a root using the new createRoot method
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
