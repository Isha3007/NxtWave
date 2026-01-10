import { ChatMessage as ChatMessageType } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Bot, User, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isUser = message.role === "user";

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(message.content);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-accent text-accent-foreground"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 space-y-2",
          isUser ? "chat-bubble-user" : "chat-bubble-bot"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        
        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-1">Sources:</p>
            <div className="flex flex-wrap gap-1">
              {message.sources.map((source, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {source}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          
          {!isUser && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleSpeak}
              className="h-6 w-6"
            >
              {isSpeaking ? (
                <VolumeX className="h-3 w-3" />
              ) : (
                <Volume2 className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
