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

function App() {
  
  return (
    <Routes>
          <Route path="/admin/*" element={<Admin2/>} >
      </Route>
      </Routes>
  
  );
}

export default App;
