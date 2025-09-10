import { useEffect, useMemo, useState } from "react";
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
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Users,
  Gift,
  Zap,
  Home
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface UserProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfilePanel = ({ isOpen, onClose }: UserProfilePanelProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'alerts' | 'settings'>('profile');

  type ActivityKey = "contacted" | "seen" | "saved" | "searches";
  interface ActivityStore {
    contacted: string[];
    seen: string[];
    saved: string[];
    searches: string[];
  }

  const storageKey = useMemo(() => `activity_${user?.id ?? "anon"}`,[user?.id]);

  const [activity, setActivity] = useState<ActivityStore>({
    contacted: [],
    seen: [],
    saved: [],
    searches: [],
  });

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'property' as const,
      title: 'New property matches your search',
      message: '3 new properties found in Whitefield, Bangalore',
      time: '2 hours ago',
      isRead: false,
      icon: Home
    },
    {
      id: 2,
      type: 'price' as const,
      title: 'Price drop alert',
      message: 'The 3BHK in Koramangala dropped by ₹2L',
      time: '1 day ago',
      isRead: false,
      icon: TrendingUp
    },
    {
      id: 3,
      type: 'system' as const,
      title: 'Welcome to home.com!',
      message: 'Complete your profile to get personalized recommendations',
      time: '3 days ago',
      isRead: true,
      icon: CheckCircle
    }
  ];

  // Mock property alerts
  const propertyAlerts = [
    {
      id: 1,
      name: 'Bangalore 3BHK',
      location: 'Whitefield, Bangalore',
      price: '₹80L - ₹1.2Cr',
      bedrooms: '3',
      isActive: true,
      lastMatch: '2 hours ago'
    },
    {
      id: 2,
      name: 'Mumbai 2BHK',
      location: 'Andheri West, Mumbai',
      price: '₹1.5Cr - ₹2Cr',
      bedrooms: '2',
      isActive: true,
      lastMatch: '1 day ago'
    }
  ];

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        setActivity(JSON.parse(raw));
      } else {
        // Seed with empty arrays per user on first open
        const initial: ActivityStore = { contacted: [], seen: [], saved: [], searches: [] };
        localStorage.setItem(storageKey, JSON.stringify(initial));
        setActivity(initial);
      }
    } catch {
      // ignore storage errors
    }
  }, [storageKey]);

  const getCount = (key: ActivityKey) => activity[key]?.length ?? 0;

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const activityData: Array<{
    key: ActivityKey;
    icon: any;
    label: string;
    bgColor: string;
    iconColor: string;
    borderColor: string;
    isHighlighted?: boolean;
  }> = [
    { key: "contacted", icon: Phone, label: "Contacted Properties", bgColor: "bg-orange-50", iconColor: "text-orange-600", borderColor: "border-orange-200" },
    { key: "seen", icon: Eye, label: "Seen Properties", bgColor: "bg-purple-50", iconColor: "text-purple-600", borderColor: "border-purple-200", isHighlighted: true },
    { key: "saved", icon: Heart, label: "Saved Properties", bgColor: "bg-gray-50", iconColor: "text-gray-600", borderColor: "border-gray-200" },
    { key: "searches", icon: Search, label: "Recent Searches", bgColor: "bg-blue-50", iconColor: "text-blue-600", borderColor: "border-blue-200" },
  ];

  const navigationItems = [
    { icon: Diamond, label: "Zero Brokerage Properties", action: () => navigate("/buy?filter=zero-brokerage") },
    { icon: FileText, label: "My Transactions", action: () => navigate("/dashboard?tab=transactions") },
    { icon: Star, label: "My Reviews", hasNew: true, highlighted: true, action: () => navigate("/dashboard?tab=reviews") },
    { icon: LinkIcon, label: "Quick Links", hasChevron: true, action: () => navigate("/") },
    { icon: Package, label: "Residential Packages", hasChevron: true, action: () => navigate("/premium-plans") },
    { icon: TrendingUp, label: "Housing Edge", hasChevron: true, action: () => toast({ title: "Housing Edge", description: "Coming soon." }) },
    { icon: Settings, label: "Services", hasChevron: true, action: () => toast({ title: "Services", description: "Coming soon." }) },
    { icon: Target, label: "Top Search", hasChevron: true, action: () => navigate("/buy") },
    { icon: Bell, label: "Unsubscribe Alerts", hasChevron: true, action: () => navigate("/dashboard?tab=alerts") },
    { icon: GraduationCap, label: "Housing Advice", hasChevron: true, action: () => window.open("https://housing.com/news", "_blank") },
    { icon: Shield, label: "Report a Fraud", hasChevron: true, action: () => toast({ title: "Report a Fraud", description: "Use our help center to report issues." }) },
  ];

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

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
        id="user-profile-panel"
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

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'profile' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors relative ${
                activeTab === 'notifications' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Notifications
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">
                  {unreadNotifications}
                </Badge>
              )}
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'alerts' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Alerts
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'settings' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Settings
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'profile' && (
              <>
                {/* Promotional Card */}
                <div className="m-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                      <Building2 className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-800 mb-1">Looking to sell/rent your property?</h3>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white text-xs px-3 py-1 font-medium" onClick={() => navigate("/sell")}>
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
                        <Button variant="outline" size="sm" className="text-xs h-7 px-2 border-gray-300" onClick={() => navigate("/dashboard")}>
                          Edit
                        </Button>
                        <Button size="sm" className="text-xs h-7 px-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white" onClick={() => navigate("/premium-plans")}>
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
                    {activityData.map((item, index) => {
                      const isOpen = openSections.includes(item.key);
                      return (
                        <div key={index} className={`rounded-lg border ${item.borderColor} ${item.bgColor} ${item.isHighlighted ? 'ring-1 ring-purple-200' : ''}`}>
                          <button
                            className="w-full p-3 text-left hover:shadow-sm transition-all duration-200"
                            onClick={() => toggleSection(item.key)}
                            aria-expanded={isOpen}
                          >
                            <div className="flex flex-col items-center space-y-2">
                              <div className={`p-2 rounded-lg bg-white/90`}>
                                <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                              </div>
                              <div className="text-center">
                                <div className={`font-semibold text-sm ${item.iconColor}`}>{getCount(item.key).toString().padStart(2, '0')}</div>
                                <div className="text-xs text-gray-600 font-medium leading-tight">{item.label}</div>
                              </div>
                            </div>
                          </button>
                          {isOpen && (
                            <div className="px-3 pb-3">
                              {activity[item.key].length === 0 ? (
                                <div className="text-xs text-gray-500">No items yet.</div>
                              ) : (
                                <ul className="text-xs text-gray-700 space-y-1">
                                  {activity[item.key].slice(0, 5).map((entry, i) => (
                                    <li key={i} className="truncate">• {entry}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Start New Search Button with illustration */}
                  <div className="mt-4 relative">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg" onClick={() => navigate('/buy')}>
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
                      onClick={() => item.action && item.action()}
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
              </>
            )}

            {activeTab === 'notifications' && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                  <Button variant="outline" size="sm" className="text-xs">
                    Mark all read
                  </Button>
                </div>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-3 rounded-lg border ${notification.isRead ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${notification.isRead ? 'bg-gray-200' : 'bg-blue-200'}`}>
                          <notification.icon className={`w-4 h-4 ${notification.isRead ? 'text-gray-600' : 'text-blue-600'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium text-sm ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                              {notification.title}
                            </h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Property Alerts</h3>
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => navigate('/buy')}>
                    <Plus className="w-3 h-3 mr-1" />
                    New Alert
                  </Button>
                </div>
                <div className="space-y-3">
                  {propertyAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 rounded-lg border border-gray-200 bg-white">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900">{alert.name}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {alert.location}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {alert.bedrooms} BHK
                            </span>
                            <span>{alert.price}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Last match: {alert.lastMatch}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`text-xs ${alert.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {alert.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-gray-900">Notifications</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                          <p className="text-xs text-gray-600">Receive updates about new properties</p>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs">On</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-900">SMS Alerts</p>
                          <p className="text-xs text-gray-600">Get instant SMS for price drops</p>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs">Off</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-900">WhatsApp Updates</p>
                          <p className="text-xs text-gray-600">Receive property updates on WhatsApp</p>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs">On</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-gray-900">Privacy</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Profile Visibility</p>
                          <p className="text-xs text-gray-600">Show your profile to other users</p>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs">Public</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePanel;