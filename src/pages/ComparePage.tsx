import { useState } from "react";
import { MainLayout } from "@/components/layout";
import { SchemeCard } from "@/components/schemes";
import { Scheme } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GitCompare, 
  Plus, 
  X, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock schemes for comparison (in production, these would come from the API)
const mockSchemes: Scheme[] = [
  {
    id: 1,
    title: "Pradhan Mantri Jan Dhan Yojana",
    category: "Financial Inclusion",
    description: "National mission for financial inclusion to ensure access to financial services.",
    eligibility: "Any Indian citizen above 10 years of age",
    documents: ["Aadhaar Card", "Passport-size photo", "Address proof"],
    applyLink: "https://pmjdy.gov.in",
    source: "Ministry of Finance",
    whyRecommended: "Universal access scheme with minimal documentation",
    confidence: 92,
  },
  {
    id: 2,
    title: "Ayushman Bharat - PMJAY",
    category: "Healthcare",
    description: "Health insurance scheme providing coverage up to ₹5 Lakhs per family.",
    eligibility: "Families identified in SECC 2011 database",
    documents: ["Aadhaar Card", "Ration Card", "Income Certificate"],
    applyLink: "https://pmjay.gov.in",
    source: "Ministry of Health",
    whyRecommended: "Comprehensive health coverage for low-income families",
    confidence: 88,
  },
  {
    id: 3,
    title: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    description: "Income support of ₹6,000 per year to small and marginal farmers.",
    eligibility: "Farmers owning cultivable land up to 2 hectares",
    documents: ["Land records", "Aadhaar Card", "Bank account details"],
    applyLink: "https://pmkisan.gov.in",
    source: "Ministry of Agriculture",
    whyRecommended: "Direct benefit transfer for agricultural income support",
    confidence: 85,
  },
];

export default function ComparePage() {
  const [selectedSchemes, setSelectedSchemes] = useState<Scheme[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  const handleSelectScheme = (scheme: Scheme) => {
    if (selectedSchemes.find(s => s.id === scheme.id)) {
      setSelectedSchemes(selectedSchemes.filter(s => s.id !== scheme.id));
    } else if (selectedSchemes.length < 3) {
      setSelectedSchemes([...selectedSchemes, scheme]);
    }
  };

  const removeScheme = (schemeId: number) => {
    setSelectedSchemes(selectedSchemes.filter(s => s.id !== schemeId));
  };

  return (
    <MainLayout>
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="gov-badge mb-4">
            <GitCompare className="h-3 w-3" />
            Side-by-Side Comparison
          </Badge>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Compare Schemes
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select up to 3 schemes to compare their eligibility, benefits, and requirements side by side.
          </p>
        </div>

        {/* Selection Area */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 items-center justify-center">
            {selectedSchemes.map((scheme) => (
              <Badge
                key={scheme.id}
                variant="secondary"
                className="pl-3 pr-1 py-2 text-sm flex items-center gap-2"
              >
                {scheme.title}
                <button
                  onClick={() => removeScheme(scheme.id)}
                  className="h-5 w-5 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            
            {selectedSchemes.length < 3 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSelector(!showSelector)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Scheme
              </Button>
            )}
          </div>
        </div>

        {/* Scheme Selector */}
        {showSelector && (
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg">Select Schemes to Compare</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {mockSchemes.map((scheme) => (
                  <SchemeCard
                    key={scheme.id}
                    scheme={scheme}
                    onSelect={handleSelectScheme}
                    isSelected={selectedSchemes.some(s => s.id === scheme.id)}
                    showSelectButton
                  />
                ))}
              </div>
              <div className="text-center mt-4">
                <Link to="/profile">
                  <Button variant="link">
                    Get personalized recommendations first
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comparison Table */}
        {selectedSchemes.length >= 2 && (
          <div className="animate-fade-in">
            <Card className="overflow-hidden">
              <CardHeader className="bg-subtle-gradient">
                <CardTitle className="flex items-center gap-2">
                  <GitCompare className="h-5 w-5 text-primary" />
                  Comparison Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-semibold bg-muted/50 min-w-[150px]">
                          Criteria
                        </th>
                        {selectedSchemes.map((scheme) => (
                          <th
                            key={scheme.id}
                            className="text-left p-4 font-semibold min-w-[250px]"
                          >
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {scheme.category}
                              </Badge>
                            </div>
                            <p className="mt-1">{scheme.title}</p>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Confidence Score */}
                      <tr className="border-b border-border">
                        <td className="p-4 font-medium bg-muted/50">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            Match Score
                          </div>
                        </td>
                        {selectedSchemes.map((scheme) => (
                          <td key={scheme.id} className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden max-w-[100px]">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${scheme.confidence}%` }}
                                />
                              </div>
                              <span className="font-semibold text-primary">
                                {scheme.confidence}%
                              </span>
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Eligibility */}
                      <tr className="border-b border-border">
                        <td className="p-4 font-medium bg-muted/50">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-success" />
                            Eligibility
                          </div>
                        </td>
                        {selectedSchemes.map((scheme) => (
                          <td key={scheme.id} className="p-4 text-sm">
                            {scheme.eligibility}
                          </td>
                        ))}
                      </tr>

                      {/* Why Recommended */}
                      <tr className="border-b border-border">
                        <td className="p-4 font-medium bg-muted/50">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-warning" />
                            Why Recommended
                          </div>
                        </td>
                        {selectedSchemes.map((scheme) => (
                          <td key={scheme.id} className="p-4 text-sm">
                            {scheme.whyRecommended}
                          </td>
                        ))}
                      </tr>

                      {/* Documents */}
                      <tr className="border-b border-border">
                        <td className="p-4 font-medium bg-muted/50">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            Required Documents
                          </div>
                        </td>
                        {selectedSchemes.map((scheme) => (
                          <td key={scheme.id} className="p-4">
                            <ul className="text-sm space-y-1">
                              {scheme.documents.map((doc, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                  {doc}
                                </li>
                              ))}
                            </ul>
                          </td>
                        ))}
                      </tr>

                      {/* Source */}
                      <tr className="border-b border-border">
                        <td className="p-4 font-medium bg-muted/50">Source</td>
                        {selectedSchemes.map((scheme) => (
                          <td key={scheme.id} className="p-4 text-sm text-muted-foreground">
                            {scheme.source}
                          </td>
                        ))}
                      </tr>

                      {/* Apply Links */}
                      <tr>
                        <td className="p-4 font-medium bg-muted/50">Apply</td>
                        {selectedSchemes.map((scheme) => (
                          <td key={scheme.id} className="p-4">
                            <Button
                              variant="gradient"
                              size="sm"
                              onClick={() => window.open(scheme.applyLink, "_blank")}
                            >
                              Apply Now
                            </Button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {selectedSchemes.length < 2 && !showSelector && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mb-4">
                <GitCompare className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                Select Schemes to Compare
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm mb-4">
                Choose at least 2 schemes (up to 3) to see a detailed side-by-side comparison.
              </p>
              <Button variant="gradient" onClick={() => setShowSelector(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Schemes
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
