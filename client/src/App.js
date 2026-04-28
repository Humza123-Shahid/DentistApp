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

function App() {
  
  return (
    <Routes>
          <Route path="/admin/*" element={<Admin2/>} >
      </Route>
      <Route path="/" element={<Home/>}/>
      </Routes>
  
  );
}

export default App;
