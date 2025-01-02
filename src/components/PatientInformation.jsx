import React, { useState } from "react";
import { Autocomplete, TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Typography } from "@mui/material";

const PatientInformation = () => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [gender, setGender] = useState("");

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
    <Box
    sx={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        flex: 1, 
        display: "flex",
        flexDirection: "column",
    }}
    >

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
            onChange={(e) => setSelectedPatient(e.target.value)} // update patients' name
            sx={{ marginBottom: "20px" }}
          />
        )}
      />

      {/* Gender */}
      <FormControl fullWidth variant="outlined" sx={{ marginBottom: "20px" }}>
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
