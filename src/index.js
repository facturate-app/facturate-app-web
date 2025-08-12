import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout'
import Login from './pages/Login';
import Landing from './pages/Landing';
import Pricing from './pages/Pricing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/web-app" element={<Layout />}>
          <Route element={<Landing />} path=''></Route>
          <Route element={<Pricing/>} path='pricing'></Route>
          <Route element={<Login />} path='login' />
        </Route>
      </Routes>
    </HashRouter>

  </React.StrictMode>
);
