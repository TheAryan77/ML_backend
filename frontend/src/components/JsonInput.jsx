import { useState } from 'react';
import axios from 'axios';
import './JsonInput.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

function JsonInput({ setResults, setLoading, loading }) {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Parse the JSON
      const data = JSON.parse(jsonText);
      
      // Send to backend
      const response = await axios.post(`${API_URL}/predict/all`, data);
      setResults(response.data);
      setError('');
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON format. Please check your input.');
      } else {
        setError('Failed to get prediction. Make sure the backend is running.');
      }
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setJsonText('');
    setError('');
    setResults(null);
  };

  const sampleJson = {
    "Voltage_V": 222,
    "Current_A": 9.8,
    "Power_Consumption_kW": 3.20,
    "Reactive_Power_kVAR": 0.90,
    "Power_Factor": 0.82,
    "Solar_Power_kW": 0.00,
    "Wind_Power_kW": 0.00,
    "Grid_Supply_kW": 3.20,
    "Voltage_Fluctuation": 4.2,
    "Overload_Condition": 0,
    "Transformer_Fault": 0,
    "Temperature_C": 30,
    "Humidity": 52,
    "Electricity_Price": 0.18,
    "Predicted_Load_kW": 3.45,
    "hour": 20,
    "is_weekend": 1,
    "rolling_1h": 3.10,
    "rolling_3h": 2.95,
    "load_diff": 0.10,
    "renewable_ratio": 0.00,
    "grid_dependency": 1.00
  };

  const loadSample = () => {
    setJsonText(JSON.stringify(sampleJson, null, 2));
    setError('');
  };

  return (
    <div className="json-input-card">
      <div className="json-header">
        <h2 className="json-title">
          <span className="json-icon">📋</span>
          Quick JSON Input
        </h2>
        <button type="button" onClick={loadSample} className="sample-btn">
          Load Sample
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="json-form">
        <textarea
          className="json-textarea"
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder='Paste your JSON here, e.g.:
{
  "Voltage_V": 222,
  "Current_A": 9.8,
  "Power_Consumption_kW": 3.20,
  ...
}'
          rows={12}
        />
        
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <div className="json-button-group">
          <button type="submit" className="analyze-btn" disabled={loading || !jsonText}>
            {loading ? '🔄 Analyzing...' : '🚀 Analyze JSON Data'}
          </button>
          <button type="button" onClick={handleClear} className="clear-btn">
            🗑️ Clear
          </button>
        </div>
      </form>

      <div className="json-info">
        💡 <strong>Tip:</strong> Paste your JSON data above and click "Analyze JSON Data" for instant predictions.
      </div>
    </div>
  );
}

export default JsonInput;
