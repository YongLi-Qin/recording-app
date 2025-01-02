import React, { useState } from "react";
import { Box, TextField, Typography, Button, List, ListItem } from "@mui/material";

const NoteTaking = ({ currentRecordingTime }) => {
  const [note, setNote] = useState(""); 
  const [notes, setNotes] = useState([]); 

  const handleAddNote = () => {
    if (note.trim() !== "") {
      setNotes([
        ...notes,
        {
          timestamp: currentRecordingTime, 
          content: note,
        },
      ]);
      setNote(""); 
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        width: "600px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Notepad
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <List>
          {notes.map((noteItem, index) => (
            <ListItem key={index} disablePadding>
              <Typography>
                <strong>{noteItem.timestamp}</strong> {noteItem.content}
              </Typography>
            </ListItem>
          ))}
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
