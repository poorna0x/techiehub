import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

// ✅ Inject Global Styles via JavaScript
const globalStyles = `
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #000;
    color: aliceblue;
  }
`;

// ✅ Create and append the <style> tag to the <head>
const styleTag = document.createElement('style');
styleTag.innerHTML = globalStyles;
document.head.appendChild(styleTag);

// ✅ Render the App
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
