from datetime import datetime
import math

def enrich_features(data):
    now = datetime.now()

    voltage_nominal = 230
    power_factor = 0.85

    reactive_power = data.power_consumption * math.tan(math.acos(power_factor))
    grid_supply = max(
        data.power_consumption - (data.solar_power + data.wind_power),
        0
    )

    voltage_fluctuation = abs(data.voltage - voltage_nominal) / voltage_nominal * 100

    overload = int(data.power_consumption > 8.0)
    transformer_fault = int(voltage_fluctuation > 10 or overload == 1)

    rolling_1h = data.power_consumption * 0.25
    rolling_3h = data.power_consumption * 0.22
    load_diff = data.power_consumption - rolling_1h

    renewable_ratio = (
        data.solar_power + data.wind_power
    ) / (data.power_consumption + 1e-6)

    grid_dependency = grid_supply / (data.power_consumption + 1e-6)

    electricity_price = 0.30 if 18 <= now.hour <= 22 else 0.12

    return {
        "Voltage_V": data.voltage,
        "Current_A": data.current,
        "Power_Consumption_kW": data.power_consumption,
        "Reactive_Power_kVAR": reactive_power,
        "Power_Factor": power_factor,
        "Solar_Power_kW": data.solar_power,
        "Wind_Power_kW": data.wind_power,
        "Grid_Supply_kW": grid_supply,
        "Voltage_Fluctuation": voltage_fluctuation,
        "Overload_Condition": overload,
        "Transformer_Fault": transformer_fault,
        "Temperature_C": data.temperature,
        "Humidity": 50,
        "Electricity_Price": electricity_price,
        "Predicted_Load_kW": rolling_3h,
        "hour": now.hour,
        "is_weekend": int(now.weekday() >= 5),
        "rolling_1h": rolling_1h,
        "rolling_3h": rolling_3h,
        "load_diff": load_diff,
        "renewable_ratio": renewable_ratio,
        "grid_dependency": grid_dependency
    }
