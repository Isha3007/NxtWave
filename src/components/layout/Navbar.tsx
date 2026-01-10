import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  Menu, 
  X, 
  Home, 
  FileText, 
  MessageSquare, 
  User, 
  FileSearch, 
  Users, 
  GitCompare,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/schemes", label: "Schemes", icon: FileText },
  { href: "/chatbot", label: "AI Assistant", icon: MessageSquare },
  { href: "/compare", label: "Compare", icon: GitCompare },
  { href: "/summarizer", label: "PDF Summarizer", icon: FileSearch },
  { href: "/community", label: "Community", icon: Users },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full glass safe-top">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hero-gradient shadow-md group-hover:shadow-glow transition-shadow">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground hidden sm:block">
            Schemes<span className="text-gradient">Connect</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="gradient" size="sm">
              <User className="h-4 w-4" />
              My Profile
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 space-y-2 border-t border-border mt-4">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full justify-start" size="lg">
                  Sign In
                </Button>
              </Link>
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                <Button variant="gradient" className="w-full justify-start" size="lg">
                  <User className="h-4 w-4" />
                  My Profile
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
