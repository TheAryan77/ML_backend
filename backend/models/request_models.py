from pydantic import BaseModel

class EnergyInput(BaseModel):
    Voltage_V: float
    Current_A: float
    Power_Consumption_kW: float
    Reactive_Power_kVAR: float
    Power_Factor: float
    Solar_Power_kW: float
    Wind_Power_kW: float
    Grid_Supply_kW: float
    Voltage_Fluctuation: float
    Overload_Condition: int
    Transformer_Fault: int
    Temperature_C: float
    Humidity: float
    Electricity_Price: float
    Predicted_Load_kW: float
    hour: int
    is_weekend: int
    rolling_1h: float
    rolling_3h: float
    load_diff: float
    renewable_ratio: float
    grid_dependency: float
