import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Edit, 
  Crown, 
  Eye, 
  Heart, 
  Search, 
  Phone, 
  Star, 
  Link as LinkIcon, 
  Package, 
  TrendingUp, 
  Wrench, 
  Target, 
  Bell, 
  GraduationCap, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Plus,
  Building2,
  Diamond,
  FileText,
  Settings,
  BarChart3
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
    { icon: Phone, label: "Contacted Properties", count: "00", bgColor: "bg-orange-50", iconColor: "text-orange-600", borderColor: "border-orange-200" },
    { icon: Eye, label: "Seen Properties", count: "00", bgColor: "bg-purple-50", iconColor: "text-purple-600", borderColor: "border-purple-200", isHighlighted: true },
    { icon: Heart, label: "Saved Properties", count: "00", bgColor: "bg-gray-50", iconColor: "text-gray-600", borderColor: "border-gray-200" },
    { icon: Search, label: "Recent Searches", count: "00", bgColor: "bg-blue-50", iconColor: "text-blue-600", borderColor: "border-blue-200" },
  ];

  const navigationItems = [
    { icon: Diamond, label: "Zero Brokerage Properties", hasNew: false },
    { icon: FileText, label: "My Transactions", hasNew: false },
    { icon: Star, label: "My Reviews", hasNew: true, highlighted: true },
    { icon: LinkIcon, label: "Quick Links", hasNew: false, hasChevron: true },
    { icon: Package, label: "Residential Packages", hasNew: false, hasChevron: true },
    { icon: TrendingUp, label: "Housing Edge", hasNew: false, hasChevron: true },
    { icon: Settings, label: "Services", hasNew: false, hasChevron: true },
    { icon: Target, label: "Top Search", hasNew: false, hasChevron: true },
    { icon: Bell, label: "Unsubscribe Alerts", hasNew: false, hasChevron: true },
    { icon: GraduationCap, label: "Housing Advice", hasNew: false, hasChevron: true },
    { icon: Shield, label: "Report a Fraud", hasNew: false, hasChevron: true },
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
        className={`fixed top-0 right-0 h-full w-full md:w-1/3 lg:w-[400px] bg-white border-l border-gray-200 shadow-xl z-50 transform transition-all duration-300 ease-out ${
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
            <div className="m-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                  <Building2 className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-gray-800 mb-1">Looking to sell/rent your property?</h3>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white text-xs px-3 py-1 font-medium">
                    Post property for FREE
                  </Button>
                </div>
              </div>
            </div>

            {/* Profile Section */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start space-x-3">
                <Avatar className="w-12 h-12 border-2 border-gray-200">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                  <AvatarFallback className="text-sm font-semibold bg-purple-600 text-white">
                    {user?.email?.charAt(0).toUpperCase() || 'H'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-gray-900 truncate">
                    Hello {user?.email?.split('@')[0] || 'harry'}!
                  </h3>
                  <p className="text-xs text-gray-600 truncate">
                    +91-9510129517
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button variant="outline" size="sm" className="text-xs h-7 px-2 border-gray-300">
                      Edit
                    </Button>
                    <Button size="sm" className="text-xs h-7 px-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                      💎 Upgrade to Premium
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Section */}
            <div className="p-4 border-b border-gray-100">
              <h4 className="font-medium text-sm text-gray-900 mb-3">My Activity</h4>
              <div className="grid grid-cols-2 gap-2">
                {activityData.map((item, index) => (
                  <button 
                    key={index} 
                    className={`p-3 rounded-lg border ${item.borderColor} ${item.bgColor} ${
                      item.isHighlighted ? 'ring-1 ring-purple-200' : ''
                    } hover:shadow-sm transition-all duration-200 text-left`}
                    tabIndex={0}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`p-2 rounded-lg bg-white/90`}>
                        <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                      </div>
                      <div className="text-center">
                        <div className={`font-semibold text-sm ${item.iconColor}`}>{item.count}</div>
                        <div className="text-xs text-gray-600 font-medium leading-tight">{item.label}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Start New Search Button with illustration */}
              <div className="mt-4 relative">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg">
                  Start new search
                </Button>
                <div className="absolute -top-2 right-4 text-purple-200">
                  <BarChart3 className="w-8 h-8 opacity-50" />
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="p-4 space-y-0.5">
              {navigationItems.map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                    item.highlighted 
                      ? 'bg-red-50 border border-red-200 hover:bg-red-100' 
                      : 'hover:bg-gray-50'
                  }`}
                  tabIndex={0}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`w-4 h-4 ${item.highlighted ? 'text-red-600' : 'text-gray-600'}`} />
                    <span className={`font-medium text-sm ${item.highlighted ? 'text-red-800' : 'text-gray-700'}`}>
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {item.hasNew && (
                      <Badge className="bg-pink-500 text-white text-xs px-1.5 py-0.5 font-semibold">
                        NEW
                      </Badge>
                    )}
                    {item.hasChevron && (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>
              ))}
              
              {/* Help Center - Highlighted */}
              <button className="w-full flex items-center justify-between p-3 rounded-lg text-left bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-sm text-blue-800">Visit Help Center</span>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-400" />
              </button>
              
              {/* Log Out */}
              <button 
                onClick={signOut}
                className="w-full flex items-center justify-between p-3 rounded-lg text-left hover:bg-gray-50 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <LogOut className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-sm text-gray-700">Log Out</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePanel;