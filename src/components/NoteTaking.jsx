import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, Typography, Button, List, ListItem, Divider } from "@mui/material";
import "../css/NoteTaking.css";

const NoteTaking = ({ currentRecordingTime, sx, onNotesUpdate }) => {
  const [note, setNote] = useState(""); // Current note being typed
  const [notes, setNotes] = useState([]); // List of all notes
  const notesEndRef = useRef(null); // Reference to the end of the notes list

  // Add a new note to the list
  const handleAddNote = () => {
    if (note.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const newNotes = [
        ...notes,
        { recordingTime: currentRecordingTime, currentTime, content: note },
      ];
      setNotes(newNotes);
      setNote("");

      if (onNotesUpdate) {
        onNotesUpdate(newNotes);
      }
    }
  };

  // Automatically scroll to the newest note
  useEffect(() => {
    if (notesEndRef.current) {
      notesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [notes]);

  // Handle "Enter" key press in the text field
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default form submission
      handleAddNote(); // Trigger the add note action
    }
  };

  return (
    <Box className="note-taking" style={sx}>
      <Typography variant="h6" gutterBottom>
        Notepad
      </Typography>
      <Box className="note-list">
        <List>
          {notes.map((noteItem, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <Box className="note-item">
                  <Typography variant="caption" color="textSecondary">
                    {`Recording Time: ${noteItem.recordingTime}`}
                  </Typography>
                  <Typography variant="body1">{noteItem.content}</Typography>
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
          <div ref={notesEndRef} />
        </List>
      </Box>
      <Box className="note-input" sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <TextField
          label="Enter your note"
          variant="outlined"
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyPress={handleKeyPress} // Listen for the Enter key
        />
        <Button variant="contained" color="primary" onClick={handleAddNote}>
          Add Note
        </Button>
      </Box>
    </Box>
  );
};

export default NoteTaking;
