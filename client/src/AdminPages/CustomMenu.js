import { Menu, useLogout } from 'react-admin';
import { MenuItem, ListItemIcon, ListItemText,Divider  } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const CustomMenu = () => {
  const navigate = useNavigate();
 const handleLogout = () => {
    localStorage.removeItem('token'); // or whatever key you use
    navigate('/');               // or your login route
  };
  return (
    <Menu>
      {/* <Menu.ResourceItems /> */}
 <Menu.ResourceItem name="dentist" />
      <Menu.ResourceItem name="procedure" />
      <Menu.ResourceItem name="pricing" />
      <Menu.ResourceItem name="inventory" />
      <Menu.ResourceItem name="expense" />
      <Menu.ResourceItem name="patient" />
      <Menu.ResourceItem name="patienthistory" />
      <Menu.ResourceItem name="appointment" />
      <Menu.ResourceItem name="payment" />
      <Menu.ResourceItem name="tooth" />
      <Menu.ResourceItem name="testimonial" />
      <Menu.ResourceItem name="setting" />
      <Menu.ResourceItem name="social" />
      <Divider sx={{ my: 1 }} />

      {/* Logout */}
      <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
        <ListItemIcon sx={{ color: 'error.main' }}>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default CustomMenu;