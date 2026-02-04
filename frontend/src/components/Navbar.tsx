import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { Button, Container, Menu, MenuItem, Box } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

function ResponsiveAppBar() {
  const { username, isAuthenticated } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const avatarLetter = username ? username.charAt(0).toUpperCase() : "";

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          {/* 🔹 LEFT SIDE: LOGO + NAME */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AdbIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Tech Hub
            </Typography>
          </Box>

          {/* 🔹 PUSH RIGHT CONTENT */}
          <Box sx={{ flexGrow: 1 }} />

          {/* 🔹 RIGHT SIDE: AUTH */}
          {isAuthenticated ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Username LEFT of avatar */}
              <Typography sx={{ mr: 2 }}>{username}</Typography>

              <Tooltip title="Account">
                <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)}>
                  <Avatar>{avatarLetter}</Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                <MenuItem onClick={() => setAnchorElUser(null)}>
                  My Orders
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    setAnchorElUser(null);
                    logout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={handleLogin}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
