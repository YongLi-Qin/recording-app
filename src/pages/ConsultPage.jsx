import React, { useState } from "react";
import RecordingControl from "../components/RecordingControl";
import PatientInformation from "../components/PatientInformation";
import NoteTaking from "../components/NoteTaking";
import { Box } from "@mui/material";

const ConsultPage = () => {
  /* get the recording time from recrodingcontrol component and will be used in notetaking component*/
  const [recordingTime, setRecordingTime] = useState("00:00");
  const handleRecordingTimeUpdate = (time) => { 
    setRecordingTime(time); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        alignItems: "stretch",
        padding: "20px",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <RecordingControl onTimeUpdate={handleRecordingTimeUpdate} />
        <PatientInformation/>
      </Box>
      <Box sx={{ flex: 2 }}>
        <NoteTaking currentRecordingTime={recordingTime} />
      </Box>
    </Box>
  );
};

export default ConsultPage;
