import { useState } from "react";

export default function StartScreen({ onNext }) {
  const [name, setName] = useState("");

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial" }}>
      <h1>Hei, og velkommen til Iben.ai</h1>
      <p>Hva heter du?</p>
      <input
        type="text"
        placeholder="Skriv fornavn"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", marginTop: "10px" }}
      />
      <br />
      <button
        onClick={() => onNext(name)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        disabled={!name}
      >
        Start
      </button>
    </div>
  );
}
