import { useState } from 'react';

export default function Home() {
  const [jobText, setJobText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!jobText.trim()) return;
    setLoading(true);
    setAnalysis('');

    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobText }),
    });

    const data = await response.json();
    setAnalysis(data.analysis || 'No analysis returned.');
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Iben.ai – Første analyse</h1>
      <p>Lim inn en stillingsannonse under:</p>
      <textarea
        rows={12}
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
        placeholder="Lim inn stillingsannonsen her..."
        style={{ width: '100%', padding: '1rem' }}
      />
      <button onClick={handleAnalyze} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        Analyser
      </button>

      {loading && <p>Analyserer…</p>}

      {analysis && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap', backgroundColor: '#f9f9f9', padding: '1rem' }}>
          <h3>Analyse:</h3>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
}
