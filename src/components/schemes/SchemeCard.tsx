import { Scheme } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, FileText, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SchemeCardProps {
  scheme: Scheme;
  onSelect?: (scheme: Scheme) => void;
  isSelected?: boolean;
  showSelectButton?: boolean;
}

export function SchemeCard({ scheme, onSelect, isSelected, showSelectButton }: SchemeCardProps) {
  const confidenceColor = 
    scheme.confidence >= 80 ? "text-success" : 
    scheme.confidence >= 60 ? "text-warning" : 
    "text-muted-foreground";

  return (
    <Card 
      className={cn(
        "scheme-card card-gradient overflow-hidden",
        isSelected && "ring-2 ring-primary shadow-glow"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {scheme.category}
              </Badge>
              {/* <div className={cn("flex items-center gap-1 text-xs font-medium", confidenceColor)}>
                <Sparkles className="h-3 w-3" />
                {scheme.confidence}% match
              </div> */}
            </div>
            <CardTitle className="text-lg leading-tight">{scheme.title}</CardTitle>
          </div>
          {showSelectButton && (
            <Button
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onSelect?.(scheme)}
              className="shrink-0"
            >
              {isSelected ? <CheckCircle2 className="h-4 w-4" /> : "Select"}
            </Button>
          )}
        </div>
        <CardDescription className="line-clamp-2">{scheme.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Why Recommended */}
        <div className="bg-accent/50 rounded-lg p-3 border border-primary/10">
          <p className="text-xs font-medium text-accent-foreground mb-1">Why Recommended</p>
          <p className="text-sm text-foreground">{scheme.whyRecommended}</p>
        </div>

        {/* Eligibility */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Eligibility</p>
          <p className="text-sm">{scheme.eligibility}</p>
        </div>

        {/* Documents */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Required Documents</p>
          <ul className="space-y-1">
            {scheme.documents.map((doc, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <FileText className="h-3 w-3 text-muted-foreground shrink-0" />
                {doc}
              </li>
            ))}
          </ul>
        </div>

        {/* Apply Button */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">
            Source: {scheme.source}
          </span>
          <Button 
            variant="gradient" 
            size="sm"
            onClick={() => window.open(scheme.applyLink, "_blank")}
          >
            Apply Now
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

