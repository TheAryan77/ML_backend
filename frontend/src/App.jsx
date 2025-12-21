import { useState } from 'react';
import './App.css';
import JsonInput from './components/JsonInput';
import EnergyForm from './components/EnergyForm';
import Results from './components/Results';
import Header from './components/Header';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="app">
      <Header />
      <div className="container">
        <JsonInput 
          setResults={setResults}
          setLoading={setLoading}
          loading={loading}
        />
        
        {results && (
          <div className="results-section">
            <Results results={results} />
          </div>
        )}
        
        <div className="divider">
          <span className="divider-text">OR USE MANUAL FORM</span>
        </div>
        
        <div className="main-content">
          <EnergyForm 
            setResults={setResults} 
            setLoading={setLoading}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
