import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar disableGutters sx={{ px: 2 }}>
        <AdbIcon sx={{ mr: 1 }} />

        <Typography
          variant="h6"
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

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title="Open settings">
          <IconButton sx={{ p: 0 }}>
            <Avatar alt="User Avatar" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
