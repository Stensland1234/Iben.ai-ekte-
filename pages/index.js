import { useState } from 'react';

export default function Home() {
  const [step, setStep] = useState('start');
  const [inputText, setInputText] = useState('');

  const handleStart = (type) => {
    setStep(type);
  };

  const handleSubmit = () => {
    setStep('analyse');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-6">Velkommen til Iben.ai</h1>

      {step === 'start' && (
        <div className="space-y-4">
          <p className="text-lg">Hva vil du gjøre?</p>
          <button
            onClick={() => handleStart('annonse')}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow"
          >
            📄 Lim inn stillingsannonse
          </button>
          <button
            onClick={() => handleStart('aapen')}
            className="px-4 py-2 bg-green-600 text-white rounded shadow"
          >
            📝 Åpen søknad
          </button>
        </div>
      )}

      {(step === 'annonse' || step === 'aapen') && (
        <div className="space-y-4 max-w-xl w-full mt-4">
          <textarea
            rows={8}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder={step === 'annonse' ? "Lim inn hele stillingsannonsen her..." : "Skriv hvilken stilling du søker og hvilket firma det gjelder..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-600 text-white rounded shadow"
          >
            Analyser teksten
          </button>
        </div>
      )}

      {step === 'analyse' && (
        <div className="mt-6 max-w-xl">
          <h2 className="text-xl font-semibold mb-4">🧠 Iben sin første analyse:</h2>
          <p className="text-left whitespace-pre-line bg-white p-4 border rounded">
            {inputText}
          </p>
          <p className="mt-4">✅ Neste: Generere søknad, CV og Gameplan basert på dette.</p>
        </div>
      )}
    </div>
  );
}
