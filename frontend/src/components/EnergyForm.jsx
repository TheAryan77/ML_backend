import { useState } from 'react';
import axios from 'axios';
import './EnergyForm.css';

// Update this with your deployed backend URL or use localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

function EnergyForm({ setResults, setLoading, loading }) {
  const [formData, setFormData] = useState({
    Voltage_V: '',
    Current_A: '',
    Power_Consumption_kW: '',
    Reactive_Power_kVAR: '',
    Power_Factor: '',
    Solar_Power_kW: '',
    Wind_Power_kW: '',
    Grid_Supply_kW: '',
    Voltage_Fluctuation: '',
    Overload_Condition: '0',
    Transformer_Fault: '0',
    Temperature_C: '',
    Humidity: '',
    Electricity_Price: '',
    Predicted_Load_kW: '',
    hour: '',
    is_weekend: '0',
    rolling_1h: '',
    rolling_3h: '',
    load_diff: '',
    renewable_ratio: '',
    grid_dependency: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Convert string values to numbers
      const payload = Object.entries(formData).reduce((acc, [key, value]) => {
        acc[key] = value === '' ? 0 : parseFloat(value);
        return acc;
      }, {});

      const response = await axios.post(`${API_URL}/predict/all`, payload);
      setResults(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to get prediction. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      Voltage_V: '',
      Current_A: '',
      Power_Consumption_kW: '',
      Reactive_Power_kVAR: '',
      Power_Factor: '',
      Solar_Power_kW: '',
      Wind_Power_kW: '',
      Grid_Supply_kW: '',
      Voltage_Fluctuation: '',
      Overload_Condition: '0',
      Transformer_Fault: '0',
      Temperature_C: '',
      Humidity: '',
      Electricity_Price: '',
      Predicted_Load_kW: '',
      hour: '',
      is_weekend: '0',
      rolling_1h: '',
      rolling_3h: '',
      load_diff: '',
      renewable_ratio: '',
      grid_dependency: ''
    });
    setResults(null);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="energy-form">
        <div className="form-card">
          <h2 className="form-title">Energy Data Input - Part 1</h2>
        <div className="form-section">
          <h3>⚡ Power Metrics</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Voltage (V)</label>
              <input
                type="number"
                step="any"
                name="Voltage_V"
                value={formData.Voltage_V}
                onChange={handleChange}
                placeholder="e.g., 230"
                required
              />
            </div>
            <div className="form-group">
              <label>Current (A)</label>
              <input
                type="number"
                step="any"
                name="Current_A"
                value={formData.Current_A}
                onChange={handleChange}
                placeholder="e.g., 10"
                required
              />
            </div>
            <div className="form-group">
              <label>Power Consumption (kW)</label>
              <input
                type="number"
                step="any"
                name="Power_Consumption_kW"
                value={formData.Power_Consumption_kW}
                onChange={handleChange}
                placeholder="e.g., 2.3"
                required
              />
            </div>
            <div className="form-group">
              <label>Reactive Power (kVAR)</label>
              <input
                type="number"
                step="any"
                name="Reactive_Power_kVAR"
                value={formData.Reactive_Power_kVAR}
                onChange={handleChange}
                placeholder="e.g., 0.5"
                required
              />
            </div>
            <div className="form-group">
              <label>Power Factor</label>
              <input
                type="number"
                step="any"
                name="Power_Factor"
                value={formData.Power_Factor}
                onChange={handleChange}
                placeholder="e.g., 0.85"
                required
              />
            </div>
            <div className="form-group">
              <label>Voltage Fluctuation (%)</label>
              <input
                type="number"
                step="any"
                name="Voltage_Fluctuation"
                value={formData.Voltage_Fluctuation}
                onChange={handleChange}
                placeholder="e.g., 2"
                required
              />
            </div>
          </div>
        </div>
        </div>

        <div className="form-card">
          <h2 className="form-title">Energy Data Input - Part 2</h2>
          <div className="form-section">
            <h3>🌱 Renewable Energy</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Solar Power (kW)</label>
              <input
                type="number"
                step="any"
                name="Solar_Power_kW"
                value={formData.Solar_Power_kW}
                onChange={handleChange}
                placeholder="e.g., 1.5"
              />
            </div>
            <div className="form-group">
              <label>Wind Power (kW)</label>
              <input
                type="number"
                step="any"
                name="Wind_Power_kW"
                value={formData.Wind_Power_kW}
                onChange={handleChange}
                placeholder="e.g., 0.8"
              />
            </div>
            <div className="form-group">
              <label>Grid Supply (kW)</label>
              <input
                type="number"
                step="any"
                name="Grid_Supply_kW"
                value={formData.Grid_Supply_kW}
                onChange={handleChange}
                placeholder="e.g., 2.0"
                required
              />
            </div>
            <div className="form-group">
              <label>Renewable Ratio</label>
              <input
                type="number"
                step="any"
                name="renewable_ratio"
                value={formData.renewable_ratio}
                onChange={handleChange}
                placeholder="e.g., 0.45"
              />
            </div>
            <div className="form-group">
              <label>Grid Dependency</label>
              <input
                type="number"
                step="any"
                name="grid_dependency"
                value={formData.grid_dependency}
                onChange={handleChange}
                placeholder="e.g., 0.55"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>🌡️ Environmental & System</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Temperature (°C)</label>
              <input
                type="number"
                step="any"
                name="Temperature_C"
                value={formData.Temperature_C}
                onChange={handleChange}
                placeholder="e.g., 25"
                required
              />
            </div>
            <div className="form-group">
              <label>Humidity (%)</label>
              <input
                type="number"
                step="any"
                name="Humidity"
                value={formData.Humidity}
                onChange={handleChange}
                placeholder="e.g., 60"
                required
              />
            </div>
            <div className="form-group">
              <label>Overload Condition</label>
              <select
                name="Overload_Condition"
                value={formData.Overload_Condition}
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Transformer Fault</label>
              <select
                name="Transformer_Fault"
                value={formData.Transformer_Fault}
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>📊 Additional Metrics</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Electricity Price (USD/kWh)</label>
              <input
                type="number"
                step="any"
                name="Electricity_Price"
                value={formData.Electricity_Price}
                onChange={handleChange}
                placeholder="e.g., 0.12"
                required
              />
            </div>
            <div className="form-group">
              <label>Predicted Load (kW)</label>
              <input
                type="number"
                step="any"
                name="Predicted_Load_kW"
                value={formData.Predicted_Load_kW}
                onChange={handleChange}
                placeholder="e.g., 2.5"
                required
              />
            </div>
            <div className="form-group">
              <label>Hour (0-23)</label>
              <input
                type="number"
                name="hour"
                min="0"
                max="23"
                value={formData.hour}
                onChange={handleChange}
                placeholder="e.g., 14"
                required
              />
            </div>
            <div className="form-group">
              <label>Is Weekend</label>
              <select
                name="is_weekend"
                value={formData.is_weekend}
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Rolling 1h Average</label>
              <input
                type="number"
                step="any"
                name="rolling_1h"
                value={formData.rolling_1h}
                onChange={handleChange}
                placeholder="e.g., 2.3"
              />
            </div>
            <div className="form-group">
              <label>Rolling 3h Average</label>
              <input
                type="number"
                step="any"
                name="rolling_3h"
                value={formData.rolling_3h}
                onChange={handleChange}
                placeholder="e.g., 2.2"
              />
            </div>
            <div className="form-group">
              <label>Load Difference</label>
              <input
                type="number"
                step="any"
                name="load_diff"
                value={formData.load_diff}
                onChange={handleChange}
                placeholder="e.g., 0.2"
              />
            </div>
          </div>
        </div>

        <div className="button-group-full">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? '🔄 Analyzing...' : '🚀 Analyze Energy Data'}
          </button>
          <button type="button" onClick={handleReset} className="reset-btn">
            🔄 Reset Form
          </button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default EnergyForm;
