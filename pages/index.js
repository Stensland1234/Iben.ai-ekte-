import { useState } from 'react';

export default function Home() {
  const [mode, setMode] = useState(null);
  const [adText, setAdText] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [motivation, setMotivation] = useState('');

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Hei {`Espen`}, la oss lage din perfekte jobbsøknad</h1>
      {!mode && (
        <div>
          <p>Hva vil du starte med?</p>
          <button onClick={() => setMode('ad')}>📄 Lim inn stillingsannonse</button>
          <button onClick={() => setMode('open')}>📝 Åpen søknad</button>
        </div>
      )}

      {mode === 'ad' && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Lim inn stillingsannonse (tekst eller lenke)</h2>
          <textarea
            rows="10"
            cols="60"
            value={adText}
            onChange={(e) => setAdText(e.target.value)}
            placeholder="Lim inn teksten her..."
          />
          <br />
          <button onClick={() => alert('✅ OK! Går videre til analyse')}>Neste</button>
        </div>
      )}

      {mode === 'open' && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Åpen søknad</h2>
          <input
            placeholder="Firmanavn"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <br />
          <input
            placeholder="Ønsket rolle"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <br />
          <textarea
            rows="5"
            cols="60"
            placeholder="Hva vil du bidra med?"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
          />
          <br />
          <button onClick={() => alert('✅ OK! Går videre til generering')}>Neste</button>
        </div>
      )}
    </div>
  );
}
