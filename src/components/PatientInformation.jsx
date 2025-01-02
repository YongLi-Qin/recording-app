import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Typography } from "@mui/material";

const PatientInformation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [gender, setGender] = useState("");

  // Hard code patiens
  const patients = [
    "Matt L",
    "Jim H",
    "James Z",
    "Harry Q",
    "Sarah Y",
    "Susan H",
    "Michael P",
    "Emily W",
    "Anna T",
    "Chris R",
  ];

  // Fuzzy Search
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredPatients([]);
      return;
    }

    const results = patients.filter((patient) =>
      patient.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPatients(results);
  };

  // Select a patient
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchQuery(patient); // enter the name
    setFilteredPatients([]);
  };

  return (
    <Box sx={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", width: "400px" }}>
      <Typography variant="h6" gutterBottom>
        Patient Information
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Patient"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: "10px" }}
      />

      {filteredPatients.length > 0 ? (
        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: "5px",
            maxHeight: "150px",
            overflowY: "auto",
            marginBottom: "10px",
          }}
        >
          {filteredPatients.map((patient, index) => (
            <Box
              key={index}
              sx={{
                padding: "10px",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
              onClick={() => handleSelectPatient(patient)}
            >
              {patient}
            </Box>
          ))}
        </Box>
      ) : searchQuery && (
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: "10px" }}>
          No results found
        </Typography>
      )}

      {/* Gender */}
      <FormControl fullWidth variant="outlined" style={{ marginBottom: "10px" }}>
        <InputLabel>Gender</InputLabel>
        <Select value={gender} onChange={(e) => setGender(e.target.value)} label="Gender">
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </Select>
      </FormControl>

      {/* Submit */}
      <Button variant="contained" color="primary" fullWidth>
        Save Patient
      </Button>
    </Box>
  );
};

export default PatientInformation;
