import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "../App.css"

const PdfDisplay = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [textFile, setTextFile]  = useState("")
 
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
    setPageNumber(1); 
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  const renderFile = () => {
    if (!uploadedFile) {
      return null;
    }

    if (uploadedFile.type === "application/pdf") {
      const pages = Array.from({ length: numPages }, (_, index) => index + 1);
      return (
        <Document
          file={URL.createObjectURL(uploadedFile)}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {pages.map((page) => (
            <Page key={page} pageNumber={page} />
          ))}
        </Document>
      );
    }

    // ... Other file type rendering logic ...

    return (
      <div>
        <p>Unsupported File Type: {uploadedFile.name}</p>
      </div>
    );
  };

  return (
    <div className="page">
      <nav>
        <input type="file" onChange={handleFileChange} />
        <button onClick={goToPrevPage} className="previous">
          Prev
        </button>
        <button onClick={goToNextPage} className="next">
          Next
        </button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </nav>

      {renderFile()}
    </div>
  );
};

export default PdfDisplay;
