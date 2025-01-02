import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Typography, Button, List, ListItem, Divider } from "@mui/material";

const NoteTaking = ({ currentRecordingTime, sx, onNotesUpdate }) => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const notesEndRef = useRef(null);

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
        onNotesUpdate(newNotes); // Send updated notes to parent
      }
    }
  };

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
                  <Typography variant="caption" color="textSecondary">
                    {`Recording Time: ${noteItem.recordingTime} | Current Time: ${noteItem.currentTime}`}
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
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          label="Enter your note"
          variant="outlined"
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddNote}>
          Add Note
        </Button>
      </Box>
    </Box>
  );
};

export default NoteTaking;
