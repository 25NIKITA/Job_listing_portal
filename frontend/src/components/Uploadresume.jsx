import React, { useState } from "react";
import "./Uploadresume.css";

const UploadResume = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      alert(`Resume ${file.name} uploaded successfully!`);
      // You can add your file upload logic here
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div className="upload-resume-container">
      <h2>Upload Your Resume</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {file && <p>Selected file: {file.name}</p>}
    </div>
  );
};

export default UploadResume;
