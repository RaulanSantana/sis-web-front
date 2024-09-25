// src/App.js
import React from 'react';
// index.js ou App.js
import '@fortawesome/fontawesome-free/css/all.min.css';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SlideMenu from './layouts/Slidemenu/Slidemenu';
import Reservas from './views/app-views/Reservas/Reservas';
import Dashboard from './views/app-views/Dashboard/Dashboard';
import MinhasReservas from './views/app-views/MinhasReservas/MinhasReservas';
import AprovReservas from './views/app-views/AprovReservas/AprovReservas';
import ReservaLabhab from './views/app-views/ReservaLabhab/ReservaLabhab';
import ReservaLabin from './views/app-views/ReservaLabin/ReservaLabin';
import ReservaSala from './views/app-views/ReservaSala/ReservaSala';
import SoftwaresInstalados from './views/app-views/SoftwareInstalados/SoftwareInstalados';
import AdicionarSoftware from './views/app-views/AdicionarSoftware/AdicionarSoftware';
import Agenda from './views/app-views/Agenda/Agenda';


function App() {
  return (
    <Router>
      <SlideMenu />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reservas" element={<Reservas/>} />
        <Route path="/reserva_a" element={<ReservaLabhab/>}/>
        <Route path="/reserva_b" element={<ReservaLabin/>}/>
        <Route path="/reserva_c" element={<ReservaSala/>}/>
        <Route path="/minhas_reservas" element={<MinhasReservas/>}/>
        <Route path="/aprov_reservas" element={<AprovReservas/>}/>
        <Route path="/softwares_instalados" element={<SoftwaresInstalados/>}/>
        <Route path="/adicionarSoftware" element={<AdicionarSoftware/>}/>
        <Route path="/agenda" element={<Agenda/>}/>
        
        
      </Routes>
    </Router>
  );
}

export default App;
