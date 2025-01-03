import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme"; 
import ConsultPage from "./pages/ConsultPage";


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<ConsultPage />} />
          </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
