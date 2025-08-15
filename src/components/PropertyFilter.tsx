import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, X } from "lucide-react";

interface PropertyFilterProps {
  onFilterChange?: (filters: any) => void;
  type?: "buy" | "rent";
}

const PropertyFilter = ({ onFilterChange, type = "buy" }: PropertyFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState(type === "buy" ? [10, 200] : [5000, 50000]);
  const [bedrooms, setBedrooms] = useState("");
  const [status, setStatus] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
    "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur"
  ];

  const propertyTypes = [
    "Apartment", "Villa", "House", "Studio", "Commercial", "Plot"
  ];

  const statusOptions = [
    "Active", "New", "Hot Deal", "Price Reduced", "Open House"
  ];

  const availableAmenities = [
    "Parking", "Swimming Pool", "Gym", "Garden", "Security", "Lift",
    "Balcony", "Furnished", "AC", "WiFi", "Power Backup", "Playground"
  ];

  const toggleAmenity = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCity("");
    setPropertyType("");
    setPriceRange(type === "buy" ? [10, 200] : [5000, 50000]);
    setBedrooms("");
    setStatus("");
    setAmenities([]);
    setSortBy("newest");
  };

  const applyFilters = () => {
    const filters = {
      searchQuery,
      selectedCity,
      propertyType,
      priceRange,
      bedrooms,
      status,
      amenities,
      sortBy
    };
    onFilterChange?.(filters);
  };

  return (
    <Card className="p-6 mb-8">
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

        {/* Main Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger>
              <MapPin className="w-4 h-4 mr-2" />
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
                <SelectItem key={type} value={type}>
                  {type}
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

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {type === "buy" ? "Budget (₹ Lac)" : "Rent (₹/month)"}
            </label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={type === "buy" ? 500 : 100000}
              min={type === "buy" ? 10 : 5000}
              step={type === "buy" ? 10 : 1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                {type === "buy" ? `₹${priceRange[0]} Lac` : `₹${priceRange[0].toLocaleString()}`}
              </span>
              <span>
                {type === "buy" ? `₹${priceRange[1]} Lac` : `₹${priceRange[1].toLocaleString()}`}
              </span>
            </div>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
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

        {/* Amenities Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {availableAmenities.map((amenity) => (
              <Badge
                key={amenity}
                variant={amenities.includes(amenity) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => toggleAmenity(amenity)}
              >
                {amenity}
                {amenities.includes(amenity) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button onClick={applyFilters} className="flex-1" variant="primary">
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </Button>
          <Button onClick={clearFilters} variant="outline">
            Clear All
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertyFilter;