import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, Typography, Button, List, ListItem, Divider } from "@mui/material";

const NoteTaking = ({ currentRecordingTime, sx }) => {
  const [note, setNote] = useState(""); // Current note input
  const [notes, setNotes] = useState([]); // List of all notes
  const notesEndRef = useRef(null); // Ref to scroll to the last note

  // Add a new note with timestamps
  const handleAddNote = () => {
    if (note.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setNotes((prevNotes) => [
        ...prevNotes,
        { recordingTime: currentRecordingTime, currentTime, content: note },
      ]);
      setNote(""); // Clear input after adding
    }
  };

  // Trigger adding a note on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddNote();
      e.preventDefault();
    }
  };

  // Scroll to the latest note when notes update
  useEffect(() => {
    if (notesEndRef.current) {
      notesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [notes]);

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        padding: "20px",
        width: "800px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        ...sx,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Notepad
      </Typography>
      {/* Notes list with scroll */}
      <Box
        sx={{
          flex: 1,
          maxHeight: "400px",
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <List>
          {notes.map((noteItem, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                  >{`Recording Time: ${noteItem.recordingTime} | Current Time: ${noteItem.currentTime}`}</Typography>
                  <Typography variant="body1">{noteItem.content}</Typography>
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
          {/* Reference for scrolling */}
          <div ref={notesEndRef} />
        </List>
      </Box>
      {/* Input for new notes */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          label="Enter your note"
          variant="outlined"
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button variant="contained" color="primary" onClick={handleAddNote}>
          Add Note
        </Button>
      </Box>
    </Box>
  );
};

export default NoteTaking;
