// Import React core library
import React from 'react';

// Import ReactDOM for rendering the React app into the DOM
import ReactDOM from 'react-dom/client';

// Import the main App component
import App from './App';

// Import reportWebVitals for measuring performance (optional)
import reportWebVitals from './reportWebVitals';

// Import BrowserRouter and alias it as Router for wrapping the app with routing capabilities
import { BrowserRouter as Router } from 'react-router-dom';


// ✅ Define global CSS styles as a string
const globalStyles = `
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #000;
    color: aliceblue;
  }
`;

// ✅ Create a <style> tag and inject the global styles into it
const styleTag = document.createElement('style');
styleTag.innerHTML = globalStyles;
document.head.appendChild(styleTag);  // Append the style tag to the <head> of the document


// ✅ Get the root DOM node (where React app will be mounted)
const root = ReactDOM.createRoot(document.getElementById('root'));

// ✅ Render the React app into the root DOM node
root.render(
  <React.StrictMode>
    {/* Wrap the App with Router to enable routing */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// ✅ Optional: Measure and report app performance (e.g., to Google Analytics)
reportWebVitals();
