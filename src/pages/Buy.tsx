import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilter from "@/components/PropertyFilter";
import { MapPin, Home, Building, TreePine, Store, Grid3X3, List, Zap, Loader2 } from "lucide-react";
import { PropertyService } from "@/integrations/supabase/propertyService";
import { useToast } from "@/hooks/use-toast";

const BuyPage = () => {
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState("grid");
  const [showMap, setShowMap] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
    "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur"
  ];

  // Fetch properties from database
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        
        // First try to get properties from localStorage (demo mode)
        const demoProperties = JSON.parse(localStorage.getItem('demo_properties') || '[]');
        
        if (demoProperties.length > 0) {
          setProperties(demoProperties);
        } else {
          // Add some sample demo properties if none exist
          const sampleProperties = [
            {
              id: "demo-1",
              user_id: "demo-user",
              title: "Luxury 3BHK Apartment in Gurgaon",
              description: "Beautiful apartment with modern amenities, located in prime sector with excellent connectivity",
              property_type: "apartment",
              listing_type: "sell",
              city: "Gurgaon",
              locality: "Sector 47",
              address: "Sector 47, Gurgaon, Haryana",
              price: 12000000,
              area: 1450,
              bedrooms: 3,
              bathrooms: 2,
              amenities: ["Parking", "Lift", "Security", "Power Backup", "Swimming Pool", "Gym"],
              images: [
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop"
              ],
              videos: [],
              plan_type: "premium",
              status: "active",
              views: 125,
              leads: 8,
              is_verified: true,
              is_featured: true,
              expires_at: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            {
              id: "demo-2",
              user_id: "demo-user",
              title: "Modern Villa with Swimming Pool",
              description: "Spacious villa with private swimming pool and garden, perfect for family living",
              property_type: "villa",
              listing_type: "sell",
              city: "Bangalore",
              locality: "Whitefield",
              address: "Whitefield, Bangalore, Karnataka",
              price: 8500000,
              area: 2200,
              bedrooms: 4,
              bathrooms: 3,
              amenities: ["Swimming Pool", "Garden", "Security", "Gym", "Parking"],
              images: [
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop"
              ],
              videos: [],
              plan_type: "free",
              status: "active",
              views: 89,
              leads: 5,
              is_verified: false,
              is_featured: false,
              expires_at: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            {
              id: "demo-3",
              user_id: "demo-user",
              title: "Premium 2BHK Near Metro Station",
              description: "Conveniently located 2BHK apartment near metro station with all modern amenities",
              property_type: "apartment",
              listing_type: "sell",
              city: "Mumbai",
              locality: "Andheri West",
              address: "Andheri West, Mumbai, Maharashtra",
              price: 7500000,
              area: 950,
              bedrooms: 2,
              bathrooms: 2,
              amenities: ["Metro Nearby", "Parking", "Lift", "Security", "Power Backup"],
              images: [
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop"
              ],
              videos: [],
              plan_type: "basic",
              status: "active",
              views: 67,
              leads: 3,
              is_verified: true,
              is_featured: false,
              expires_at: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            {
              id: "demo-4",
              user_id: "demo-user",
              title: "Spacious 4BHK Penthouse",
              description: "Luxury penthouse with panoramic city views and premium finishes",
              property_type: "penthouse",
              listing_type: "sell",
              city: "Bangalore",
              locality: "Koramangala",
              address: "Koramangala, Bangalore, Karnataka",
              price: 25000000,
              area: 2800,
              bedrooms: 4,
              bathrooms: 4,
              amenities: ["Panoramic View", "Private Terrace", "Gym", "Swimming Pool", "Security"],
              images: [
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop"
              ],
              videos: [],
              plan_type: "assisted",
              status: "active",
              views: 234,
              leads: 12,
              is_verified: true,
              is_featured: true,
              expires_at: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            {
              id: "demo-5",
              user_id: "demo-user",
              title: "Cozy 1BHK Studio Apartment",
              description: "Perfect starter home with modern amenities and great location",
              property_type: "studio",
              listing_type: "sell",
              city: "Mumbai",
              locality: "Powai",
              address: "Powai, Mumbai, Maharashtra",
              price: 4500000,
              area: 650,
              bedrooms: 1,
              bathrooms: 1,
              amenities: ["Parking", "Lift", "Security", "Power Backup"],
              images: [
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop"
              ],
              videos: [],
              plan_type: "free",
              status: "active",
              views: 98,
              leads: 6,
              is_verified: false,
              is_featured: false,
              expires_at: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            {
              id: "demo-6",
              user_id: "demo-user",
              title: "Independent House with Garden",
              description: "Beautiful independent house with private garden and modern amenities",
              property_type: "house",
              listing_type: "sell",
              city: "Hyderabad",
              locality: "Jubilee Hills",
              address: "Jubilee Hills, Hyderabad, Telangana",
              price: 18000000,
              area: 3200,
              bedrooms: 5,
              bathrooms: 4,
              amenities: ["Private Garden", "Parking", "Security", "Power Backup", "Servant Quarters"],
              images: [
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop"
              ],
              videos: [],
              plan_type: "premium",
              status: "active",
              views: 156,
              leads: 9,
              is_verified: true,
              is_featured: true,
              expires_at: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ];
          
          localStorage.setItem('demo_properties', JSON.stringify(sampleProperties));
          setProperties(sampleProperties);
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties');
        toast({
          title: "Error",
          description: "Failed to load properties. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [toast]);

  // Transform database properties to PropertyCard format
  const transformedProperties = properties.map(property => ({
    id: property.id,
    title: property.title,
    price: `₹${property.price.toLocaleString()}`,
    location: `${property.locality}, ${property.city}`,
    bedrooms: property.bedrooms || 0,
    bathrooms: property.bathrooms || 0,
    area: `${property.area.toLocaleString()} sq ft`,
    type: property.property_type,
    image: property.images?.[0] || "/placeholder.svg",
    isVerified: property.is_verified,
    isPremium: property.plan_type === 'premium' || property.plan_type === 'assisted',
    isFeatured: property.is_featured,
    views: property.views,
    photos: property.images?.length || 0,
    videos: property.videos?.length || 0,
    daysListed: Math.floor((Date.now() - new Date(property.created_at).getTime()) / (1000 * 60 * 60 * 24)),
    status: property.plan_type === 'free' ? 'Free Listing' : 'Premium'
  }));

  const propertyTypes = [
    { value: "apartment", label: "Apartment", icon: Building },
    { value: "villa", label: "Villa", icon: TreePine },
    { value: "house", label: "House", icon: Home },
    { value: "commercial", label: "Commercial", icon: Store }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-navy to-primary text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Buy Your Dream Property
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Explore verified properties across India's major cities
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-8 bg-card shadow-nav">
          <div className="container mx-auto px-4">
            <PropertyFilter onFilterChange={setFilters} type="buy" />
          </div>
        </section>

        {/* Property Types Quick Filter */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Browse by Property Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {propertyTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Card key={type.value} className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-foreground">{type.label}</h3>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Properties Listing */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">Featured Properties</h2>
                <span className="text-muted-foreground">
                  {loading ? 'Loading...' : `${transformedProperties.length} properties found`}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  variant={showMap ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowMap(!showMap)}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {showMap ? "Hide Map" : "Show Map"}
                </Button>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="area">Area</SelectItem>
                    <SelectItem value="popular">Most Viewed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {showMap && (
              <div className="bg-muted/30 rounded-lg p-8 text-center mb-6">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Interactive Map View</h3>
                <p className="text-muted-foreground">
                  Interactive property map would be displayed here with all property locations
                </p>
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin mr-3" />
                <span>Loading properties...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            ) : transformedProperties.length === 0 ? (
              <div className="text-center py-12">
                <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Properties Found</h3>
                <p className="text-muted-foreground">
                  No properties are currently available. Check back later or try different filters.
                </p>
              </div>
            ) : (
              <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
                {transformedProperties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    {...property} 
                    className={viewMode === "list" ? "md:flex md:max-w-none" : ""}
                  />
                ))}
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg" className="group">
                <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                Load More Properties
              </Button>
            </div>
          </div>
        </section>

        {/* Popular Localities */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Popular Localities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {cities.map((city) => (
                <Button key={city} variant="outline" className="h-12 justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  {city}
                </Button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BuyPage;