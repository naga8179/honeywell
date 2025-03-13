import { useState } from "react";
import axios from "axios";
import { Clipboard } from "lucide-react";
import honeywellLogo from "./assets/Honeywell-Symbol.png";

function App() {
  const [inputText, setInputText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [loading, setLoading] = useState(false);
  const BASE_URL = "http://localhost:8082/honeywell"; // Update if needed

  const handleEncrypt = async () => {
    setLoading(true);
    setDecryptedText(""); // Explicitly clear the decrypted text
    setEncryptedText(""); // Reset encrypted text to avoid UI flicker
    
    try {
      const response = await axios.post(
        `${BASE_URL}/encrypt`,
        inputText, // Sending raw text
        { headers: { "Content-Type": "text/plain" } }
      );
      setEncryptedText(response.data);
    } catch (error) {
      alert("Error encrypting text: " + (error.response?.data || error.message));
    }
    
    setLoading(false);
  };
  

  const handleDecrypt = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/decrypt`,
        encryptedText, // Sending raw text
        { headers: { "Content-Type": "text/plain" } }
      );
      setDecryptedText(response.data);
    } catch (error) {
      alert("Error decrypting text: " + (error.response?.data || error.message));
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(encryptedText);
    alert("Copied to clipboard!");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>React Encryption App</h2>
      <img src={honeywellLogo} alt="Honeywell Logo" style={{ 
    width: "100px", 
    display: "block", 
    margin: "0 auto 10px" 
  }}  />

      <input
        type="text"
        placeholder="Enter text to encrypt"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{ padding: "10px", marginBottom: "10px", width: "300px" }}
      />
      <br />

      <button onClick={handleEncrypt} disabled={loading} style={{ marginRight: "10px", padding: "10px" }}>
        Encrypt
      </button>
      <button onClick={handleDecrypt} disabled={!encryptedText || loading} style={{ padding: "10px" }}>
        Decrypt
      </button>

<br />
<br />
{encryptedText && (
  <div style={{ 
    marginTop: "20px", 
    padding: "10px", 
    backgroundColor: "#f3f3f3", 
    display: "inline-block", 
    borderRadius: "5px", 
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)", 
    maxWidth: "400px",  // Restricts width
    wordWrap: "break-word",  // Allows text to wrap
    whiteSpace: "pre-wrap"  // Maintains formatting
  }}>

    
    <h3>Encrypted Text:</h3>
    <p style={{ 
      display: "block", 
      marginBottom: "10px", 
      wordWrap: "break-word", 
      whiteSpace: "pre-wrap"  // Ensures it breaks into multiple lines
    }}>
      {encryptedText}
    </p>
    <button onClick={copyToClipboard} style={{ background: "none", border: "none", cursor: "pointer" }}>
      <Clipboard size={20} />
    </button>
  </div>
)}
<br />
<br />


      {decryptedText && (
        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#e3ffe3", display: "inline-block", borderRadius: "5px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
          <h3>Decrypted Text:</h3>
          <p>{decryptedText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
