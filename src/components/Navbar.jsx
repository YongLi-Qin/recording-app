import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme, useMediaQuery, Box } from "@mui/material";

const Navbar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar sx={{ flexWrap: isSmallScreen ? "wrap" : "nowrap", justifyContent: "space-between" }}>
        
        {/* App Title */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: isSmallScreen ? "center" : "flex-start", 
            alignItems: "center", 
          }}
        >
          <Typography
            variant={isSmallScreen ? "h6" : "h5"}
            sx={{
              fontSize: isSmallScreen ? "1rem" : "1.25rem",
            }}
          >
            Recording App
          </Typography>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
