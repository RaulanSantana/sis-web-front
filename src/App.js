// src/App.js
import React from 'react';
// index.js ou App.js
import '@fortawesome/fontawesome-free/css/all.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SlideMenu from './layouts/Slidemenu/Slidemenu';
import Reservas from './views/app-views/Reservas/Reservas';
import Dashboard from './views/app-views/Dashboard/Dashboard';
import Reserva_a from './views/app-views/Reserva_a/Reserva_a';
import Reserva_b from './views/app-views/Reserva_b/Reserva_b';
import Reserva_c from './views/app-views/Reserva_c/Reserva_c';

function App() {
  return (
    <Router>
      <SlideMenu />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/reserva_a" element={<Reserva_a/>}/>
        <Route path="/reserva_b" element={<Reserva_b/>}/>
        <Route path="/reserva_c" element={<Reserva_c/>}/>
      </Routes>
    </Router>
  );
}

export default App;
