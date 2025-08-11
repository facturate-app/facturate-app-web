import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/Landing';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<App />} path='/'></Route>
        <Route element={<Login/>} path='/login'/>
      </Routes>
    </HashRouter>
    
  </React.StrictMode>
);
