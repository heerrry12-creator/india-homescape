import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { Home, Zap, Shield, TrendingUp, Users, Phone, Mail, MapPin, 
         Building, Briefcase, Key, Star, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

const HomePage = () => {
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
            src={heroImage} 
            alt="Beautiful Indian home"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-primary/60"></div>
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
              <SearchBar />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Button variant="secondary" size="xl" className="group">
                <Home className="w-5 h-5 mr-2" />
                Buy Properties
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-navy">
                <Key className="w-5 h-5 mr-2" />
                Sell Property
              </Button>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-navy">
                <Building className="w-5 h-5 mr-2" />
                Rent Properties
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Properties in Major Cities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find your perfect home across India's most sought-after locations
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {majorCities.map((city) => (
              <Card key={city} className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
                <div className="text-center">
                  <MapPin className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {city}
                  </h3>
                </div>
              </Card>
            ))}
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
                Handpicked premium listings for you
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex">
              View All Properties
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Button variant="outline" size="lg">
              View All Properties
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl">
              <Home className="w-5 h-5 mr-2" />
              Start Searching
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
              <Briefcase className="w-5 h-5 mr-2" />
              List Your Property
            </Button>
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