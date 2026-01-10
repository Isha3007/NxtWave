import os
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
# from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq

# from langchain_ollama import OllamaLLM # optional
from get_embedding_function import get_embedding_function


load_dotenv()


CHROMA_PATH = os.path.join(os.path.dirname(__file__), "chroma")


PROMPT_TEMPLATE = """
Answer the question based only on the following context:


{context}


---


Answer the question based on the above context: {question}
"""




def query_rag(query_text: str, system_prompt: str = None):
    """
    Queries the RAG system using Chroma embeddings + LLM.
    
    Args:
        query_text (str): User's question
        system_prompt (str, optional): Language/system instruction for the LLM

    Returns:
        answer (str), sources (list[str])
    """
    # 1️⃣ Load embedding function and database
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # 2️⃣ Top-k retrieval
    results = db.similarity_search_with_score(query_text, k=5)
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _ in results])

    # 3️⃣ Prepare prompt
    if system_prompt:
        # Include system prompt if provided
        full_prompt = f"{system_prompt}\n\nAnswer the question based only on the following context:\n\n{context_text}\n\nQuestion: {query_text}"
    else:
        full_prompt = PROMPT_TEMPLATE.format(context=context_text, question=query_text)

    # 4️⃣ LLM choice (default: Gemini / Groq)
    model = ChatGroq(
        model="llama-3.1-8b-instant",
        api_key=os.environ["GROQ_API_KEY"]
    )
    
    # Invoke model
    response = model.invoke(full_prompt)
    answer = response.content if hasattr(response, "content") else str(response)

    # 5️⃣ Extract distinct, normalized sources
    sources_set = set()
    for doc, _score in results:
        source_path = doc.metadata.get("source", "")
        if source_path.startswith("http"):
            clean_source = source_path.split("?")[0]
        else:
            clean_source = os.path.basename(source_path)
        sources_set.add(clean_source)

    sources = list(sources_set)
    return answer, sources