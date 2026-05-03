import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

const RevenueExpenseChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // axios
    //   .get('http://localhost:5000/api/dashboard/revenue-expense-chart',
    //     {headers: {
    //   Authorization: `Bearer ${token}`,
    // },
    // })
    //   .then((res) => {
    //     setData(res.data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setLoading(false);
    //   });
    const fetchData = async () => {
     const response = await fetch(`http://localhost:5000/api/dashboard/revenue-expense-chart`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json' ,
            'auth-token':localStorage.getItem('token')
                }
            })
            const json = await response.json();
            console.log(json);
            //const transformed = transformToothData(json.data);
            setData(json);
            setLoading(false);
            }
        fetchData();
  }, []);

  return (
    <Card sx={{ mt: 3, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          💰 Revenue vs Expenses (Monthly)
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `Rs${v}`} />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#1976d2"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#d32f2f"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueExpenseChart;