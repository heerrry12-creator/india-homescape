import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, Share2, MapPin, Bed, Bath, Square, Calendar, Eye, Camera, Video,
  Phone, Mail, MessageCircle, Download, Car, Wifi, Dumbbell, TreePine,
  Shield, Clock, Star, Navigation, School, Hospital, Bus, ShoppingCart,
  Calculator, X, Play, Maximize, ChevronLeft, ChevronRight
} from "lucide-react";

interface PropertyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
}

const PropertyDetailModal = ({ isOpen, onClose, property }: PropertyDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [emiAmount, setEmiAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("8.5");
  const [tenure, setTenure] = useState("20");

  const images = [
    "/placeholder.svg",
    "/placeholder.svg", 
    "/placeholder.svg",
    "/placeholder.svg"
  ];

  const amenities = [
    { icon: Car, label: "Parking", available: true },
    { icon: Wifi, label: "WiFi", available: true },
    { icon: Dumbbell, label: "Gym", available: true },
    { icon: TreePine, label: "Garden", available: true },
    { icon: Shield, label: "Security", available: true },
    { icon: Clock, label: "24/7 Power", available: false }
  ];

  const nearbyPlaces = [
    { icon: School, label: "Delhi Public School", distance: "0.5 km", category: "Education" },
    { icon: Hospital, label: "Max Hospital", distance: "1.2 km", category: "Healthcare" },
    { icon: Bus, label: "Metro Station", distance: "0.8 km", category: "Transport" },
    { icon: ShoppingCart, label: "Phoenix Mall", distance: "2.1 km", category: "Shopping" }
  ];

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) / 100 / 12;
    const time = parseFloat(tenure) * 12;
    
    if (principal && rate && time) {
      const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      setEmiAmount(emi.toFixed(0));
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const shareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this amazing property: ${property.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Image Gallery */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
              onClick={prevImage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
              onClick={nextImage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>

            {/* Media Info */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <div className="flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded text-xs">
                <Camera className="w-3 h-3" />
                {property.photos || 12}
              </div>
              {property.videos > 0 && (
                <div className="flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  <Video className="w-3 h-3" />
                  {property.videos}
                </div>
              )}
              <Button variant="outline" size="sm" className="bg-white/90 hover:bg-white text-xs h-6">
                <Play className="w-3 h-3 mr-1" />
                Virtual Tour
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className={`bg-white/90 hover:bg-white ${isLiked ? "text-red-500" : ""}`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white/90 hover:bg-white"
                onClick={shareProperty}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white/90 hover:bg-white"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Status Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {property.isFeatured && (
                <Badge className="bg-accent text-accent-foreground">Featured</Badge>
              )}
              {property.isPremium && (
                <Badge className="bg-warning text-warning-foreground">Premium</Badge>
              )}
              {property.isVerified && (
                <Badge className="bg-success text-success-foreground">Verified</Badge>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Property Header */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-foreground mb-2">
                        {property.title}
                      </h1>
                      <div className="flex items-center gap-1 text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{property.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{property.price}</div>
                      {property.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          {property.originalPrice}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{property.bedrooms} Bed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{property.bathrooms} Bath</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="w-4 h-4" />
                      <span>{property.area}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{property.views || 0} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{property.daysListed || 1} day{property.daysListed !== 1 ? 's' : ''} ago</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Tabs */}
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                    <TabsTrigger value="mortgage">EMI</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Property Description</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        This beautiful {property.bedrooms} bedroom {property.type.toLowerCase()} offers modern living 
                        in the heart of {property.location}. With spacious rooms, contemporary fixtures, and 
                        premium amenities, this property is perfect for families looking for comfort and convenience.
                        The property features high-quality finishes throughout and offers stunning views of the surrounding area.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Property Details</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div>Type: {property.type}</div>
                          <div>Built Year: 2020</div>
                          <div>Furnished: Semi-furnished</div>
                          <div>Facing: North-East</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Area Details</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div>Carpet Area: {property.area}</div>
                          <div>Built-up Area: 1,600 sq ft</div>
                          <div>Super Area: 1,800 sq ft</div>
                          <div>Floor: 8th of 12</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="amenities">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Amenities & Features</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {amenities.map((amenity, index) => {
                          const Icon = amenity.icon;
                          return (
                            <div
                              key={index}
                              className={`flex items-center gap-3 p-3 rounded-lg border ${
                                amenity.available ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                              }`}
                            >
                              <Icon className={`w-5 h-5 ${amenity.available ? "text-green-600" : "text-gray-400"}`} />
                              <span className={`text-sm ${amenity.available ? "text-green-800" : "text-gray-500"}`}>
                                {amenity.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="location">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Location & Nearby</h3>
                      <div className="space-y-4">
                        <div className="bg-muted/30 rounded-lg p-4 text-center">
                          <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Interactive map would be displayed here
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Nearby Places</h4>
                          <div className="space-y-3">
                            {nearbyPlaces.map((place, index) => {
                              const Icon = place.icon;
                              return (
                                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <Icon className="w-5 h-5 text-primary" />
                                    <div>
                                      <div className="font-medium text-sm">{place.label}</div>
                                      <div className="text-xs text-muted-foreground">{place.category}</div>
                                    </div>
                                  </div>
                                  <div className="text-sm font-medium text-primary">{place.distance}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="mortgage">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">EMI Calculator</h3>
                      <Card className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Loan Amount (₹)</label>
                            <Input
                              value={loanAmount}
                              onChange={(e) => setLoanAmount(e.target.value)}
                              placeholder="Enter loan amount"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Interest Rate (%)</label>
                            <Input
                              value={interestRate}
                              onChange={(e) => setInterestRate(e.target.value)}
                              placeholder="8.5"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Tenure (Years)</label>
                            <Input
                              value={tenure}
                              onChange={(e) => setTenure(e.target.value)}
                              placeholder="20"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button onClick={calculateEMI} className="w-full">
                              <Calculator className="w-4 h-4 mr-2" />
                              Calculate EMI
                            </Button>
                          </div>
                        </div>
                        
                        {emiAmount && (
                          <div className="bg-primary/10 p-4 rounded-lg text-center">
                            <div className="text-sm text-muted-foreground">Monthly EMI</div>
                            <div className="text-2xl font-bold text-primary">₹{parseInt(emiAmount).toLocaleString()}</div>
                          </div>
                        )}
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Card */}
                <Card className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold">Rajesh Kumar</h3>
                    <p className="text-sm text-muted-foreground">Verified Agent</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">(4.8)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full" variant="primary">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    <Button className="w-full" variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => setShowContactForm(!showContactForm)}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>

                  {showContactForm && (
                    <div className="mt-4 space-y-3">
                      <Input placeholder="Your name" />
                      <Input placeholder="Your email" />
                      <Input placeholder="Your phone" />
                      <Textarea placeholder="Your message" />
                      <Button className="w-full" size="sm">
                        Send Inquiry
                      </Button>
                    </div>
                  )}
                </Card>

                {/* Quick Actions */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Download Brochure
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Maximize className="w-4 h-4 mr-2" />
                      View Floor Plan
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Visit
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </Card>

                {/* Similar Properties */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Similar Properties</h3>
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex gap-3 p-2 hover:bg-muted/30 rounded cursor-pointer">
                        <img
                          src="/placeholder.svg"
                          alt="Property"
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">3BHK Apartment</div>
                          <div className="text-xs text-muted-foreground">Sector 45, Gurgaon</div>
                          <div className="text-sm font-medium text-primary">₹1.1 Cr</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetailModal;