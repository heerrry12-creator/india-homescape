import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Building, 
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  MessageSquare
} from "lucide-react";

const AgentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [specialization, setSpecialization] = useState("");

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
    "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur"
  ];

  const agents = [
    {
      id: "1",
      name: "Rajesh Sharma",
      company: "Prime Properties",
      experience: "8 years",
      city: "Mumbai",
      specialization: "Luxury Apartments",
      rating: 4.8,
      reviews: 156,
      properties: 45,
      sales: "₹12.5 Cr",
      image: "/placeholder.svg",
      verified: true,
      languages: ["Hindi", "English", "Marathi"],
      achievements: ["Top Performer 2023", "Customer Choice Award"]
    },
    {
      id: "2",
      name: "Priya Patel",
      company: "Urban Homes",
      experience: "6 years",
      city: "Bangalore",
      specialization: "Residential Villas",
      rating: 4.9,
      reviews: 203,
      properties: 38,
      sales: "₹8.7 Cr",
      image: "/placeholder.svg",
      verified: true,
      languages: ["English", "Kannada", "Hindi"],
      achievements: ["Best Agent 2023", "Excellence Award"]
    },
    {
      id: "3",
      name: "Amit Kumar",
      company: "Metro Realty",
      experience: "12 years",
      city: "Delhi",
      specialization: "Commercial Properties",
      rating: 4.7,
      reviews: 89,
      properties: 62,
      sales: "₹18.2 Cr",
      image: "/placeholder.svg",
      verified: true,
      languages: ["Hindi", "English", "Punjabi"],
      achievements: ["Veteran Agent", "Deal Master"]
    }
  ];

  const specializations = [
    "Luxury Apartments",
    "Residential Villas",
    "Commercial Properties",
    "Budget Homes",
    "Rental Properties",
    "Plots & Land"
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-navy to-primary text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Find Expert Real Estate Agents
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Connect with certified professionals who know your local market
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
                    placeholder="Search agents by name, company, or area..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>

                {/* Filters Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

                  <Select value={specialization} onValueChange={setSpecialization}>
                    <SelectTrigger>
                      <SelectValue placeholder="Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-3">0-3 years</SelectItem>
                      <SelectItem value="3-7">3-7 years</SelectItem>
                      <SelectItem value="7-15">7-15 years</SelectItem>
                      <SelectItem value="15+">15+ years</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button className="h-10" variant="primary">
                    <Filter className="w-4 h-4 mr-2" />
                    Find Agents
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Why Choose Our Agents */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Certified Agents?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Verified Professionals</h3>
                <p className="text-muted-foreground text-sm">All agents are background verified and certified</p>
              </Card>
              <Card className="p-6 text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Proven Track Record</h3>
                <p className="text-muted-foreground text-sm">Top performers with successful deals</p>
              </Card>
              <Card className="p-6 text-center">
                <Users className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Local Expertise</h3>
                <p className="text-muted-foreground text-sm">Deep knowledge of local markets</p>
              </Card>
              <Card className="p-6 text-center">
                <MessageSquare className="w-12 h-12 text-navy mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
                <p className="text-muted-foreground text-sm">Available whenever you need assistance</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Agents Listing */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Top Real Estate Agents</h2>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">{agents.length} agents found</span>
                <Select defaultValue="rating">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="sales">Top Sales</SelectItem>
                    <SelectItem value="recent">Recently Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <Card key={agent.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={agent.image} alt={agent.name} />
                      <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-lg">{agent.name}</h3>
                        {agent.verified && (
                          <CheckCircle className="w-5 h-5 text-success" />
                        )}
                      </div>
                      <p className="text-primary font-medium">{agent.company}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{agent.rating}</span>
                        <span className="text-muted-foreground text-sm">({agent.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground mr-2" />
                      <span>{agent.city}</span>
                      <span className="text-muted-foreground mx-2">•</span>
                      <span>{agent.experience} experience</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Building className="w-4 h-4 text-muted-foreground mr-2" />
                      <span>{agent.specialization}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-primary">{agent.properties}</span>
                        <span className="text-muted-foreground ml-1">Properties</span>
                      </div>
                      <div>
                        <span className="font-medium text-success">{agent.sales}</span>
                        <span className="text-muted-foreground ml-1">Sales</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {agent.languages.map((lang) => (
                        <Badge key={lang} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-1">
                      {agent.achievements.map((achievement) => (
                        <Badge key={achievement} variant="outline" className="text-xs mr-1">
                          <Award className="w-3 h-3 mr-1" />
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Agents
              </Button>
            </div>
          </div>
        </section>

        {/* Become an Agent CTA */}
        <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Are You a Real Estate Professional?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join our network of certified agents and grow your business with verified leads
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button variant="secondary" size="xl" className="group h-14 text-base font-semibold">
                <Users className="w-6 h-6 mr-3" />
                Join as Agent
              </Button>
              <Button variant="outline" size="xl" className="group h-14 text-base font-semibold bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
                <TrendingUp className="w-6 h-6 mr-3" />
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AgentsPage;