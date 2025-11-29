from fastapi import APIRouter
from models.request_models import EnergyInput
from services.ml_service import predict_cluster

router = APIRouter()

@router.post("/simple")
def simple_prediction(data: EnergyInput):
    return predict_cluster(data)
