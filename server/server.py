import tempfile
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from query_data import query_rag
from ingest import ingest

from fastapi import UploadFile, File
import uuid
import os
from summarize_pdf import summarize_pdf


app = FastAPI(title="RAG Chat API", version="1.0.0")


# Allow local dev (Vite default port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000/citizen", "http://127.0.0.1:3000", "*"] , # tighten in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AskRequest(BaseModel):
    question: str


class AskResponse(BaseModel):
    answer: str
    sources: list[str]


class IngestRequest(BaseModel):
    reset: bool = False


@app.get("/api/health")
async def health():
    return {"status": "ok"}

# --------- Language detection helper ----------
def detect_language(text: str) -> str:
    """
    Detects language from input text.
    Returns 'hi' for Hindi, 'mr' for Marathi, 'en' for English/fallback.
    """
    try:
        lang = detect(text)
        # Simple logic: Hindi/Marathi
        if lang == "hi":
            # Marathi keywords check
            marathi_keywords = ["आहे", "नाही", "काय", "कसे", "अर्ज", "योजना"]
            if any(word in text for word in marathi_keywords):
                return "mr"
            return "hi"
    except:
        pass
    return "en"

# --------- Helper to create language-specific system prompt ----------
def build_system_prompt(lang: str) -> str:
    if lang == "hi":
        return "आप एक सहायक एआई हैं। उपयोगकर्ता के प्रश्न का उत्तर केवल हिंदी में दें। अंग्रेज़ी का उपयोग न करें।"
    elif lang == "mr":
        return "तुम्ही एक सहाय्यक एआय आहात. वापरकर्त्याच्या प्रश्नाचे उत्तर फक्त मराठीत द्या. इंग्रजी वापरू नका."
    else:
        return "You are a helpful AI assistant. Answer the user's question in English."

@app.post("/api/ask", response_model=AskResponse)
async def ask(req: AskRequest):
    answer, sources = query_rag(req.question)
    return AskResponse(answer=answer, sources=sources)


@app.post("/api/ingest")
async def run_ingest(req: IngestRequest):
    ingest(reset=req.reset)
    return {"status": "ingested", "reset": req.reset}

from recommend import recommend_schemes

class ProfileRequest(BaseModel):
    age: str
    gender: str
    income: str
    occupation: str
    location: str
    casteCategory: str
    disability: str


@app.post("/api/recommend")
async def recommend(profile: ProfileRequest):
    schemes = recommend_schemes(profile.dict())
    return schemes

@app.post("/api/summarize-pdf")
async def summarize_pdf_api(file: UploadFile = File(...)):
    # Save uploaded PDF temporarily
    temp_path = os.path.join(
    tempfile.gettempdir(),
    f"{uuid.uuid4()}.pdf"
    )

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    # Run summarization
    summary = summarize_pdf(temp_path)

    # Optional: cleanup
    try:
        os.remove(temp_path)
    except Exception:
        pass

    return summary
