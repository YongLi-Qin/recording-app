import React, { useState } from "react";
import RecordingControl from "../components/RecordingControl";
import NoteTaking from "../components/NoteTaking";
import ConsultSummary from "../components/ConsultSummary";
import PatientInformation from "../components/PatientInformation";
import { Box } from "@mui/material";
import { LifeLine } from "react-loading-indicators";
import "../css/ConsultPage.css";

const ConsultPage = () => {
  const [recordingTime, setRecordingTime] = useState("00:00"); // Current recording time
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
    <Box className="consult-page">
      {/* Loading overlay */}
      {isGenerating && (
        <Box className="loading-overlay">
          <LifeLine
            color="#32cd32"
            size="large"
            text="Generating Transcript"
            textColor=""
          />
        </Box>
      )}

      {/* Main content */}
      <Box className="main-content">
        {/* Left Section */}
        <Box className="left-section">
          <RecordingControl
            onTimeUpdate={handleRecordingTimeUpdate}
            onStop={handleStopRecording}
            onReset={handleResetRecording}
          />
          <PatientInformation />
        </Box>

        {/* Right Section */}
        <Box className="right-section">
          {showSummary ? (
            <ConsultSummary notes={notes} />
          ) : (
            <NoteTaking
              currentRecordingTime={recordingTime}
              onNotesUpdate={handleNotesUpdate}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ConsultPage;
