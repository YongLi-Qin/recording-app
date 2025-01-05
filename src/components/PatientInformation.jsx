import React, { useState } from "react";
import { Autocomplete, TextField, Select, MenuItem, FormControl, InputLabel, Box, Typography } from "@mui/material";
import "../css/PatientInformation.css"

const PatientInformation = () => {
  const [selectedPatient, setSelectedPatient] = useState(""); // Indicates specific patient
  const [gender, setGender] = useState(""); // Indicates gender

  /* Hardcode patients' name */
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

  return (
    <Box className="patient-information">
      <Typography variant="h6" gutterBottom>
        Patient Information
      </Typography>

      {/* Patient Name */}
      <Autocomplete
        freeSolo 
        options={patients} // patient List
        value={selectedPatient} 
        onChange={(event, newValue) => setSelectedPatient(newValue)} 
        renderInput={(params) => (
          <TextField
            {...params}
            label="Patient Name"
            variant="outlined"
            fullWidth
            className="patient-information-input"
            onChange={(e) => setSelectedPatient(e.target.value)} // update patients' name
          />
        )}
      />

      <Box sx={{ height: "20px" }} /> {/* Spacer between inputs */}

      {/* Gender */}
      <FormControl fullWidth variant="outlined" className="patient-information-input">
        <InputLabel>Gender</InputLabel>
        <Select value={gender} onChange={(e) => setGender(e.target.value)} label="Gender">
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default PatientInformation;
