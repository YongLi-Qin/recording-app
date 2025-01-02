import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaStop } from "react-icons/fa"; // Using react-icons for play and stop icons
import { Box, TextField, Typography, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const RecordingControl = ({ onTimeUpdate, onStop }) => {
  const [isRecording, setIsRecording] = useState(false); // Indicates if recording is active
  const [devices, setDevices] = useState([]); // List of available audio input devices
  const [selectedDevice, setSelectedDevice] = useState(""); // Selected audio input device
  const [volume, setVolume] = useState(0); // Current volume level
  const [recordingTime, setRecordingTime] = useState(0); // Duration of the recording in seconds
  const audioContextRef = useRef(null); // Reference to AudioContext
  const analyserRef = useRef(null); // Reference to audio analyser
  const dataArrayRef = useRef(null); // Reference to data array for analyser
  const animationFrameIdRef = useRef(null); // Reference to animation frame ID
  const mediaRecorderRef = useRef(null); // Reference to MediaRecorder instance
  const timerRef = useRef(null); // Reference to interval timer

  // Fetch available audio input devices when the component mounts
  useEffect(() => {
    const getAudioDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioDevices = devices.filter((device) => device.kind === "audioinput");
      setDevices(audioDevices);
      if (audioDevices.length > 0) setSelectedDevice(audioDevices[0].deviceId);
    };
    getAudioDevices();
  }, []);

  // Start recording using the selected audio device
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: selectedDevice ? { exact: selectedDevice } : undefined },
      });

      // Setup audio context and analyser
      audioContextRef.current = new AudioContext();
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      dataArrayRef.current = dataArray;

      // Setup media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);

      // Start recording timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => {
          const newTime = prevTime + 1;
          if (onTimeUpdate) {
            onTimeUpdate(formatTime(newTime)); // Update parent component with formatted time
          }
          return newTime;
        });
      }, 1000);

      // Continuously update volume level
      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        const volumeLevel = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
        setVolume(volumeLevel);
        animationFrameIdRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
    } catch (error) {
      console.error("Error accessing microphone: ", error);
      alert("Could not access microphone. Please check your permissions.");
    }
  };

  // Stop recording and reset the state
  const stopRecording = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      cancelAnimationFrame(animationFrameIdRef.current);
      setIsRecording(false);
      setVolume(0);
      clearInterval(timerRef.current);
  
      if (onTimeUpdate) {
        onTimeUpdate("00:00");
      }
  
      // Ensure the onStop callback is called correctly
      if (onStop) {
        onStop(); // Notify parent component
      }
    }
  };
  // Format time from seconds to "MM:SS" format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: "400px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Recording Control
      </Typography>

      {/* Recording button and timer display */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          variant="contained"
          color={isRecording ? "error" : "primary"}
          startIcon={isRecording ? <FaStop /> : <FaPlay />}
          sx={{ width: "200px" }}
        >
          {isRecording ? "End Recording" : "Start Recording"}
        </Button>
        <Typography variant="body1">{isRecording ? formatTime(recordingTime) : "00:00"}</Typography>
      </Box>

      {/* Volume display */}
      <div>
        <label>Volume Level:</label>
        <div
          style={{
            width: "100%",
            height: "10px",
            backgroundColor: "#ddd",
            borderRadius: "5px",
            marginTop: "5px",
          }}
        >
          <div
            style={{
              width: `${Math.min(volume, 100)}%`,
              height: "100%",
              backgroundColor: "lightblue",
              transition: "width 0.1s",
            }}
          ></div>
        </div>
      </div>

      {/* Audio input device selection */}
      <TextField
        select
        label="Select Input Device"
        variant="outlined"
        fullWidth
        value={selectedDevice}
        onChange={(e) => setSelectedDevice(e.target.value)}
        sx={{ marginTop: "20px" }}
      >
        {devices.map((device) => (
          <MenuItem key={device.deviceId} value={device.deviceId}>
            {device.label || `Microphone ${device.deviceId}`}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default RecordingControl;
