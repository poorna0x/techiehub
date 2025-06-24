import React, { useState } from "react";

export default function Upload({ handleImageUpload }) {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(URL.createObjectURL(uploadedFile));
    setFileType(uploadedFile.type);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const mediaFile = event.dataTransfer.files[0];
    setFile(URL.createObjectURL(mediaFile));
    setFileType(mediaFile.type);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
  };

  const handleUpload = (event) => {
    event.preventDefault();
    handleImageUpload(fileType, file);
  };

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
        }}
      >
        {file && (
          <div>
            {fileType.startsWith("image") ? (
              <img src={file} alt="Preview" style={{ maxWidth: "90%" }} />
            ) : (
              <video src={file} controls style={{ maxWidth: "90%" }} />
            )}
          </div>
        )}

        <h2>Select files to begin</h2>
        <p>Drag & drop an image or video here or click to select one</p>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
        />
      </div>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </>
  );
}
