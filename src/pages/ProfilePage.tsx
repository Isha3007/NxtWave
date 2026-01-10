import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout";
import { ProfileForm } from "@/components/profile";
import { SchemeCard, SchemesGridSkeleton } from "@/components/schemes";
import { UserProfile, Scheme, getRecommendations } from "@/lib/api";
import { getProfile, saveProfile, getAuth } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, RefreshCw, FileText, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { clearAuth } from "@/lib/storage";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();
  const auth = getAuth();

  useEffect(() => {
    const savedProfile = getProfile();
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  const handleSave = (newProfile: UserProfile) => {
    saveProfile(newProfile);
    setProfile(newProfile);
    toast({
      title: "Profile Saved",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleRecommend = async (profileData: UserProfile) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const recommendations = await getRecommendations(profileData);
      setSchemes(recommendations);
      
      if (recommendations.length > 0) {
        toast({
          title: "Schemes Found!",
          description: `We found ${recommendations.length} schemes matching your profile.`,
        });
      } else {
        toast({
          title: "No Schemes Found",
          description: "Try adjusting your profile criteria.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    window.location.reload();
  };

  return (
    <MainLayout>
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              {auth?.isLoggedIn ? `Welcome, ${auth.name}` : "Citizen Profile"}
            </h1>
            <p className="text-muted-foreground">
              Complete your profile to get personalized scheme recommendations
            </p>
          </div>
          
          {auth?.isLoggedIn && (
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Profile Form - Left Side */}
          <div className="lg:col-span-2">
            <ProfileForm
              initialProfile={profile}
              onSave={handleSave}
              onRecommend={handleRecommend}
              isLoading={isLoading}
            />

            {/* Quick Stats Card */}
            {auth?.isLoggedIn && (
              <Card className="mt-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Account Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span>{auth.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span>January 2026</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recommendations - Right Side */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-display font-semibold">
                  Recommended Schemes
                </h2>
                {schemes.length > 0 && (
                  <Badge variant="secondary">
                    {schemes.length} found
                  </Badge>
                )}
              </div>
              
              {schemes.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => profile && handleRecommend(profile)}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              )}
            </div>

            {/* Loading State */}
            {isLoading && <SchemesGridSkeleton count={3} />}

            {/* Results */}
            {!isLoading && schemes.length > 0 && (
              <div className="grid gap-6">
                {schemes.map((scheme) => (
                  <SchemeCard key={scheme.id} scheme={scheme} />
                ))}
              </div>
            )}

            {/* Empty State - Before Search */}
            {!isLoading && !hasSearched && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mb-4">
                    <Sparkles className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    Get Personalized Recommendations
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm mb-4">
                    Fill out your profile on the left and click "Get Recommendations" 
                    to discover government schemes you may be eligible for.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Empty State - No Results */}
            {!isLoading && hasSearched && schemes.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    No Schemes Found
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm mb-4">
                    We couldn't find any schemes matching your current profile. 
                    Try adjusting your criteria or ask our AI assistant for help.
                  </p>
                  <Link to="/chatbot">
                    <Button variant="outline">
                      Ask AI Assistant
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
