import os
import json
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate


SUMMARY_PROMPT = ChatPromptTemplate.from_template("""
You are a government scheme expert.

Extract ONLY information present in the text below.

Return ONLY valid JSON in this format:
{{
  "eligibility": [],
  "benefits": [],
  "documents": []
}}

DOCUMENT CONTENT:
{context}
""")


def summarize_pdf(file_path: str) -> dict:
    # 1️⃣ Load PDF
    loader = PyPDFLoader(file_path)
    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1500,
        chunk_overlap=200
    )
    chunks = splitter.split_documents(documents)

    if not chunks or all(not c.page_content.strip() for c in chunks):
        return {
            "eligibility": [],
            "benefits": [],
            "documents": []
        }

    # 2️⃣ LLM
    model = ChatGroq(
        model="llama-3.1-8b-instant",
        api_key=os.environ["GROQ_API_KEY"],
        temperature=0.3
    )

    # 3️⃣ Collect chunk-level JSON
    collected = {
        "eligibility": set(),
        "benefits": set(),
        "documents": set()
    }

    for chunk in chunks[:6]:  # safety limit
        prompt = SUMMARY_PROMPT.format(context=chunk.page_content)
        response = model.invoke(prompt)

        try:
            data = json.loads(response.content)
        except json.JSONDecodeError:
            continue

        for key in collected:
            for item in data.get(key, []):
                collected[key].add(item)

    # 4️⃣ Return merged structured summary
    return {
        "eligibility": list(collected["eligibility"]),
        "benefits": list(collected["benefits"]),
        "documents": list(collected["documents"])
    }