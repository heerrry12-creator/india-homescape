import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import PropertyCard from "@/components/PropertyCard";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, MapPin, Home, Building, TreePine, Store } from "lucide-react";

const BuyPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budgetRange, setBudgetRange] = useState([10, 200]);
  const [bedrooms, setBedrooms] = useState("");

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
      daysListed: 1
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
            <Card className="p-6">
              <div className="space-y-6">
                {/* Main Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by city, locality, or project..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>

                {/* Filters Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger>
                      <SelectValue placeholder="Bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 BHK</SelectItem>
                      <SelectItem value="2">2 BHK</SelectItem>
                      <SelectItem value="3">3 BHK</SelectItem>
                      <SelectItem value="4">4+ BHK</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Budget (₹ Lac)</label>
                    <Slider
                      value={budgetRange}
                      onValueChange={setBudgetRange}
                      max={500}
                      min={10}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹{budgetRange[0]} Lac</span>
                      <span>₹{budgetRange[1]} Lac</span>
                    </div>
                  </div>

                  <Button className="h-10" variant="primary">
                    <Filter className="w-4 h-4 mr-2" />
                    Search Properties
                  </Button>
                </div>
              </div>
            </Card>
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
              <h2 className="text-2xl font-bold">Available Properties</h2>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">{sampleProperties.length} properties found</span>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="area">Area</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
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