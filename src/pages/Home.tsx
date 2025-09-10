import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { Home, Zap, Shield, TrendingUp, Users, Phone, Mail, MapPin, 
         Building, Briefcase, Key, Star, ChevronRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-home.jpg";
import heroBuyImage from "@/assets/hero-buy.jpg";
import heroRentImage from "@/assets/hero-rent.jpg";
import heroPgImage from "@/assets/hero-pg.jpg";
import heroPlotImage from "@/assets/hero-plot.jpg";
import heroCommercialImage from "@/assets/hero-commercial.jpg";

interface Property {
  id: string;
  user_id: string;
  title: string;
  description: string;
  property_type: string;
  listing_type: string;
  city: string;
  locality: string;
  address: string;
  price: number;
  area: number;
  bedrooms: number | null;
  bathrooms: number | null;
  amenities: string[];
  images: string[];
  videos: string[];
  plan_type: string;
  status: string;
  views: number;
  leads: number;
  is_verified: boolean;
  is_featured: boolean;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("buy");
  const [currentBgImage, setCurrentBgImage] = useState(heroImage);
  const [properties, setProperties] = useState<Property[]>([]);

  // Load properties from localStorage
  useEffect(() => {
    const loadProperties = () => {
      try {
        const demoProperties = JSON.parse(localStorage.getItem('demo_properties') || '[]');
        
        // If no properties exist, initialize with sample properties
        if (demoProperties.length === 0) {
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
        } else {
          setProperties(demoProperties);
        }
      } catch (error) {
        console.error('Error loading properties:', error);
      }
    };

    loadProperties();
    
    // Listen for storage changes to update properties in real-time
    const handleStorageChange = () => {
      loadProperties();
    };

    // Listen for custom event when new property is created
    const handlePropertyCreated = () => {
      loadProperties();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('propertyCreated', handlePropertyCreated);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('propertyCreated', handlePropertyCreated);
    };
  }, []);

  // Transform properties to PropertyCard format
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

  const categoryImages = {
    buy: heroBuyImage,
    rent: heroRentImage,
    pg: heroPgImage,
    plot: heroPlotImage,
    commercial: heroCommercialImage,
  };

  const categories = [
    { id: "buy", label: "Buy", icon: Home },
    { id: "rent", label: "Rent", icon: Building },
    { id: "pg", label: "PG/Co-living", icon: Users },
    { id: "plot", label: "Plot", icon: MapPin },
    { id: "commercial", label: "Commercial", icon: Briefcase }
  ];

  const premiumPlans = [
    {
      name: "Basic Plan",
      price: "₹999",
      period: "30 days",
      features: [
        "List up to 5 properties",
        "Basic property photos",
        "Standard listing visibility",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Premium Plan",
      price: "₹2,499",
      period: "60 days",
      features: [
        "List unlimited properties",
        "Professional photography",
        "Top listing placement",
        "Priority support",
        "Get buyer contact numbers",
        "Property analytics"
      ],
      popular: true
    },
    {
      name: "Seller Pro",
      price: "₹4,999",
      period: "90 days",
      features: [
        "Everything in Premium",
        "Dedicated relationship manager",
        "Virtual tour creation",
        "Social media promotion",
        "Legal document assistance"
      ],
      popular: false
    }
  ];

  const buyerPlans = [
    {
      name: "Buyer Basic",
      price: "₹499",
      period: "30 days",
      features: [
        "Contact up to 10 owners",
        "Save unlimited properties",
        "Basic property alerts",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Buyer Premium",
      price: "₹1,299",
      period: "60 days",
      features: [
        "Contact up to 50 owners",
        "Direct owner phone numbers",
        "Priority property alerts",
        "WhatsApp support",
        "Property comparison tool"
      ],
      popular: true
    }
  ];

  const userReviews = [
    {
      name: "Rajesh Sharma",
      location: "Mumbai",
      rating: 5,
      review: "Found my dream home in just 2 weeks! The direct owner contact feature saved me from broker fees.",
      image: "/placeholder.svg"
    },
    {
      name: "Priya Patel",
      location: "Bangalore",
      rating: 5,
      review: "Excellent service and verified properties. The premium plan was worth every penny.",
      image: "/placeholder.svg"
    },
    {
      name: "Amit Kumar",
      location: "Delhi",
      rating: 4,
      review: "Great platform with genuine listings. Sold my property within a month!",
      image: "/placeholder.svg"
    },
    {
      name: "Sneha Reddy",
      location: "Hyderabad",
      rating: 5,
      review: "The virtual tours and professional photos helped me rent out my property quickly.",
      image: "/placeholder.svg"
    }
  ];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentBgImage(categoryImages[categoryId as keyof typeof categoryImages] || heroImage);
  };

  const sampleProperties = [
    {
      id: "1",
      title: "Luxury 3BHK Apartment in Gurgaon",
      price: "₹1.2 Cr",
      originalPrice: "₹1.5 Cr",
      location: "Sector 47, Gurgaon",
      bedrooms: 3,
      bathrooms: 2,
      area: "1,450 sq ft",
      type: "Apartment",
      image: "/placeholder.svg",
      isVerified: true,
      isPremium: true,
      views: 125,
      photos: 12,
      videos: 1,
      daysListed: 2
    },
    {
      id: "2", 
      title: "Modern Villa with Swimming Pool",
      price: "₹85 Lac",
      location: "Whitefield, Bangalore",
      bedrooms: 4,
      bathrooms: 3,
      area: "2,200 sq ft",
      type: "Villa",
      image: "/placeholder.svg",
      isFeatured: true,
      views: 89,
      photos: 8,
      daysListed: 5
    },
    {
      id: "3",
      title: "Spacious 2BHK for Rent",
      price: "₹25,000/month",
      location: "Andheri West, Mumbai",
      bedrooms: 2,
      bathrooms: 2,
      area: "950 sq ft",
      type: "Apartment",
      image: "/placeholder.svg",
      isVerified: true,
      views: 67,
      photos: 6,
      daysListed: 1
    }
  ];

  const majorCities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
    "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur",
    "Nagpur", "Visakhapatnam", "Indore", "Thane", "Bhopal", "Patna"
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Properties",
      description: "All properties are verified by our expert team"
    },
    {
      icon: Users,
      title: "Trusted Agents",
      description: "Connect with certified real estate professionals"
    },
    {
      icon: Zap,
      title: "Instant Updates",
      description: "Get real-time notifications for new listings"
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Access detailed market trends and analysis"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy to-primary text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={currentBgImage} 
            alt="Beautiful Indian home"
            className="w-full h-full object-cover opacity-20 transition-all duration-500"
            key={selectedCategory}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-navy/70 to-red-400/30"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Dream Home in
              <span className="text-accent block md:inline md:ml-3">India</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Discover perfect properties across 50+ major cities. Buy, sell, or rent with confidence.
            </p>
            
            
            {/* Search Bar */}
            <div className="mb-8">
              <SearchBar selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Link to="/buy">
                <Button variant="hero" size="xl" className="group h-14 text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full">
                  <Home className="w-6 h-6 mr-3" />
                  Buy Properties
                  <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/sell">
                <Button variant="outline" size="xl" className="group h-14 text-base font-semibold bg-white/10 border-white/30 text-white hover:bg-white hover:text-navy shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full">
                  <Key className="w-6 h-6 mr-3" />
                  Sell Property
                  <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/rent" className="sm:col-span-2 lg:col-span-1">
                <Button variant="outline" size="xl" className="group h-14 text-base font-semibold bg-white/10 border-white/30 text-white hover:bg-white hover:text-navy shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full">
                  <Building className="w-6 h-6 mr-3" />
                  Rent Properties
                  <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Properties
              </h2>
              <p className="text-lg text-muted-foreground">
                {transformedProperties.length > 0 
                  ? `${transformedProperties.length} properties available` 
                  : 'Handpicked premium listings for you'
                }
              </p>
            </div>
            <Link to="/buy">
              <Button variant="outline" className="hidden md:flex">
                View All Properties
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {transformedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {transformedProperties.slice(0, 6).map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Building className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Properties Listed Yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to list your property and start getting leads!
              </p>
              <Link to="/sell">
                <Button>
                  <Key className="w-4 h-4 mr-2" />
                  List Your Property
                </Button>
              </Link>
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link to="/buy">
              <Button variant="outline" size="lg">
                View All Properties
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose home.com?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              India's most trusted real estate platform with cutting-edge features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect property with us
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/buy">
              <Button variant="secondary" size="xl" className="group h-14 text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-w-[200px]">
                <Home className="w-6 h-6 mr-3" />
                Start Searching
                <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link to="/sell">
              <Button variant="outline" size="xl" className="group h-14 text-base font-semibold bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-w-[200px]">
                <Briefcase className="w-6 h-6 mr-3" />
                List Your Property
                <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Plan Box */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div 
              onClick={() => {
                const isMobile = window.innerWidth < 768;
                if (isMobile) {
                  window.location.href = '/premium-plans';
                } else {
                  window.open('/premium-plans', '_blank');
                }
              }}
              className="cursor-pointer bg-gradient-to-r from-blue-500 to-red-500 rounded-xl p-8 text-center text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <h2 className="text-2xl md:text-3xl font-bold">Premium Plan</h2>
            </div>
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from satisfied customers across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userReviews.map((review, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={review.image} 
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">{review.location}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star 
                      key={starIndex} 
                      className={`w-4 h-4 ${starIndex < review.rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
                <p className="text-foreground text-sm">{review.review}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Need Help? Contact Us
              </h2>
              <p className="text-lg text-muted-foreground">
                Our experts are here to assist you 24/7
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-muted-foreground mb-3">Mon-Sat 9AM-9PM</p>
                <p className="text-primary font-medium">+91 98765 43210</p>
              </Card>

              <Card className="p-6 text-center">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-3">24/7 Support</p>
                <p className="text-primary font-medium">support@home.com</p>
              </Card>

              <Card className="p-6 text-center">
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Advice</h3>
                <p className="text-muted-foreground mb-3">Free Consultation</p>
                <Button variant="primary" size="sm">Book Now</Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;