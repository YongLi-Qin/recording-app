import React from "react";
import { Box, Tabs, Tab, Typography, Divider, List, ListItem } from "@mui/material";

const SampleTranscript = [
  { time: "00:05", text: "Hello doctor, I’ve been coding for hours every day recently, and I’m experiencing back pain. What can I do to alleviate it?" },
  { time: "00:15", text: "I recommend incorporating regular stretching exercises and maintaining a proper sitting posture." },
  { time: "00:25", text: "Thank you, doctor. Are there specific stretches you would recommend for this type of pain?" },
];

const ConsultSummary = ({ notes }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  /* Notepad Section */ 
  const renderNotepad = () => (
    <Box>
      <Typography variant="h6">Notepad</Typography>
      <List>
        {notes.map((note, index) => (
          <ListItem key={index}>
            <Typography variant="caption" color="textSecondary">
              {`${note.recordingTime}`}
            </Typography>
            <Typography variant="body1" sx={{ marginLeft: "10px" }}>
              {note.content}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );

    /* Transcript Section */ 
  const renderTranscript = () => (
    <Box>
      <Typography variant="h6">Transcript</Typography>
      <List>
        {SampleTranscript.map((item, index) => (
          <ListItem key={index}>
            <Typography variant="caption">{item.time}</Typography>
            <Typography variant="body1" sx={{ marginLeft: "10px" }}>
              {item.text}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  /* TimeLine Secction */
  const renderCombined = () => {
    // Combine and sort both notes and transcripts by time
    const combinedData = [
      ...notes.map((note) => ({ ...note, type: "note" })),
      ...SampleTranscript.map((transcript) => ({ ...transcript, type: "transcript" })),
    ].sort((a, b) => (a.recordingTime || a.time).localeCompare(b.recordingTime || b.time));

    return (
      <Box>
        <Typography variant="h6">Combined Timeline</Typography>
        <List>
          {combinedData.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                backgroundColor: item.type === "note" ? "#e8f5e9" : "#e3f2fd", // Highlight color
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {item.recordingTime || item.time}
              </Typography>
              <Typography variant="body1" sx={{ marginLeft: "10px" }}>
                {item.content || item.text}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: "800px",
        height: "600px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Notepad" />
        <Tab label="Transcript" />
        <Tab label="Combined" />
      </Tabs>
      <Divider sx={{ marginY: "20px" }} />
      {activeTab === 0 && renderNotepad()}
      {activeTab === 1 && renderTranscript()}
      {activeTab === 2 && renderCombined()}
    </Box>
  );
};

export default ConsultSummary;
