import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useState,useEffect } from 'react';

import Admin2 from './AdminPages/Admin2';
import Home from './UserPages/Home';
import Doctor from './UserPages/Doctor';
import Services from './UserPages/Services';
import Login from './components/Login';

function App() {
  
  return (
    <Routes>
          <Route path="/admin/*" element={<Admin2/>} >
      </Route>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/doctor" element={<Doctor/>}/>
      <Route path="/services" element={<Services/>}/>
      </Routes>
  
  );
}

export default App;
