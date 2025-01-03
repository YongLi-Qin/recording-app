import React from "react";
import { Box, Tabs, Tab, Typography, Divider, List, ListItem } from "@mui/material";
import "../css/ConsultSummary.css"

// Mock data for the sample transcript
const SampleTranscript = [
  { time: "00:05", text: "Hello doctor, I’ve been coding for hours every day recently, and I’m experiencing back pain. What can I do to alleviate it?" },
  { time: "00:15", text: "I recommend incorporating regular stretching exercises and maintaining a proper sitting posture." },
  { time: "00:25", text: "Thank you, doctor. Are there specific stretches you would recommend for this type of pain?" },
];

const ConsultSummary = ({ notes }) => {
  // State for managing the active tab
  const [activeTab, setActiveTab] = React.useState(0);

  // Function to handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Renders the Notepad tab
  const renderNotepad = () => (
    <Box>
      <Typography variant="h6">Notepad</Typography>
      <List>
        {notes.map((note, index) => (
          <ListItem key={index}>
            <Typography variant="caption" color="textSecondary">
              {`${note.recordingTime}`} {/* Display the recording time */}
            </Typography>
            <Typography variant="body1" sx={{ marginLeft: "10px" }}>
              {note.content} {/* Display the note content */}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Renders the Transcript tab
  const renderTranscript = () => (
    <Box>
      <Typography variant="h6">Transcript</Typography>
      <List>
        {SampleTranscript.map((item, index) => (
          <ListItem key={index}>
            <Typography variant="caption">{item.time}</Typography> {/* Display the timestamp */}
            <Typography variant="body1" sx={{ marginLeft: "10px" }}>
              {item.text} {/* Display the transcript text */}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Renders the Combined tab with notes and transcript merged
  const renderCombined = () => {
    const combinedData = [
      ...notes.map((note) => ({ ...note, type: "note" })), // Add type for notes
      ...SampleTranscript.map((transcript) => ({ ...transcript, type: "transcript" })), // Add type for transcript
    ].sort((a, b) => (a.recordingTime || a.time).localeCompare(b.recordingTime || b.time)); // Sort by time

    return (
      <Box>
        <Typography variant="h6">Combined Timeline</Typography>
        <List>
          {combinedData.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                backgroundColor: item.type === "note" ? "#e8f5e9" : "#e3f2fd", // Different background colors for note and transcript
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {item.recordingTime || item.time} {/* Display either recording time or transcript time */}
              </Typography>
              <Typography variant="body1" sx={{ marginLeft: "10px" }}>
                {item.content || item.text} {/* Display content or text */}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <Box className="consult-summary"
      sx={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflowY: "auto",
        backgroundColor: { xs: "white", sm: "#f9f9f9" }, 
      }}
    >
      {/* Tab navigation for switching views */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        sx={{
          marginBottom: "20px",
          ".MuiTabs-indicator": {
            backgroundColor: "primary.main", 
          },
        }}
      >
        <Tab label="Notepad" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }} />
        <Tab label="Transcript" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }} />
        <Tab label="Combined" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }} />
      </Tabs>
      <Divider sx={{ marginY: "20px" }} />
      {/* Render the content based on the selected tab */}
      {activeTab === 0 && renderNotepad()}
      {activeTab === 1 && renderTranscript()}
      {activeTab === 2 && renderCombined()}
    </Box>
  );
};

export default ConsultSummary;
