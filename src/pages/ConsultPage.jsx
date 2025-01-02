import React, { useState } from "react";
import RecordingControl from "../components/RecordingControl";
import NoteTaking from "../components/NoteTaking";
import ConsultSummary from "../components/ConsultSummary";
import PatientInformation from "../components/PatientInformation";
import { Box } from "@mui/material";
import { LifeLine } from "react-loading-indicators";

const ConsultPage = () => {
  const [recordingTime, setRecordingTime] = useState("00:00");
  const [notes, setNotes] = useState([]); // To store notes from NoteTaking
  const [isGenerating, setIsGenerating] = useState(false); // To control loading animation
  const [showSummary, setShowSummary] = useState(false); // To toggle between NoteTaking and ConsultSummary

  const handleRecordingTimeUpdate = (time) => {
    setRecordingTime(time);
  };

  const handleNotesUpdate = (newNotes) => {
    setNotes(newNotes);
  };

  const handleStopRecording = () => {
    setIsGenerating(true); // Show loading animation
    setTimeout(() => {
      setIsGenerating(false); // Hide loading animation
      setShowSummary(true); // Show ConsultSummary
    }, 2000); // Simulate loading delay
  };

  const handleResetRecording = () => {
    setNotes([]); // Clear notes
    setRecordingTime("00:00"); // Reset recording time
    setShowSummary(false); // Show NoteTaking
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "relative",
        paddingTop: "150px", // Adjust for navbar height
        paddingLeft: "110px",
        overflow: "hidden",
      }}
    >
      {/* Loading overlay */}
      {isGenerating && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight opacity
            zIndex: 1000,
          }}
        >
          <LifeLine
            color="#32cd32"
            size="large"
            text="Generating Transcript"
            textColor=""
          />
        </Box>
      )}

      {/* Main content */}
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "stretch", // Ensure equal height for both sections
        }}
      >
        {/* Left Section */}
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
            onStop={handleStopRecording}
            onReset={handleResetRecording} // Add reset callback
          />
          <PatientInformation />
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            flex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {showSummary ? (
            <ConsultSummary
              notes={notes}
              sx={{
                minWidth: "800px",
                minHeight: "600px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
              }}
            />
          ) : (
            <NoteTaking
              currentRecordingTime={recordingTime}
              onNotesUpdate={handleNotesUpdate}
              sx={{
                minWidth: "800px",
                minHeight: "600px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ConsultPage;
