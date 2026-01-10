const API_BASE_URL = "http://localhost:8000";

export interface Scheme {
  id: number;
  title: string;
  category: string;
  description: string;
  eligibility: string;
  documents: string[];
  applyLink: string;
  source: string;
  whyRecommended: string;
  confidence: number;
}

export interface UserProfile {
  fullName?: string;
  age: string;
  gender: string;
  income: string;
  occupation: string;
  location: string;
  casteCategory: string;
  disability: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  timestamp: Date;
}

export interface AskResponse {
  answer: string;
  sources: string[];
}

export interface HealthResponse {
  status: string;
}

// Health Check
export async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/health`);
  if (!response.ok) {
    throw new Error("API health check failed");
  }
  return response.json();
}

// Get scheme recommendations based on user profile
export async function getRecommendations(profile: UserProfile): Promise<Scheme[]> {
  const response = await fetch(`${API_BASE_URL}/api/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      age: profile.age,
      gender: profile.gender,
      income: profile.income,
      occupation: profile.occupation,
      location: profile.location,
      casteCategory: profile.casteCategory,
      disability: profile.disability,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get recommendations");
  }

  return response.json();
}

// Ask the RAG chatbot a question
export async function askQuestion(question: string): Promise<AskResponse> {
  const response = await fetch(`${API_BASE_URL}/api/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error("Failed to get answer");
  }

  return response.json();
}
