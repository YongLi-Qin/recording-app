import React, { useState } from "react";
import RecordingControl from "../components/RecordingControl";
import NoteTaking from "../components/NoteTaking";
import { Box, CircularProgress, Typography } from "@mui/material";
import PatientInformation from "../components/PatientInformation";
import { LifeLine } from "react-loading-indicators";

const ConsultPage = () => {
  const [recordingTime, setRecordingTime] = useState("00:00");
  const [isGenerating, setIsGenerating] = useState(false); // Animation state

  const handleRecordingTimeUpdate = (time) => {
    setRecordingTime(time); // Update recording time
  };
  const handleStopRecording = () => {
    setIsGenerating(true); // Show loading animation
    setTimeout(() => {
      setIsGenerating(false); // Hide loading animation after 2 seconds
    }, 2000); // 2 seconds timeout
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh", // Full height of the viewport
        position: "relative", // To allow absolute positioning for overlay
        paddingTop: "150px", // Adjust for navbar height
        paddingLeft: "110px",
        overflow: "hidden"
      }}
    >
      {isGenerating && (
        <Box
          sx={{
            position: "absolute", // Overlay to cover entire screen
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Center both horizontally and vertically
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: Add slight opacity for background
            zIndex: 1000, // Ensure it appears on top
          }}
        >
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <LifeLine color="#32cd32" size="large" text="Generating Transcript" textColor="" />
          </Box>
        </Box>
      )}

      {/* Main content */}
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <RecordingControl
            onTimeUpdate={handleRecordingTimeUpdate}
            onStop={handleStopRecording} // Pass stop handler to RecordingControl
          />
          <PatientInformation />
        </Box>
        <Box
          sx={{
            flex: 2,
            display: "flex",
          }}
        >
          <NoteTaking
            currentRecordingTime={recordingTime}
            sx={{ flex: 1 }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ConsultPage;