import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Home, 
  Heart, 
  Search, 
  Settings, 
  User,
  Bell,
  TrendingUp,
  Building,
  MapPin,
  Calendar,
  Phone,
  Mail
} from "lucide-react";

const Dashboard = () => {
  const { user, isAuthenticated, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to auth
  }

  const recentActivities = [
    { action: "Viewed", property: "3BHK Apartment in Gurgaon", time: "2 hours ago" },
    { action: "Saved", property: "Villa in Whitefield", time: "1 day ago" },
    { action: "Contacted", property: "2BHK in Andheri", time: "3 days ago" },
  ];

  const savedProperties = [
    { id: 1, title: "Luxury 3BHK Apartment", location: "Gurgaon", price: "₹1.2 Cr" },
    { id: 2, title: "Modern Villa", location: "Bangalore", price: "₹85 Lac" },
    { id: 3, title: "Spacious 2BHK", location: "Mumbai", price: "₹25,000/month" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-r from-navy to-primary text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Welcome back, {user?.email?.split('@')[0] || 'User'}!
                </h1>
                <p className="text-white/90">
                  Manage your properties and preferences from your dashboard
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <Button variant="secondary" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm" onClick={signOut} className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-navy">
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Saved Properties</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      +2 from last week
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Property Views</CardTitle>
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Contacted Owners</CardTitle>
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">
                      Active conversations
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest property browsing activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            {activity.action === "Viewed" && <Search className="w-5 h-5 text-primary" />}
                            {activity.action === "Saved" && <Heart className="w-5 h-5 text-primary" />}
                            {activity.action === "Contacted" && <Phone className="w-5 h-5 text-primary" />}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {activity.action} {activity.property}
                            </p>
                            <p className="text-sm text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{activity.action}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Saved Properties */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Saved Properties</CardTitle>
                  <CardDescription>
                    Properties you've bookmarked for later
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {savedProperties.map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <Building className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{property.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              {property.location}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{property.price}</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user?.email?.split('@')[0] || 'User'}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-primary/5 border-l-4 border-primary rounded">
                      <p className="text-sm font-medium">New Property Match</p>
                      <p className="text-xs text-muted-foreground">3 new properties match your criteria</p>
                    </div>
                    <div className="p-3 bg-accent/5 border-l-4 border-accent rounded">
                      <p className="text-sm font-medium">Price Drop Alert</p>
                      <p className="text-xs text-muted-foreground">Property in Gurgaon reduced by ₹10L</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Search className="w-4 h-4 mr-2" />
                    Search Properties
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Home className="w-4 h-4 mr-2" />
                    List Property
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Market Insights
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;