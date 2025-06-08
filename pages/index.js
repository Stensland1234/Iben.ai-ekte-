import { useState } from "react";

export default function Home() {
  const [annonse, setAnnonse] = useState("");
  const [resultat, setResultat] = useState("");

  const analyserStillingsannonse = async () => {
    setResultat("Analyserer...");

    const response = await fetch("/api/analyse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ annonse }),
    });

    if (!response.ok) {
      setResultat("Det oppstod en feil. Prøv igjen.");
      return;
    }

    const data = await response.json();
    setResultat(data.analyse);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Iben.ai – Analyse av stillingsannonse</h1>

      <textarea
        rows={12}
        style={{ width: "100%", padding: "1rem", fontSize: "1rem" }}
        placeholder="Lim inn stillingsannonsen her..."
        value={annonse}
        onChange={(e) => setAnnonse(e.target.value)}
      />

      <button
        style={{
          marginTop: "1rem",
          padding: "1rem 2rem",
          fontSize: "1rem",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
        onClick={analyserStillingsannonse}
      >
        Start analyse
      </button>

      <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
        {resultat}
      </div>
    </div>
  );
}
