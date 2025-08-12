import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Upload, 
  Camera, 
  Video, 
  MapPin, 
  Home, 
  Building, 
  TreePine, 
  Store,
  CheckCircle,
  Star,
  Phone,
  Mail,
  Crown,
  TrendingUp,
  Eye,
  Users
} from "lucide-react";

const SellPage = () => {
  const [formStep, setFormStep] = useState(1);
  const [listingType, setListingType] = useState("");
  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    propertyType: "",
    city: "",
    locality: "",
    address: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    amenities: []
  });

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
    "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur"
  ];

  const amenities = [
    "Parking", "Lift", "Security", "Power Backup", "Swimming Pool", 
    "Gym", "Garden", "Club House", "Children's Play Area", "CCTV",
    "Intercom", "Maintenance Staff", "Fire Safety", "Water Storage"
  ];

  const subscriptionPlans = [
    {
      name: "Basic",
      price: "₹999",
      duration: "30 days",
      features: [
        "Basic listing visibility",
        "Up to 5 photos",
        "Owner contact: 10 leads",
        "Email support"
      ],
      color: "border-gray-300"
    },
    {
      name: "Premium",
      price: "₹2,499",
      duration: "60 days",
      features: [
        "Enhanced visibility",
        "Up to 15 photos + videos",
        "Owner contact: 25 leads",
        "Priority support",
        "Verified badge",
        "Top listing slots"
      ],
      color: "border-primary",
      popular: true
    },
    {
      name: "Assisted",
      price: "₹4,999",
      duration: "90 days",
      features: [
        "Maximum visibility",
        "Unlimited photos/videos",
        "Unlimited owner contact",
        "Dedicated relationship manager",
        "360° virtual tour",
        "Professional photography",
        "Email marketing",
        "Social media promotion"
      ],
      color: "border-accent"
    }
  ];

  const handleNext = () => {
    if (formStep < 3) setFormStep(formStep + 1);
  };

  const handlePrevious = () => {
    if (formStep > 1) setFormStep(formStep - 1);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-navy to-primary text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Sell Your Property
              </h1>
              <p className="text-xl text-white/90 mb-8">
                List your property and connect with verified buyers across India
              </p>
            </div>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="py-6 bg-card border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    formStep >= step ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step}
                  </div>
                  <span className={`ml-2 font-medium ${
                    formStep >= step ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step === 1 ? 'Property Details' : step === 2 ? 'Upload Media' : 'Choose Plan'}
                  </span>
                  {step < 3 && <div className="w-16 h-0.5 bg-muted ml-4" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Step 1: Property Details */}
          {formStep === 1 && (
            <Card className="max-w-4xl mx-auto p-8">
              <h2 className="text-2xl font-bold mb-6">Property Information</h2>
              
              {/* Listing Type */}
              <div className="mb-6">
                <Label className="text-base font-semibold mb-4 block">What do you want to do?</Label>
                <RadioGroup value={listingType} onValueChange={setListingType} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Label htmlFor="sell" className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="sell" id="sell" />
                    <div>
                      <div className="font-semibold">Sell Property</div>
                      <div className="text-sm text-muted-foreground">Find buyers for your property</div>
                    </div>
                  </Label>
                  <Label htmlFor="rent" className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="rent" id="rent" />
                    <div>
                      <div className="font-semibold">Rent Property</div>
                      <div className="text-sm text-muted-foreground">Find tenants for your property</div>
                    </div>
                  </Label>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Property Title *</Label>
                    <Input 
                      id="title"
                      placeholder="e.g., Spacious 3BHK Apartment in Prime Location"
                      value={propertyDetails.title}
                      onChange={(e) => setPropertyDetails({...propertyDetails, title: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="propertyType">Property Type *</Label>
                    <Select value={propertyDetails.propertyType} onValueChange={(value) => setPropertyDetails({...propertyDetails, propertyType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="house">Independent House</SelectItem>
                        <SelectItem value="plot">Plot/Land</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Select value={propertyDetails.city} onValueChange={(value) => setPropertyDetails({...propertyDetails, city: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="locality">Locality *</Label>
                    <Input 
                      id="locality"
                      placeholder="e.g., Andheri West, Sector 47"
                      value={propertyDetails.locality}
                      onChange={(e) => setPropertyDetails({...propertyDetails, locality: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input 
                      id="price"
                      placeholder={listingType === 'rent' ? "e.g., 25000 (per month)" : "e.g., 8500000"}
                      value={propertyDetails.price}
                      onChange={(e) => setPropertyDetails({...propertyDetails, price: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="area">Area (sq ft) *</Label>
                    <Input 
                      id="area"
                      placeholder="e.g., 1200"
                      value={propertyDetails.area}
                      onChange={(e) => setPropertyDetails({...propertyDetails, area: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select value={propertyDetails.bedrooms} onValueChange={(value) => setPropertyDetails({...propertyDetails, bedrooms: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="BHK" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 BHK</SelectItem>
                          <SelectItem value="2">2 BHK</SelectItem>
                          <SelectItem value="3">3 BHK</SelectItem>
                          <SelectItem value="4">4 BHK</SelectItem>
                          <SelectItem value="5">5+ BHK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select value={propertyDetails.bathrooms} onValueChange={(value) => setPropertyDetails({...propertyDetails, bathrooms: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="address">Complete Address</Label>
                <Textarea 
                  id="address"
                  placeholder="Enter complete address with landmarks"
                  value={propertyDetails.address}
                  onChange={(e) => setPropertyDetails({...propertyDetails, address: e.target.value})}
                  className="mt-2"
                />
              </div>

              <div className="mt-6">
                <Label className="text-base font-semibold mb-4 block">Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenities.map((amenity) => (
                    <Label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox 
                        checked={propertyDetails.amenities.includes(amenity)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setPropertyDetails({
                              ...propertyDetails, 
                              amenities: [...propertyDetails.amenities, amenity]
                            });
                          } else {
                            setPropertyDetails({
                              ...propertyDetails,
                              amenities: propertyDetails.amenities.filter(a => a !== amenity)
                            });
                          }
                        }}
                      />
                      <span className="text-sm">{amenity}</span>
                    </Label>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="description">Property Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Describe your property in detail..."
                  value={propertyDetails.description}
                  onChange={(e) => setPropertyDetails({...propertyDetails, description: e.target.value})}
                  className="mt-2 h-32"
                />
              </div>

              <div className="flex justify-end mt-8">
                <Button onClick={handleNext} size="lg">
                  Next: Upload Media
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Upload Media */}
          {formStep === 2 && (
            <Card className="max-w-4xl mx-auto p-8">
              <h2 className="text-2xl font-bold mb-6">Upload Photos & Videos</h2>
              
              <div className="space-y-8">
                {/* Photo Upload */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Property Photos *</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload Photos</h3>
                    <p className="text-muted-foreground mb-4">Add up to 20 high-quality photos (JPG, PNG)</p>
                    <Button variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      Choose Photos
                    </Button>
                  </div>
                </div>

                {/* Video Upload */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Property Video (Optional)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload Video</h3>
                    <p className="text-muted-foreground mb-4">Add a walkthrough video (MP4, max 100MB)</p>
                    <Button variant="outline">
                      <Video className="w-4 h-4 mr-2" />
                      Choose Video
                    </Button>
                  </div>
                </div>

                {/* Floor Plan */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Floor Plan (Optional)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload Floor Plan</h3>
                    <p className="text-muted-foreground mb-4">Add property layout (JPG, PNG, PDF)</p>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  Next: Choose Plan
                </Button>
              </div>
            </Card>
          )}

          {/* Step 3: Subscription Plans */}
          {formStep === 3 && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Choose Your Listing Plan</h2>
                <p className="text-lg text-muted-foreground">
                  Select a subscription that gives you full access to list and promote your property
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {subscriptionPlans.map((plan) => (
                  <Card key={plan.name} className={`relative p-6 ${plan.color} ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                          <Crown className="w-4 h-4 mr-1" />
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-3xl font-bold text-primary mb-2">{plan.price}</div>
                      <div className="text-muted-foreground">{plan.duration} validity</div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                    >
                      Select {plan.name}
                    </Button>
                  </Card>
                ))}
              </div>

              {/* Plan Benefits */}
              <Card className="p-6 bg-muted/30">
                <h3 className="text-xl font-bold mb-4 text-center">Why Choose Premium Plans?</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Higher Visibility</h4>
                    <p className="text-sm text-muted-foreground">Get priority placement in search results</p>
                  </div>
                  <div className="text-center">
                    <Eye className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">More Views</h4>
                    <p className="text-sm text-muted-foreground">Attract 3x more potential buyers</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Direct Contact</h4>
                    <p className="text-sm text-muted-foreground">Connect directly with verified buyers</p>
                  </div>
                  <div className="text-center">
                    <Star className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Expert Support</h4>
                    <p className="text-sm text-muted-foreground">Get dedicated assistance throughout</p>
                  </div>
                </div>
              </Card>

              <div className="flex justify-center mt-8">
                <Button variant="outline" onClick={handlePrevious} className="mr-4">
                  Previous
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SellPage;