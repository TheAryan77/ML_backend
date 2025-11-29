from app.services.ml_service import predict_cluster_from_dict
from app.services.anomaly_service import detect_anomaly_from_dict
from app.utils.feature_generator import enrich_features

def simple_predict(user_data):
    features = enrich_features(user_data)
    c = predict_cluster_from_dict(features)
    a = detect_anomaly_from_dict(features)
    return {**c, **a}
