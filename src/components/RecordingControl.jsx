import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaStop } from "react-icons/fa"; // Using react-icons for play and stop icons
import MenuItem from "@mui/material/MenuItem";
import { Box, TextField, Typography, Button } from "@mui/material";

const RecordingControl = ( onTimeUpdate ) => {
  const [isRecording, setIsRecording] = useState(false); 
  const [isPaused, setIsPaused] = useState(false); 
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [volume, setVolume] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0); // Duration of the recording in seconds
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const mediaRecorderRef = useRef(null); 
  const timerRef = useRef(null); // Reference to interval timer


  useEffect(() => {
    getAudioDevices();
  }, []);

  /*  Get all the audio devices and make them into a array*/
  const getAudioDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioDevices = devices.filter((device) => device.kind === "audioinput");
      setDevices(audioDevices);
      if (audioDevices.length > 0) setSelectedDevice(audioDevices[0].deviceId);
    } catch (error) {
      console.error("Error fetching audio devices: ", error);
    }
  };


  /* Use  navigator.mediaDevices.getUserMedia to get the audio data from selected devices */
  /* TODO:
        Error Handling if there are not input devices (but always have default?)
  */
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
      

      // start to record
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


      // Volume infor
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

  /* TODO: Add Ending recording and might not need pause can be replace by stop */


  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (!isPaused) {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
      } else {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
      }
    }
  };


  return (
    <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", width: "300px" }}>
      {/* Recording Button */}
      <button
        onClick={isRecording ? pauseRecording : startRecording}
        style={{
          padding: "10px 20px",
          backgroundColor: isRecording ? (isPaused ? "orange" : "red") : "#4A90E2",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {isRecording ? (
          isPaused ? (
            <>
              <FaPlay />
              Resume
            </>
          ) : (
            <>
              <FaPause />
              Pause
            </>
          )
        ) : (
          <>
            <FaPlay />
            Start Recording
          </>
        )}
      </button>

      {/* Volume */}
      <div style={{ marginTop: "20px" }}>
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
              backgroundColor: "blue",
              transition: "width 0.1s",
            }}
          ></div>
        </div>
      </div>

      {/* Device */}
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="audio-devices">Select Input Device:</label>
        <select
          id="audio-devices"
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
        >
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Microphone ${device.deviceId}`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RecordingControl;
