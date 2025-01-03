import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaStop, FaPause } from "react-icons/fa";
import { Box, TextField, Typography, Button, MenuItem } from "@mui/material";
import "../css/RecordingControl.css";

const RecordingControl = ({ onTimeUpdate, onStop, onReset }) => {
  const [isRecording, setIsRecording] = useState(false); // Indicates if recording is active
  const [isStopped, setIsStopped] = useState(false); // Indicates if recording is stopped
  const [isPaused, setIsPaused] = useState(false); // Indicates if recording is paused
  const [devices, setDevices] = useState([]); // List of audio input devices
  const [selectedDevice, setSelectedDevice] = useState(""); // Selected audio input device
  const [volume, setVolume] = useState(0); // Current volume level
  const [recordingTime, setRecordingTime] = useState(0); // Current recording time in seconds
  const audioContextRef = useRef(null); // Reference to AudioContext
  const analyserRef = useRef(null); // Reference to AnalyserNode
  const dataArrayRef = useRef(null); // Reference to audio data array
  const animationFrameIdRef = useRef(null); // Reference to animation frame ID
  const mediaRecorderRef = useRef(null); // Reference to MediaRecorder
  const timerRef = useRef(null); // Reference to recording timer

  // Fetch audio input devices on component mount
  useEffect(() => {
    const getAudioDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioDevices = devices.filter((device) => device.kind === "audioinput");
      setDevices(audioDevices);
      if (audioDevices.length > 0) setSelectedDevice(audioDevices[0].deviceId);
    };
    getAudioDevices();
  }, []);

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: selectedDevice ? { exact: selectedDevice } : undefined },
      });

      audioContextRef.current = new AudioContext();
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      dataArrayRef.current = dataArray;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);
      setIsStopped(false);
      setIsPaused(false);

      // Timer to update recording time
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => {
          const newTime = prevTime + 1;
          if (onTimeUpdate) {
            onTimeUpdate(formatTime(newTime));
          }
          return newTime;
        });
      }, 1000);

      // Update volume level
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

  // Stop recording
  const stopRecording = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      cancelAnimationFrame(animationFrameIdRef.current);
      setIsRecording(false);
      setIsStopped(true);
      setVolume(0);
      clearInterval(timerRef.current);

      if (onTimeUpdate) {
        onTimeUpdate("00:00");
      }

      if (onStop) {
        onStop();
      }
    }
  };

  // Reset recording
  const resetRecording = () => {
    setRecordingTime(0);
    setIsStopped(false);
    setIsPaused(false);
    if (onReset) {
      onReset();
    }
  };

  // Pause recording
  const pauseRecording = () => {
    setIsPaused(true);
    clearInterval(timerRef.current);
    mediaRecorderRef.current?.pause();
  };

  // Resume recording
  const resumeRecording = () => {
    setIsPaused(false);
    mediaRecorderRef.current?.resume();
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => {
        const newTime = prevTime + 1;
        if (onTimeUpdate) {
          onTimeUpdate(formatTime(newTime));
        }
        return newTime;
      });
    }, 1000);
  };

  // Format time in MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <Box className="recording-control">
      <Typography variant="h6" gutterBottom>
        Recording Control
      </Typography>

      <Box className="recording-control-header" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={isStopped ? resetRecording : isRecording ? stopRecording : startRecording}
            variant="contained"
            color={isStopped ? "success" : isRecording ? "error" : "primary"}
            startIcon={isRecording ? <FaStop /> : <FaPlay />}
          >
            {isStopped ? "New Recording" : isRecording ? "End Recording" : "Start Recording"}
          </Button>
          {isRecording && !isStopped && (
            <Button
              onClick={isPaused ? resumeRecording : pauseRecording}
              variant="contained"
              color="warning"
              startIcon={isPaused ? <FaPlay /> : <FaPause />}
            >
              {isPaused ? "Resume" : "Pause"}
            </Button>
          )}
        </Box>
        <Typography variant="body1" sx={{ marginLeft: "20px" }}>{formatTime(recordingTime)}</Typography>
      </Box>

      <div className="volume-section">
        <label>Volume Level:</label>
        <div className="volume-bar-container">
          <div className="volume-bar" style={{ width: `${Math.min(volume, 100)}%` }}></div>
        </div>
      </div>

      <TextField
        select
        label="Select Input Device"
        variant="outlined"
        fullWidth
        value={selectedDevice}
        onChange={(e) => setSelectedDevice(e.target.value)}
        sx={{ marginTop: "40px" }}
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