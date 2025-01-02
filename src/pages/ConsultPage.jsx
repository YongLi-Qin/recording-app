import React from "react";
import RecordingControl from "../components/RecordingControl";
import PatientInformation from "../components/PatientInformation";

const ConsultPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* Recording Section */}
      <div
        style={{
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <RecordingControl />
      </div>

      {/* Patient Selection */}
      <div
        style={{
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <PatientInformation />
      </div>
    </div>
  );
};

export default ConsultPage;
