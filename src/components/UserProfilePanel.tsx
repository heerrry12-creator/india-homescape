import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  X, 
  Edit, 
  Crown, 
  Eye, 
  Heart, 
  Search, 
  Phone, 
  MessageCircle, 
  Star, 
  Link as LinkIcon, 
  Home, 
  Package, 
  TrendingUp, 
  Wrench, 
  Target, 
  Bell, 
  GraduationCap, 
  Shield, 
  HelpCircle, 
  LogOut, 
  Smartphone, 
  Facebook, 
  Twitter, 
  Instagram, 
  ChevronDown,
  ChevronRight,
  Plus,
  Building2
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
    { icon: Phone, label: "Contacted", count: 12, bgColor: "bg-blue-50", iconColor: "text-blue-600", countColor: "text-blue-700" },
    { icon: Eye, label: "Seen", count: 45, bgColor: "bg-emerald-50", iconColor: "text-emerald-600", countColor: "text-emerald-700" },
    { icon: Heart, label: "Saved", count: 8, bgColor: "bg-rose-50", iconColor: "text-rose-600", countColor: "text-rose-700" },
    { icon: Search, label: "Recent Searches", count: 23, bgColor: "bg-orange-50", iconColor: "text-orange-600", countColor: "text-orange-700" },
  ];

  const navigationItems = [
    { icon: LinkIcon, label: "Quick Links", hasNew: false },
    { icon: Package, label: "Residential Packages", hasNew: false },
    { icon: TrendingUp, label: "Housing Edge", hasNew: false },
    { icon: Wrench, label: "Services", hasNew: false },
    { icon: Target, label: "Top Search", hasNew: false },
    { icon: Bell, label: "Unsubscribe Alerts", hasNew: false },
    { icon: GraduationCap, label: "Housing Advice", hasNew: false },
    { icon: Shield, label: "Report a Fraud", hasNew: false },
    { icon: Star, label: "My Reviews", hasNew: true, highlighted: true },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/30 z-40 md:hidden"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        aria-label="Close profile panel"
      />
      
      {/* Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-1/3 bg-background border-l border-border shadow-2xl z-50 transform transition-all duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-panel-title"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-background sticky top-0 z-10">
            <h2 id="profile-panel-title" className="text-lg font-semibold text-foreground">Profile</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="hover:bg-muted rounded-full"
              aria-label="Close profile panel"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Promotional Card */}
            <div className="m-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">Looking to sell/rent property?</h3>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5">
                    Post property for FREE
                  </Button>
                </div>
              </div>
            </div>

            {/* Profile Section */}
            <div className="p-4 border-b border-border">
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16 border-2 border-border">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                  <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base text-foreground truncate">
                    {user?.email?.split('@')[0] || 'User'}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {user?.email}
                  </p>
                  <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  <div className="flex items-center space-x-2 mt-3">
                    <Button variant="outline" size="sm" className="text-xs hover:bg-muted">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" className="text-xs bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Section */}
            <div className="p-4 border-b border-border">
              <h4 className="font-semibold text-base text-foreground mb-4">My Activity</h4>
              <div className="grid grid-cols-2 gap-3">
                {activityData.map((item, index) => (
                  <button 
                    key={index} 
                    className={`p-4 rounded-xl border border-border ${item.bgColor} hover:shadow-md transition-all duration-200 text-left`}
                    tabIndex={0}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-white/80`}>
                        <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <div>
                        <div className={`font-bold text-lg ${item.countColor}`}>{item.count}</div>
                        <div className="text-xs text-gray-600 font-medium">{item.label}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Start New Search Button */}
              <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium">
                <Plus className="w-4 h-4 mr-2" />
                Start new search
              </Button>
            </div>

            {/* Navigation Menu */}
            <div className="p-4 space-y-1">
              {navigationItems.map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                    item.highlighted 
                      ? 'bg-yellow-50 border border-yellow-200 hover:bg-yellow-100' 
                      : 'hover:bg-muted/50'
                  }`}
                  tabIndex={0}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`w-5 h-5 ${item.highlighted ? 'text-yellow-600' : 'text-muted-foreground'}`} />
                    <span className={`font-medium text-sm ${item.highlighted ? 'text-yellow-800' : 'text-foreground'}`}>
                      {item.label}
                    </span>
                  </div>
                  {item.hasNew && (
                    <Badge className="bg-pink-500 text-white text-xs px-2 py-0.5 font-semibold">
                      NEW
                    </Badge>
                  )}
                </button>
              ))}
              
              {/* Help Center - Highlighted */}
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-left bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-all duration-200">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-sm text-blue-800">Visit Help Center</span>
              </button>
              
              {/* Log Out */}
              <button 
                onClick={signOut}
                className="w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-red-50 transition-all duration-200"
              >
                <LogOut className="w-5 h-5 text-red-600" />
                <span className="font-medium text-sm text-red-600">Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePanel;