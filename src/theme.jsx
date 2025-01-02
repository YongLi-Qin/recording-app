// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4A90E2", // Blue
    },
    error: {
      main: "#f44336", // Error color
    },
    info: {
      main: "#2196f3", // Info color 
    },
    success: {
      main: "#66bb6a", // Success color
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Font
    h6: {
      fontWeight: "bold", // Heading Style
    },
  },
});

export default theme;
