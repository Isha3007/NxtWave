import { useState, useRef, useEffect } from "react";
import { MainLayout } from "@/components/layout";
import { ChatMessage, ChatInput, QuickQuestions } from "@/components/chat";
import { ChatMessage as ChatMessageType, askQuestion } from "@/lib/api";
import { Bot, Sparkles, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Language = "en" | "hi" | "mr";

/* ---------------- LANGUAGE-AWARE ERROR MESSAGE ---------------- */
const getErrorMessage = (lang: Language) => {
  switch (lang) {
    case "hi":
      return "माफ़ कीजिए, मुझे इस प्रश्न की जानकारी उपलब्ध नहीं है या सर्वर से जुड़ने में समस्या आ रही है। कृपया थोड़ी देर बाद पुनः प्रयास करें।";
    case "mr":
      return "माफ करा, या प्रश्नाबद्दल मला माहिती उपलब्ध नाही किंवा सर्व्हरशी जोडण्यात अडचण येत आहे. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.";
    default:
      return "Sorry, I don’t have information on this right now or I’m having trouble connecting to the server. Please try again later.";
  }
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [language, setLanguage] = useState<Language>("en");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /* ---------------- MAIN SEND HANDLER ---------------- */
  const handleSend = async (content: string) => {
    const userMessage: ChatMessageType = {
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 🔥 Force response language (frontend-only)
      const languageInstruction =
        language === "hi"
          ? "कृपया उत्तर हिंदी में दें।\n\n"
          : language === "mr"
          ? "कृपया उत्तर मराठीत द्या.\n\n"
          : "";

      const response = await askQuestion(languageInstruction + content);

      // 🔍 Handle "model doesn't know" cases
      const unknownPatterns = [
        "i don't know",
        "no information",
        "not available",
        "cannot find",
      ];

      const isUnknown = unknownPatterns.some((p) =>
        response.answer.toLowerCase().includes(p)
      );

      const finalAnswer = isUnknown
        ? getErrorMessage(language)
        : response.answer;

      const assistantMessage: ChatMessageType = {
        role: "assistant",
        content: finalAnswer,
        sources: response.sources,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // 🔊 Text-to-Speech (language aware)
      if (voiceEnabled && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(finalAnswer);
        utterance.lang =
          language === "hi"
            ? "hi-IN"
            : language === "mr"
            ? "mr-IN"
            : "en-IN";

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      const errorText = getErrorMessage(language);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorText,
          timestamp: new Date(),
        },
      ]);

      // 🔊 Speak error in same language
      if (voiceEnabled && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(errorText);
        utterance.lang =
          language === "hi"
            ? "hi-IN"
            : language === "mr"
            ? "mr-IN"
            : "en-IN";

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSend(question);
  };

  return (
    <MainLayout hideFooter>
      <div className="flex flex-col h-[calc(100vh-64px)]">

        {/* ---------------- HEADER ---------------- */}
        <div className="border-b border-border bg-card px-4 py-3">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-hero-gradient flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold">AI Assistant</h1>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  Online · Powered by RAG
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* 🌐 Language Selector */}
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={language === "en" ? "default" : "outline"}
                  onClick={() => setLanguage("en")}
                >
                  EN
                </Button>
                <Button
                  size="sm"
                  variant={language === "hi" ? "default" : "outline"}
                  onClick={() => setLanguage("hi")}
                >
                  हिंदी
                </Button>
                <Button
                  size="sm"
                  variant={language === "mr" ? "default" : "outline"}
                  onClick={() => setLanguage("mr")}
                >
                  मराठी
                </Button>
              </div>

              <Badge variant="secondary" className="hidden sm:flex">
                <Sparkles className="h-3 w-3 mr-1" />
                Multimodal
              </Badge>

              <Button
                variant={voiceEnabled ? "default" : "outline"}
                size="icon-sm"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
              >
                {voiceEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* ---------------- MESSAGES ---------------- */}
        <div className="flex-1 overflow-y-auto bg-background">
          <div className="container py-6 space-y-6">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="h-20 w-20 rounded-2xl bg-hero-gradient flex items-center justify-center mx-auto mb-6">
                  <Bot className="h-10 w-10 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Hello! I'm your Schemes Assistant
                </h2>
                <p className="text-muted-foreground mb-8">
                  Ask about government schemes, eligibility and applications.
                </p>
                <QuickQuestions onSelect={handleQuickQuestion} />
              </div>
            )}

            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="px-4 py-3 rounded-lg bg-muted animate-pulse">
                  Thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* ---------------- INPUT ---------------- */}
        <ChatInput
          onSend={handleSend}
          isLoading={isLoading}
          placeholder={
            language === "hi"
              ? "सरकारी योजनाओं के बारे में पूछें..."
              : language === "mr"
              ? "शासकीय योजनांबद्दल विचारा..."
              : "Ask about government schemes..."
          }
        />

        {/* ---------------- DISCLAIMER ---------------- */}
        <div className="border-t bg-muted/30 px-4 py-2">
          <p className="text-xs text-center text-muted-foreground">
            This assistant may make mistakes. Verify information from official sources.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}