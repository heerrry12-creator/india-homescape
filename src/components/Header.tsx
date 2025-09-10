import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, User, Heart, LogOut, Bell, Settings, Star, Plus, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserProfilePanel from "./UserProfilePanel";
import AuthModal from "./AuthModal";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated, user, signOut } = useAuth();

  // Mock notification count - in real app this would come from your backend
  const notificationCount = 3;
  const savedPropertiesCount = 12;

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
            <Button variant="ghost" size="sm" className="gap-1 focus-visible relative">
              <Heart className="w-4 h-4" />
              <span className="hidden lg:inline">Saved</span>
              {savedPropertiesCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">
                  {savedPropertiesCount}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 focus-visible relative">
              <Bell className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-blue-500">
                  {notificationCount}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 focus-visible">
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">+91 98765 43210</span>
            </Button>
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1 focus-visible"
                    >
                      <User className="w-4 h-4" />
                      <span className="hidden lg:inline">Profile</span>
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => setIsProfilePanelOpen(true)}>
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.location.href = '/dashboard'}>
                      <Settings className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.location.href = '/buy'}>
                      <Star className="w-4 h-4 mr-2" />
                      My Favorites
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => window.location.href = '/sell'}>
                      <Plus className="w-4 h-4 mr-2" />
                      List Property
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.location.href = '/premium-plans'}>
                      <Star className="w-4 h-4 mr-2" />
                      Upgrade to Premium
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="navy" 
                  size="sm" 
                  className="gap-1 focus-visible"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <User className="w-4 h-4" />
                  Login
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-blue-500">
                {notificationCount}
              </Badge>
            )}
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
                <Button variant="outline" size="sm" className="w-full justify-start gap-2 relative">
                  <Heart className="w-4 h-4" />
                  Saved Properties
                  {savedPropertiesCount > 0 && (
                    <Badge className="ml-auto bg-red-500 text-white text-xs">
                      {savedPropertiesCount}
                    </Badge>
                  )}
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-2 relative">
                  <Bell className="w-4 h-4" />
                  Notifications
                  {notificationCount > 0 && (
                    <Badge className="ml-auto bg-blue-500 text-white text-xs">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
                {/* Profile entry always available */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start gap-2"
                  onClick={() => { setIsProfilePanelOpen(true); setIsMenuOpen(false); }}
                >
                  <User className="w-4 h-4" />
                  Profile
                </Button>
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                        <Settings className="w-4 h-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link to="/sell" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                        <Plus className="w-4 h-4" />
                        List Property
                      </Button>
                    </Link>
                    <Link to="/premium-plans" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                        <Star className="w-4 h-4" />
                        Upgrade to Premium
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => { signOut(); setIsMenuOpen(false); }} className="w-full justify-start gap-2">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="navy" 
                    size="sm" 
                    className="w-full justify-start gap-2"
                    onClick={() => { 
                      setIsAuthModalOpen(true); 
                      setIsMenuOpen(false); 
                    }}
                  >
                    <User className="w-4 h-4" />
                    Login / Sign Up
                  </Button>
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header;