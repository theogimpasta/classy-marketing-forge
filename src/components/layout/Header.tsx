
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { LogOut } from "lucide-react";

export function Header() {
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-marketing-600 to-marketing-800 bg-clip-text text-transparent">
              ContentForge
            </span>
          </Link>
        </div>
        
        {user ? (
          <>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/dashboard" className="font-medium transition-colors hover:text-primary">
                Dashboard
              </Link>
              <Link to="/templates" className="font-medium transition-colors hover:text-primary">
                Templates
              </Link>
              <Link to="/history" className="font-medium transition-colors hover:text-primary">
                History
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Button variant="outline" size="icon" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button variant="outline" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
