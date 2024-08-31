import './App.css';
import QRCode from 'react-qr-code';
import { useState, useRef } from 'react';

function App() {
  const [text, setText] = useState('');
  const qrCodeRef = useRef(null); 
  function handleChange(e) {
    setText(e.target.value);
  }

  const handleDownload = () => {
    const svg = qrCodeRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="App">
      <h1>QR Code</h1>
      <div ref={qrCodeRef}>
        <QRCode value={text} />
      </div>
      <div className="input-here">
        <p>Enter your text here</p>
        <input
          type="text"
          value={text}
          onChange={(e) => handleChange(e)}
        />
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}

export default App;

