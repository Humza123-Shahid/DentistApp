import { AppBar,TitlePortal  } from 'react-admin';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

// 1. Create the Custom AppBar
const CustomBar = () => (
    <AppBar>
        {/* Title prop maintains the app title on the left */}
        <TitlePortal />
        <span style={{ flex: 1 }} />
        <IconButton
            component={Link}
            to="/home"
            color="inherit"
        >
            <HomeIcon />
        </IconButton>
    </AppBar>
);
export default CustomBar;