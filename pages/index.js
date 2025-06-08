import { useState } from "react";
import StartScreen from "../components/StartScreen";

export default function Home() {
  const [name, setName] = useState(null);

  if (!name) {
    return <StartScreen onNext={(userName) => setName(userName)} />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "Arial" }}>
      <h1>Hei {name}, la oss lage din perfekte jobbsøknad!</h1>
      <p>Vi guider deg steg for steg.</p>
    </div>
  );
}
