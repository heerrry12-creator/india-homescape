import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import PropertyCard from "@/components/PropertyCard";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, MapPin, Home, Building, Users, Calendar } from "lucide-react";

const RentPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [rentRange, setRentRange] = useState([5000, 50000]);
  const [bedrooms, setBedrooms] = useState("");

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
    "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur"
  ];

  const rentalProperties = [
    {
      id: "1",
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
    },
    {
      id: "2",
      title: "Furnished 3BHK with Balcony",
      price: "₹35,000/month",
      location: "Whitefield, Bangalore",
      bedrooms: 3,
      bathrooms: 2,
      area: "1,200 sq ft",
      type: "Apartment",
      image: "/placeholder.svg",
      isPremium: true,
      views: 89,
      photos: 8,
      daysListed: 3
    },
    {
      id: "3",
      title: "Studio Apartment Near Metro",
      price: "₹18,000/month",
      location: "Sector 18, Noida",
      bedrooms: 1,
      bathrooms: 1,
      area: "600 sq ft",
      type: "Studio",
      image: "/placeholder.svg",
      isFeatured: true,
      views: 45,
      photos: 5,
      daysListed: 2
    }
  ];

  const rentalTypes = [
    { value: "apartment", label: "Apartment", icon: Building },
    { value: "house", label: "House", icon: Home },
    { value: "pg", label: "PG/Hostel", icon: Users },
    { value: "studio", label: "Studio", icon: Home }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-navy to-primary text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Find Your Perfect Rental
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Discover comfortable homes and apartments for rent across India
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
                      <SelectValue placeholder="Rental Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {rentalTypes.map((type) => (
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
                    <label className="text-sm font-medium">Rent (₹/month)</label>
                    <Slider
                      value={rentRange}
                      onValueChange={setRentRange}
                      max={100000}
                      min={5000}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹{rentRange[0].toLocaleString()}</span>
                      <span>₹{rentRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  <Button className="h-10" variant="primary">
                    <Filter className="w-4 h-4 mr-2" />
                    Search Rentals
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Rental Types Quick Filter */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Browse by Rental Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {rentalTypes.map((type) => {
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

        {/* Featured Amenities */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Popular Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {["Furnished", "Parking", "Balcony", "WiFi", "AC", "Lift", "Security", "Gym", "Pool", "Garden"].map((amenity) => (
                <Button key={amenity} variant="outline" size="sm" className="justify-start">
                  {amenity}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Rental Listings */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Available Rentals</h2>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">{rentalProperties.length} properties found</span>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="rent-low">Rent: Low to High</SelectItem>
                    <SelectItem value="rent-high">Rent: High to Low</SelectItem>
                    <SelectItem value="area">Area</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rentalProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Rentals
              </Button>
            </div>
          </div>
        </section>

        {/* Rental Tips */}
        <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Rental Tips & Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <Calendar className="w-12 h-12 mx-auto" />
                <h3 className="text-xl font-semibold">Advance Booking</h3>
                <p className="text-white/90">Book 2-3 months in advance for better deals</p>
              </div>
              <div className="space-y-4">
                <Building className="w-12 h-12 mx-auto" />
                <h3 className="text-xl font-semibold">Property Verification</h3>
                <p className="text-white/90">Always verify documents and visit in person</p>
              </div>
              <div className="space-y-4">
                <Users className="w-12 h-12 mx-auto" />
                <h3 className="text-xl font-semibold">Direct Contact</h3>
                <p className="text-white/90">Connect directly with verified owners</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default RentPage;