import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Layout from './components/layout/Layout'
import Login from './pages/Login';
import Landing from './pages/Landing';
import Pricing from './pages/Pricing';
import Settings from './pages/Settings';
import Facturacion from './pages/Facturacion';
import FacturaDetalle from './pages/FacturaDetalle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<Landing />} path=''></Route>
            <Route element={<Pricing/>} path='pricing'></Route>
            <Route element={<Settings/>} path='settings'></Route>
            <Route element={<Facturacion/>} path='web-app/facturacion'></Route>
            <Route element={<FacturaDetalle/>} path='web-app/facturacion/:nro'></Route>
            <Route element={<Login />} path='login' />
          </Route>
        </Routes>
      </HashRouter>
    </UserProvider>
  </React.StrictMode>
);
