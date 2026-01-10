import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout";
import { SimpleSchemeCard } from "@/components/schemes/SimpleSchemeCard";
import { Scheme } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Search, Filter } from "lucide-react";
import { staticSchemes } from "@/lib/staticSchemes";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  // ✅ Load hard-coded schemes once
  useEffect(() => {
    setSchemes(staticSchemes);
  }, []);

  // ✅ Search + Category filter
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
            Official Schemes
          </Badge>

          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Government Schemes
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse officially available government schemes across different
            categories.
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

          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-full sm:w-[220px]">
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
        </div>

        {/* Results Count */}
        {schemes.length > 0 && (
          <div className="mb-6 text-sm text-muted-foreground">
            Showing {filteredSchemes.length} of {schemes.length} schemes
          </div>
        )}

        {/* Schemes Grid */}
        {filteredSchemes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSchemes.map((scheme) => (
                <SimpleSchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                No Schemes Found
              </h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or category filter.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
