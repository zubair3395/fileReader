import React, { useState } from "react";
import "../App.css"

const FileViewer = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="page">
      <nav>
        <input type="file" onChange={handleFileChange} />
      </nav>

      {file && (
        <iframe
          title="File Viewer"
          src={URL.createObjectURL(file)}
          style={{ width: "100%", height: "500px", border: "none" }}
        />
      )}
    </div>
  );
};

export default FileViewer;
