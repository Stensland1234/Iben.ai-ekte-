export default function RoleSelection({ name, onNext }) {
  const handleSelect = (role) => {
    onNext(role);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial" }}>
      <h1>Hyggelig, {name}!</h1>
      <p>Hva slags rolle ønsker du deg?</p>
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => handleSelect("Markedsføring")} style={btnStyle}>
          Markedsføring
        </button>
        <button onClick={() => handleSelect("IT/Utvikling")} style={btnStyle}>
          IT / Utvikling
        </button>
        <button onClick={() => handleSelect("HR / Rekruttering")} style={btnStyle}>
          HR / Rekruttering
        </button>
        <button onClick={() => handleSelect("Salg / Kundeservice")} style={btnStyle}>
          Salg / Kundeservice
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  display: "block",
  margin: "10px auto",
  padding: "12px 30px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  backgroundColor: "#f5f5f5",
  cursor: "pointer",
};
