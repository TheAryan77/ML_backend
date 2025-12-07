import joblib
import json

scaler = joblib.load("app/artifacts/scaler.pkl")
pca = joblib.load("app/artifacts/pca.pkl")
kmeans = joblib.load("app/artifacts/kmeans_model.pkl")
iso = joblib.load("app/artifacts/anomaly_model.pkl")

with open("app/artifacts/feature_list.json") as f:
    feature_list = json.load(f)
