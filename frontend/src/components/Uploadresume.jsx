import React, { useState } from "react";
import "./Uploadresume.css";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      setUploading(true); // Set uploading state to true
      const formData = new FormData();
      formData.append("resume", file);

      try {
        const response = await fetch(`http://localhost:5000/upload-resume`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          alert(`Resume ${file.name} uploaded successfully with ID: ${data.resumeId}`);
        } else {
          const errorData = await response.json();
          alert(`Failed to upload resume: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error uploading resume:", error);
        alert("Error uploading resume.");
      } finally {
        setUploading(false); // Set uploading state back to false
      }
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div className="upload-resume-container">
      <h2>Upload Your Resume</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {file && <p>Selected file: {file.name}</p>}
    </div>
  );
};

export default UploadResume;
