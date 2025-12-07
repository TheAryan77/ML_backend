from fastapi import APIRouter
from services.ml_service import predict_cluster
from services.anomaly_service import detect_anomaly
from models.request_models import EnergyInput

router = APIRouter()

@router.post("/cluster")
def cluster_endpoint(data: EnergyInput):
    return predict_cluster(data)

@router.post("/anomaly")
def anomaly_endpoint(data: EnergyInput):
    return detect_anomaly(data)

@router.post("/all")
def full_pipeline(data: EnergyInput):
    out1 = predict_cluster(data)
    out2 = detect_anomaly(data)
    return {**out1, **out2}
