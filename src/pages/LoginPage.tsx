import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { saveAuth } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate login - In production, this would call your auth API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    saveAuth({
      email,
      name: email.split("@")[0],
      isLoggedIn: true,
    });

    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });

    setIsLoading(false);
    navigate("/profile");
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
        <div className="container max-w-md">
          <Card className="card-gradient shadow-xl animate-fade-in">
            <CardHeader className="text-center space-y-4">
              {/* Logo */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-hero-gradient shadow-glow">
                <Shield className="h-7 w-7 text-primary-foreground" />
              </div>
              
              <div>
                <CardTitle className="text-2xl font-display">Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to access your personalized scheme recommendations
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <Button 
                  type="submit" 
                  variant="hero" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">
                    New to SchemesConnect?
                  </span>
                </div>
              </div>

              {/* Register Link */}
              <Link to="/register">
                <Button variant="outline" className="w-full" size="lg">
                  Create an Account
                </Button>
              </Link>

              {/* Guest Access */}
              <p className="text-center text-xs text-muted-foreground mt-4">
                Or{" "}
                <Link to="/profile" className="text-primary hover:underline">
                  continue as guest
                </Link>{" "}
                to explore schemes
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
