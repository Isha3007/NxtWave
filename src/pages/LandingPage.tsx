import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Sparkles, 
  MessageSquare, 
  FileSearch, 
  Users, 
  ArrowRight,
  CheckCircle2,
  Mic,
  FileText,
  GitCompare
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Recommendations",
    description: "Get personalized scheme suggestions based on your profile and eligibility criteria.",
  },
  {
    icon: MessageSquare,
    title: "Smart Assistant",
    description: "Ask questions about any government scheme and get instant, accurate answers.",
  },
  {
    icon: Mic,
    title: "Voice Interaction",
    description: "Speak your questions and listen to responses with our multimodal interface.",
  },
  {
    icon: FileSearch,
    title: "Document Summarizer",
    description: "Upload scheme PDFs and get clear summaries of eligibility, benefits, and requirements.",
  },
  {
    icon: GitCompare,
    title: "Scheme Comparison",
    description: "Compare multiple schemes side-by-side to find the best fit for your needs.",
  },
  {
    icon: Users,
    title: "Community Forum",
    description: "Connect with others, share experiences, and get advice from the community.",
  },
];

const stats = [
  { value: "500+", label: "Government Schemes" },
  { value: "50K+", label: "Citizens Helped" },
  { value: "24/7", label: "AI Assistance" },
  { value: "100%", label: "Free to Use" },
];

export default function LandingPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-hero-gradient opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-end/10 rounded-full blur-3xl" />
        
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <Badge className="gov-badge mb-6 animate-fade-in">
              <Shield className="h-3 w-3" />
              Trusted Government Portal
            </Badge>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in delay-100">
              Connecting Citizens to{" "}
              <span className="text-gradient">Government Schemes</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in delay-200">
              Discover benefits you're eligible for with AI-powered personalization. 
              Ask questions, compare schemes, and access government support effortlessly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
              <Link to="/profile">
                <Button variant="hero" size="xl">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Find My Schemes
                </Button>
              </Link>
              <Link to="/chatbot">
                <Button variant="outline-gradient" size="xl">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Ask the Assistant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-subtle-gradient border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-3xl md:text-4xl font-display font-bold text-gradient">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform makes it easy to discover, understand, and apply for 
              government schemes tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-subtle-gradient">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get personalized scheme recommendations in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Enter your basic details like age, income, occupation, and location.",
                icon: FileText,
              },
              {
                step: "02",
                title: "Get AI Recommendations",
                description: "Our AI analyzes your profile and matches you with eligible schemes.",
                icon: Sparkles,
              },
              {
                step: "03",
                title: "Apply with Confidence",
                description: "Review scheme details, compare options, and apply directly.",
                icon: CheckCircle2,
              },
            ].map((item, index) => (
              <div key={index} className="relative text-center animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                {/* Connector Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
                
                <div className="relative z-10 mb-4 mx-auto w-16 h-16 rounded-full bg-hero-gradient flex items-center justify-center text-primary-foreground font-display font-bold text-xl shadow-glow">
                  {item.step}
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl bg-hero-gradient p-8 md:p-12 text-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
                Ready to Discover Your Benefits?
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Join thousands of citizens who have found government schemes they didn't know they were eligible for.
              </p>
              <Link to="/profile">
                <Button 
                  size="xl" 
                  className="bg-white text-primary hover:bg-white/90 shadow-lg"
                >
                  Get Started Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
