from pydantic import BaseModel

class UserEnergyInput(BaseModel):
    voltage: float
    current: float
    power_consumption: float
    solar_power: float = 0.0
    wind_power: float = 0.0
    temperature: float = 25.0
