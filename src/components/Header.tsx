import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, User, Heart, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserProfilePanel from "./UserProfilePanel";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const { isAuthenticated, user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 focus-visible">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-foreground">home.com</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/buy" className="text-foreground hover:text-primary transition-colors">
              Buy
            </Link>
            <Link to="/rent" className="text-foreground hover:text-primary transition-colors">
              Rent
            </Link>
            <Link to="/sell" className="text-foreground hover:text-primary transition-colors">
              Sell
            </Link>
            <Link to="/agents" className="text-foreground hover:text-primary transition-colors">
              Agents
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="gap-1 focus-visible">
              <Heart className="w-4 h-4" />
              <span className="hidden lg:inline">Saved</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 focus-visible">
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">+91 98765 43210</span>
            </Button>
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1 focus-visible"
                  onClick={() => setIsProfilePanelOpen(true)}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden lg:inline">Profile</span>
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="navy" size="sm" className="gap-1 focus-visible">
                  <User className="w-4 h-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="py-4 space-y-4">
              <Link
                to="/buy"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Buy Properties
              </Link>
              <Link
                to="/rent"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Rent Properties
              </Link>
              <Link
                to="/sell"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sell Property
              </Link>
              <Link
                to="/agents"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Agents
              </Link>
              <div className="pt-4 border-t space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <Heart className="w-4 h-4" />
                  Saved Properties
                </Button>
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                        <User className="w-4 h-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => { signOut(); setIsMenuOpen(false); }} className="w-full justify-start gap-2">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="navy" size="sm" className="w-full justify-start gap-2">
                      <User className="w-4 h-4" />
                      Login / Sign Up
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Profile Panel */}
      <UserProfilePanel 
        isOpen={isProfilePanelOpen} 
        onClose={() => setIsProfilePanelOpen(false)} 
      />
    </header>
  );
};

export default Header;