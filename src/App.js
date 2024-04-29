import React, { useState } from "react";
import "./App.css";
function App() {
  const [qr, setQr] = useState("");
  const [loading, isLoading] = useState(false);
  const [qrData, setQrData] = useState("https://github.com/ajithak-dev");
  const [size, setSize] = useState("150");

  async function generateQr() {
    try {
      isLoading(true);
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${qrData}`;
      setQr(url);
    } catch (error) {
      console.log("Error while creating QR Code", error);
    } finally {
      isLoading(false);
    }
  }
  function downloadQr() {
    fetch(qr)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  return (
    <div className="app-container">
      <h1>QR CODE <span>GENERATOR</span></h1>
      {loading && <p>Please wait...</p>}
      {qr && <img src={qr} alt="qrcode" />}
      <div>
        <label htmlFor="generator" className="label">
          URL for QR Code
        </label>
        <input
          type="text"
          className="input-detail"
          name="url"
          placeholder="Enter your URL here"
          onChange={(e) => {
            setQrData(e.target.value);
          }}
        />
        <label htmlFor="generator" className="label">
          Size for QR Code eg.300
        </label>
        <input
          type="text"
          className="input-detail"
          name="size"
          placeholder="Give the size you want"
          onChange={(e) => {
            setSize(e.target.value);
          }}
        />
        <button
          className="btn-generate"
          disabled={loading}
          onClick={generateQr}
        >
          Generate
        </button>
        <button className="btn-download" onClick={downloadQr}>
          Download
        </button>
        <h4>
          Designed by <a href="https://github.com/ajithak-dev">Ajith</a>
        </h4>
      </div>
    </div>
  );
}

export default App;
