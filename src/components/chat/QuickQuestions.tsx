import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface QuickQuestionsProps {
  onSelect: (question: string) => void;
}

const questions = [
  "What schemes are available for students?",
  "Health insurance eligibility requirements",
  "Farmer subsidies and agricultural schemes",
  "Housing schemes for low-income families",
  "Senior citizen benefits and pensions",
];

export function QuickQuestions({ onSelect }: QuickQuestionsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MessageSquare className="h-4 w-4" />
        <span>Suggested questions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="secondary"
            size="sm"
            className="text-xs h-auto py-2 px-3 whitespace-normal text-left"
            onClick={() => onSelect(question)}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
}
