import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme"; 


const ConsultPage = () => <h1>Other Mode Page</h1>;
const OtherModePage = () => <h1>Other Mode Page</h1>;
const SettingsPage = () => <h1>Settings Page</h1>;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <div style={{ marginTop: "10px", padding: "20px" }}>
          <Routes>
            <Route path="/consult" element={<ConsultPage />} />
            <Route path="/other-mode" element={<OtherModePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
