from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.predict_routes import router as predict_router
from routes.simple_predict_routes import router as simple_router
from routes.health_routes import router as health_router
from routes.rag_routes import router as rag_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/health")
app.include_router(predict_router, prefix="/predict")
app.include_router(simple_router, prefix="/predict")
app.include_router(rag_router, prefix="/rag")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
