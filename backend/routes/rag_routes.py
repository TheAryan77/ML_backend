from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def rag_info():
    return {"msg": "RAG module coming soon"}