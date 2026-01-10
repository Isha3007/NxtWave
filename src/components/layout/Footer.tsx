import { Link } from "react-router-dom";
import { Shield, Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card safe-bottom">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hero-gradient shadow-md">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">
                Schemes<span className="text-gradient">Connect</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md mb-4">
              Connecting citizens to government schemes through AI-powered personalization. 
              Discover benefits you're eligible for, ask questions, and understand policies with ease.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/schemes" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Schemes
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-muted-foreground hover:text-foreground transition-colors">
                  Compare Schemes
                </Link>
              </li>
              <li>
                <Link to="/summarizer" className="text-muted-foreground hover:text-foreground transition-colors">
                  PDF Summarizer
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-foreground transition-colors">
                  Community Forum
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto">
            <strong>Disclaimer:</strong> SchemesConnect assistant may make mistakes. 
            Always verify important information with official government sources before making decisions. 
            This platform is for informational purposes only.
          </p>
          <p className="text-xs text-muted-foreground text-center mt-4">
            © {new Date().getFullYear()} SchemesConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
