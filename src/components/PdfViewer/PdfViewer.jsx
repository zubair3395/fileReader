import React, { useEffect, useRef, useState } from 'react';

export default function PdfViewerComponent() {
  const containerRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [pspdfInstance, setPSPDFInstance] = useState(null); // Add this state

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  useEffect(() => {
    const container = containerRef.current;

    if (uploadedFile) {
      let instance, PSPDFKit;

      (async function () {
        PSPDFKit = await import('pspdfkit');

        PSPDFKit.unload(container); // Ensure that there's only one PSPDFKit instance.

        instance = await PSPDFKit.load({
          // Container where PSPDFKit should be mounted.
          container,
          // The document to open.
          document: uploadedFile,
          // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
          baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
        });

        setPSPDFInstance(instance); // Set the instance in state
      })();
    }

    return () => {
      if (pspdfInstance) {
        pspdfInstance.unload(); // Unload the instance when component is unmounted
      }
    };
  }, [uploadedFile, pspdfInstance]); // Add pspdfInstance to the dependency array

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
}
