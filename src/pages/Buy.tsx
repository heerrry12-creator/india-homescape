import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilter from "@/components/PropertyFilter";
import { MapPin, Home, Building, TreePine, Store, Grid3X3, List, Zap } from "lucide-react";

const BuyPage = () => {
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState("grid");
  const [showMap, setShowMap] = useState(false);

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
    "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur"
  ];

  const propertyTypes = [
    { value: "apartment", label: "Apartment", icon: Building },
    { value: "villa", label: "Villa", icon: TreePine },
    { value: "house", label: "House", icon: Home },
    { value: "commercial", label: "Commercial", icon: Store }
  ];

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
      daysListed: 2,
      status: "Hot Deal"
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
      daysListed: 5,
      status: "Active"
    },
    {
      id: "3",
      title: "Premium 2BHK Near Metro",
      price: "₹75 Lac",
      location: "Andheri West, Mumbai",
      bedrooms: 2,
      bathrooms: 2,
      area: "950 sq ft",
      type: "Apartment",
      image: "/placeholder.svg",
      isVerified: true,
      views: 67,
      photos: 6,
      daysListed: 1,
      status: "New"
    },
    {
      id: "4",
      title: "Spacious 4BHK Penthouse",
      price: "₹2.5 Cr",
      location: "Koramangala, Bangalore",
      bedrooms: 4,
      bathrooms: 4,
      area: "2,800 sq ft",
      type: "Penthouse",
      image: "/placeholder.svg",
      isVerified: true,
      isFeatured: true,
      views: 234,
      photos: 15,
      videos: 2,
      daysListed: 3,
      status: "Open House"
    },
    {
      id: "5",
      title: "Cozy 1BHK Studio Apartment",
      price: "₹45 Lac",
      location: "Powai, Mumbai",
      bedrooms: 1,
      bathrooms: 1,
      area: "650 sq ft",
      type: "Studio",
      image: "/placeholder.svg",
      isVerified: true,
      views: 98,
      photos: 7,
      daysListed: 4,
      status: "Price Reduced"
    },
    {
      id: "6",
      title: "Independent House with Garden",
      price: "₹1.8 Cr",
      location: "Jubilee Hills, Hyderabad",
      bedrooms: 5,
      bathrooms: 4,
      area: "3,200 sq ft",
      type: "House",
      image: "/placeholder.svg",
      isPremium: true,
      views: 156,
      photos: 20,
      videos: 1,
      daysListed: 7,
      status: "Active"
    }
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
                <span className="text-muted-foreground">{sampleProperties.length} properties found</span>
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

            <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
              {sampleProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  {...property} 
                  className={viewMode === "list" ? "md:flex md:max-w-none" : ""}
                />
              ))}
            </div>

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