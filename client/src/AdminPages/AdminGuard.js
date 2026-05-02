import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/'; // 👈 hard redirect to separate login page
    }
  }, []);

  const token = localStorage.getItem('token');
  if (!token) return null; // render nothing while redirecting

  return children;
};

export default AdminGuard;