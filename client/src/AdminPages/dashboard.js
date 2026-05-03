import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import StatCard from './StatCard';
import RevenueExpenseChart from './RevenueExpenseChart';

const Dashboard = () => {
  const [totalDentist, setTotalDentist]   = useState(0);
  const [totalProcedure, setTotalProcedure]   = useState(0);
  const [totalInventory, setTotalInventory] = useState(0);
useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/api/dentist/fetchalldentists`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json' ,
            'auth-token':localStorage.getItem('token')
                }
            })
            const json = await response.json();
            setTotalDentist(json.total);
            const response2 = await fetch(`http://localhost:5000/api/procedure/fetchallprocedures`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json' ,
            'auth-token':localStorage.getItem('token')
                }
            })
            const json2 = await response2.json();
            setTotalProcedure(json2.total);
            const response3 = await fetch(`http://localhost:5000/api/inventory/fetchallinventories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json' ,
            'auth-token':localStorage.getItem('token')
                }
            })
            const json3 = await response3.json();
            setTotalInventory(json3.total);
            }
        fetchData();
    }, []);
  return (
    <Box p={3}>
      {/* Stat Cards Row */}
      <Box display="flex" gap={2} mb={2}>
        <StatCard
          title="Total Dentists"
          value={totalDentist}
          icon="🦷"
          color="#1976d2"
        />
        <StatCard
          title="Total Procedures"
          value={totalProcedure}
          icon="✅"
          color="#2e7d32"
        />
        <StatCard
          title="Total Inventory Items"
          value={totalInventory}
          icon="📦"
          color="#ed6c02"
        />
      </Box>
    <RevenueExpenseChart />
      
    </Box>
  );
};

export default Dashboard;