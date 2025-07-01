// Importing core React library
import React from 'react';

// Importing routing components from react-router-dom
import { Routes, Route } from 'react-router-dom';

// Importing all the page components to be used in routes
import Home from "./home/Home";
import News from "./news/News";
import Meme from "./memes/Meme";
import Notes from "./projects/project/Notes";
import Login from './component/Login';
import Signup from './component/Signup';
import ForgotPassword from './component/ForgotPassword';

// Main App component
function App() {
  return (
    // <Routes> is a container for all <Route> elements
    <Routes>
      {/* Route for Home page */}
      <Route path="/" element={<Home />} />

      {/* Route for News page */}
      <Route path="/news" element={<News />} />

      {/* Route for Meme page */}
      <Route path="/meme" element={<Meme />} />

      {/* Route for Notes/Projects page */}
      <Route path="/notes" element={<Notes />} />

      {/* Route for Login page */}
      <Route path="/login" element={<Login />} />

      {/* Route for Signup (registration) page */}
      <Route path="/signup" element={<Signup />} />

      {/* Route for Forgot Password page */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

// Exporting App component as default export
export default App;
