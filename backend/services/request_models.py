from pydantic import BaseModel

class EnergyInput(BaseModel):
    Voltage: float
    Current: float
    Power_Consumption: float
    Reactive_Power: float
    Power_Factor: float
    Solar_Power: float
    Wind_Power: float
    Grid_Supply: float
    Voltage_Fluctuation: float
    Overload_Condition: int
    Transformer_Fault: int
    Temperature: float
    Humidity: float
    Electricity_Price: float
    Predicted_Load: float
    hour: int
    is_weekend: int
    rolling_1h: float
    rolling_3h: float
    load_diff: float
    renewable_ratio: float
    grid_dependency: float
