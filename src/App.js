import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./home/Home";
import News from "./news/News";
import Meme from "./memes/Meme";
import Notes from "./projects/project/Notes";
import Login from './component/Login';
import Signup from './component/Signup';
import ForgotPassword from './component/ForgotPassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/news" element={<News/>}/>
      <Route path="/meme" element={<Meme/>}/>
      <Route path="/notes" element={<Notes/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
