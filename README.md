
# SchemesConnect

**AI-Powered Government Scheme Discovery and Recommendation Platform**

SchemesConnect is a full-stack AI application that helps citizens discover, understand, and receive personalized recommendations for Indian government schemes using **Retrieval-Augmented Generation (RAG)** and **Large Language Models (LLMs)**.

The system ingests official documents and government websites, performs semantic search using vector embeddings, and generates accurate, eligibility-aware responses with cited sources.

---

## Table of Contents

* [Features](#features)
* [Architecture](#architecture)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Setup and Installation](#setup-and-installation)
* [API Endpoints](#api-endpoints)
* [Reliability and Safety](#reliability-and-safety)

---

## Features

* Natural language question answering over government scheme documents
* Personalized scheme recommendations based on citizen profile
* Eligibility-aware filtering with confidence scoring
* Source-grounded, hallucination-resistant responses
* Community discussion forum for scheme-related queries

---

## Architecture

```
PDFs / Government Websites
            ↓
     Document Chunking
            ↓
     Vector Embeddings
            ↓
        ChromaDB
            ↓
      FastAPI Backend
            ↓
   LLM (Groq – LLaMA 3.1)
            ↓
     Next.js Frontend
```

---

## Tech Stack

### Backend

* Python
* FastAPI
* LangChain
* ChromaDB
* Groq LLM (LLaMA-3.1-8B)
* Playwright, BeautifulSoup

### Frontend

* Next.js (React)
* Tailwind CSS

### AI / ML

* Sentence Transformers (all-mpnet-base-v2)
* Retrieval-Augmented Generation (RAG)

---

## Project Structure

```
backend/
├── ingest.py              # PDF and website ingestion
├── query_data.py          # RAG-based Q&A
├── recommend.py           # Personalized recommendations
├── scheme_extractor.py    # Eligibility-aware JSON extraction
├── server.py              # FastAPI server
├── chroma/                # Vector database
├── data/                  # PDF documents
└── websites.txt           # Websites to crawl

frontend/
├── chatbot/               # AI chatbot UI
├── profile/               # Citizen profile and recommendations
├── community/             # Discussion forum
└── page.tsx               # Main dashboard
```

---

## Setup and Installation

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload
```

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
```

---

### Ingest Documents

Add PDFs to `backend/data/` and website URLs to `backend/websites.txt`, then run:

```bash
python ingest.py --reset
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Access the application at:

```
http://localhost:3000
```

---

## API Endpoints

### Ask a Question

```
POST /api/ask
```

### Get Personalized Recommendations

```
POST /api/recommend
```

### Ingest Documents

```
POST /api/ingest
```

---

## Reliability and Safety

* Responses are generated only from retrieved documents
* Strict eligibility validation to prevent incorrect recommendations
* JSON-constrained LLM outputs to avoid hallucinations
* Confidence scores provided for transparency

