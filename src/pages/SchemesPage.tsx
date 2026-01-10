import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout";
import { SchemeCard, SchemesGridSkeleton } from "@/components/schemes";
import { Scheme, getRecommendations } from "@/lib/api";
import { getProfile } from "@/lib/storage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FileText, 
  Search, 
  Filter, 
  Sparkles, 
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "All Categories",
  "Healthcare",
  "Education",
  "Agriculture",
  "Financial Inclusion",
  "Housing",
  "Employment",
  "Social Welfare",
];

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const { toast } = useToast();

  const profile = getProfile();

  useEffect(() => {
    if (profile) {
      loadSchemes();
    }
  }, []);

  const loadSchemes = async () => {
    if (!profile) return;
    
    setIsLoading(true);
    try {
      const recommendations = await getRecommendations(profile);
      setSchemes(recommendations);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load schemes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch = 
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      selectedCategory === "All Categories" || 
      scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="gov-badge mb-4">
            <FileText className="h-3 w-3" />
            Personalized for You
          </Badge>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Government Schemes
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse all available schemes or get AI-powered recommendations based on your profile.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search schemes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {profile && (
            <Button variant="outline" onClick={loadSchemes} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          )}
        </div>

        {/* No Profile CTA */}
        {!profile && (
          <Card className="mb-8 bg-subtle-gradient border-primary/20">
            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-hero-gradient flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Get Personalized Recommendations</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete your profile to discover schemes you're eligible for
                  </p>
                </div>
              </div>
              <Link to="/profile">
                <Button variant="hero">
                  Set Up Profile
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Results Count */}
        {schemes.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredSchemes.length} of {schemes.length} schemes
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <SchemesGridSkeleton count={6} />}

        {/* Schemes Grid */}
        {!isLoading && filteredSchemes.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        )}

        {/* Empty State - No Profile */}
        {!isLoading && !profile && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                No Schemes to Display
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm mb-4">
                Complete your profile to get personalized scheme recommendations.
              </p>
              <Link to="/profile">
                <Button variant="gradient">
                  Complete Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Empty State - No Results */}
        {!isLoading && profile && filteredSchemes.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                No Schemes Found
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm mb-4">
                Try adjusting your search query or category filter.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
