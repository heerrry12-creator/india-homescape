import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  X, 
  Edit, 
  ArrowUp, 
  Eye, 
  Heart, 
  Search, 
  Phone, 
  MessageCircle, 
  Star, 
  Link as LinkIcon, 
  Home, 
  TrendingUp, 
  Wrench, 
  Target, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  Smartphone, 
  Facebook, 
  Twitter, 
  Instagram, 
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfilePanel = ({ isOpen, onClose }: UserProfilePanelProps) => {
  const { user, signOut } = useAuth();
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const activityData = [
    { icon: Phone, label: "Contacted", count: 12, color: "text-blue-600" },
    { icon: Eye, label: "Seen", count: 45, color: "text-green-600" },
    { icon: Heart, label: "Saved", count: 8, color: "text-red-600" },
    { icon: Search, label: "Searches", count: 23, color: "text-purple-600" },
  ];

  const menuSections = [
    {
      id: "zero-brokerage",
      title: "Zero Brokerage Properties",
      icon: Home,
      items: ["New Launch", "Ready to Move", "Under Construction"]
    },
    {
      id: "transactions",
      title: "My Transactions",
      icon: TrendingUp,
      items: ["Purchase History", "Rental Agreements", "Payment History"]
    },
    {
      id: "reviews",
      title: "My Reviews",
      icon: Star,
      items: ["Given Reviews", "Received Reviews", "Pending Reviews"]
    },
    {
      id: "quick-links",
      title: "Quick Links",
      icon: LinkIcon,
      items: ["Favorites", "Recent Views", "Bookmarks"]
    },
    {
      id: "packages",
      title: "Residential Packages",
      icon: Home,
      items: ["Premium Package", "Basic Package", "Enterprise Package"]
    },
    {
      id: "housing-edge",
      title: "Housing Edge",
      icon: TrendingUp,
      items: ["Market Insights", "Price Trends", "Investment Tips"]
    },
    {
      id: "services",
      title: "Services",
      icon: Wrench,
      items: ["Home Loans", "Legal Services", "Interior Design"]
    },
    {
      id: "top-search",
      title: "Top Search",
      icon: Target,
      items: ["Popular Locations", "Trending Properties", "Hot Deals"]
    },
    {
      id: "alerts",
      title: "Unsubscribe Alerts",
      icon: Bell,
      items: ["Email Alerts", "SMS Alerts", "Push Notifications"]
    },
    {
      id: "advice",
      title: "Housing Advice",
      icon: MessageCircle,
      items: ["Expert Tips", "Market Analysis", "Investment Guide"]
    },
    {
      id: "fraud",
      title: "Report a Fraud",
      icon: Shield,
      items: ["Report Property", "Report Agent", "Report Scam"]
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`fixed top-0 right-0 h-full w-full lg:w-1/2 bg-background border-l shadow-xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Profile</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Profile Section */}
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                  <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base truncate">
                    {user?.email?.split('@')[0] || 'User'}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {user?.email}
                  </p>
                  <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="default" size="sm" className="text-xs">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      Upgrade
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Section */}
            <div className="p-4 border-b">
              <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wide">My Activity</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {activityData.map((item, index) => (
                  <div key={index} className="text-center p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                    <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                    <div className="font-bold text-lg">{item.count}</div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Menu */}
            <div className="p-4 space-y-2">
              <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wide">Features</h4>
              {menuSections.map((section) => (
                <Collapsible 
                  key={section.id}
                  open={openSections.includes(section.id)}
                  onOpenChange={() => toggleSection(section.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start p-3 h-auto hover:bg-muted/70"
                    >
                      <section.icon className="w-4 h-4 mr-3 text-muted-foreground" />
                      <span className="flex-1 text-left">{section.title}</span>
                      {openSections.includes(section.id) ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 ml-7 mt-1">
                    {section.items.map((item, index) => (
                      <Button 
                        key={index}
                        variant="ghost" 
                        size="sm"
                        className="w-full justify-start text-sm text-muted-foreground hover:text-foreground"
                      >
                        {item}
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-4 space-y-3">
            {/* Help & Logout */}
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="flex-1 justify-start">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help Center
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut} className="flex-1 justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </div>

            <Separator />

            {/* App Downloads */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Download Our App</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Smartphone className="w-3 h-3 mr-1" />
                  iOS
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Smartphone className="w-3 h-3 mr-1" />
                  Android
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Follow Us</p>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Instagram className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePanel;