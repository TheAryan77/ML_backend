import joblib
import pandas as pd
import json

scaler = joblib.load("artifacts/scaler.pkl")
iso = joblib.load("artifacts/anomaly_model.pkl")

# Load expected feature names
with open("artifacts/feature_list.json", "r") as f:
    expected_features = json.load(f)

# Mapping from API field names to model feature names
FEATURE_NAME_MAP = {
    "Voltage_V": "Voltage (V)",
    "Current_A": "Current (A)",
    "Power_Consumption_kW": "Power Consumption (kW)",
    "Reactive_Power_kVAR": "Reactive Power (kVAR)",
    "Power_Factor": "Power Factor",
    "Solar_Power_kW": "Solar Power (kW)",
    "Wind_Power_kW": "Wind Power (kW)",
    "Grid_Supply_kW": "Grid Supply (kW)",
    "Voltage_Fluctuation": "Voltage Fluctuation (%)",
    "Overload_Condition": "Overload Condition",
    "Transformer_Fault": "Transformer Fault",
    "Temperature_C": "Temperature (°C)",
    "Humidity": "Humidity (%)",
    "Electricity_Price": "Electricity Price (USD/kWh)",
    "Predicted_Load_kW": "Predicted Load (kW)",
    "hour": "hour",
    "is_weekend": "is_weekend",
    "rolling_1h": "rolling_1h",
    "rolling_3h": "rolling_3h",
    "load_diff": "load_diff",
    "renewable_ratio": "renewable_ratio",
    "grid_dependency": "grid_dependency"
}

def detect_anomaly(data):
    # Convert to dict and rename columns
    data_dict = data.dict()
    renamed_dict = {FEATURE_NAME_MAP.get(k, k): v for k, v in data_dict.items()}
    
    # Create DataFrame with expected column names
    df = pd.DataFrame([renamed_dict])
    df = df[expected_features]  # Ensure correct column order
    
    X = scaler.transform(df)
    pred = iso.predict(X)[0]
    score = iso.decision_function(X)[0]
    return {
        "is_anomaly": int(pred == -1),
        "anomaly_score": float(score)
    }
def detect_anomaly_from_dict(features: dict):
    df = pd.DataFrame([features])
    df = df[feature_list]
    X = scaler.transform(df)
    pred = iso.predict(X)[0]
    score = iso.decision_function(X)[0]
    return {
        "is_anomaly": int(pred == -1),
        "anomaly_score": float(score)
    }