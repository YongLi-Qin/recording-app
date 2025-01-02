import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation } from "react-router-dom";

// icons
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import HistoryIcon from "@mui/icons-material/History";

const Navbar = () => {
  const location = useLocation(); // Current router
  const [anchorEl, setAnchorEl] = useState(null);

  // Menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        {/* Menu button */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        {/* Drow Down List */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>
            <AccountCircleIcon sx={{ mr: 1 }} />
            Personal Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <PeopleIcon sx={{ mr: 1 }} />
            Patients
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <HistoryIcon sx={{ mr: 1 }} />
            History
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <SettingsIcon sx={{ mr: 1 }} />
            Settings
          </MenuItem>
        </Menu>

        {/* name of the app */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h7" component="div">
            Lyrebird Recording App
          </Typography>

          {/* Router Buttons */}
          <Button
            component={Link}
            to="/consult"
            color="inherit"
            sx={{
              borderBottom: location.pathname === "/consult" ? "2px solid white" : "none",
            }}
          >
            Consult
          </Button>
          <Button
            component={Link}
            to="/other-mode"
            color="inherit"
            sx={{
              borderBottom: location.pathname === "/other-mode" ? "2px solid white" : "none",
            }}
          >
            Other Mode
          </Button>
          <Button
            component={Link}
            to="/settings"
            color="inherit"
            sx={{
              borderBottom: location.pathname === "/settings" ? "2px solid white" : "none",
            }}
          >
            Settings
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* sign out */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1">Hi YongLi</Typography>
          <Button variant="outlined" color="inherit">
            Sign Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
