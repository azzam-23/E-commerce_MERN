import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  


  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          
          {/* 1. LEFT SIDE: Logo and Icon */}
          <AdbIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Tech Hub
          </Typography>

          {/* 2. MIDDLE SPACER: This Box eats all available space, pushing things apart */}
          <Box sx={{ flexGrow: 1 }} />

          {/* 3. RIGHT SIDE: Settings */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton  sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
           
             
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;