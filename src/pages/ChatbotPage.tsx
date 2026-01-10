import { useState, useRef, useEffect } from "react";
import { MainLayout } from "@/components/layout";
import { ChatMessage, ChatInput, QuickQuestions } from "@/components/chat";
import { ChatMessage as ChatMessageType, askQuestion } from "@/lib/api";
import { Bot, Sparkles, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await askQuestion(content);
      
      const assistantMessage: ChatMessageType = {
        role: "assistant",
        content: response.answer,
        sources: response.sources,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);

      // Auto-speak response if voice is enabled
      if (voiceEnabled && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(response.answer);
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      const errorMessage: ChatMessageType = {
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting to the server. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
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
        {/* Chat Header */}
        <div className="border-b border-border bg-card px-4 py-3">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-hero-gradient flex items-center justify-center shadow-md">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-semibold">AI Assistant</h1>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  Online · Powered by RAG
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden sm:flex">
                <Sparkles className="h-3 w-3 mr-1" />
                Multimodal
              </Badge>
              <Button
                variant={voiceEnabled ? "default" : "outline"}
                size="icon-sm"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                title={voiceEnabled ? "Disable voice output" : "Enable voice output"}
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

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto smooth-scroll bg-background">
          <div className="container py-6 space-y-6">
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="text-center py-12 animate-fade-in">
                <div className="h-20 w-20 rounded-2xl bg-hero-gradient flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <Bot className="h-10 w-10 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-display font-bold mb-2">
                  Hello! I'm your Schemes Assistant
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  I can help you find information about government schemes, 
                  eligibility requirements, and how to apply. Ask me anything!
                </p>
                
                <QuickQuestions onSelect={handleQuickQuestion} />
              </div>
            )}

            {/* Chat Messages */}
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 animate-fade-in">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="chat-bubble-bot px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce delay-100" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <ChatInput 
          onSend={handleSend} 
          isLoading={isLoading}
          placeholder="Ask about government schemes..."
        />

        {/* Disclaimer */}
        <div className="border-t border-border bg-muted/30 px-4 py-2">
          <p className="text-xs text-muted-foreground text-center">
            This assistant may make mistakes. Always verify important information with official sources.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
