import { ArrowLeft, Check, X, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const PremiumPlans = () => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;

  const handleBack = () => {
    if (isMobile) {
      navigate('/');
    } else {
      window.close();
    }
  };

  const buyerPlan = {
    title: "Buyer Plan",
    description: "Perfect for finding your dream property with premium features and direct owner contact.",
    price: "₹1,299",
    period: "60 days",
    features: [
      "Contact up to 50 owners directly",
      "Get owner phone numbers instantly",
      "Priority property alerts",
      "WhatsApp support",
      "Property comparison tool",
      "Shortlist unlimited properties",
      "Advanced search filters",
      "Market price analysis"
    ]
  };

  const sellerPlan = {
    title: "Seller Plan",
    description: "Sell your property faster with premium listing features and professional photography.",
    price: "₹2,499",
    period: "60 days",
    features: [
      "List unlimited properties",
      "Professional photography included",
      "Top listing placement",
      "Get buyer contact numbers",
      "Property analytics dashboard",
      "Priority customer support",
      "Social media promotion",
      "Virtual tour creation"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 via-background to-red-500/10">
      {/* Header with back button */}
      <div className="container mx-auto px-4 py-6">
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {isMobile ? "Back to Home" : "Close"}
        </Button>

        {/* Header Card wrapping the page */}
        <Card className="max-w-5xl mx-auto mb-8 border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Diamond className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold">Housing Premium</CardTitle>
                <CardDescription className="text-sm md:text-base mt-1">
                  Instant access to zero brokerage properties
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Page Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Premium Plans
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect plan to enhance your property buying or selling experience
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Buyer Plan */}
          <Card className="relative border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-primary mb-2">
                {buyerPlan.title}
              </CardTitle>
              <p className="text-muted-foreground mb-4">
                {buyerPlan.description}
              </p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-foreground">{buyerPlan.price}</span>
                <span className="text-muted-foreground ml-1">/{buyerPlan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {buyerPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full h-12 text-lg font-semibold group-hover:scale-105 transition-transform duration-300"
                variant="primary"
                onClick={() => {
                  // Handle buy now action
                  console.log('Buyer plan selected');
                }}
              >
                Buy Now
              </Button>
            </CardContent>
          </Card>

          {/* Seller Plan */}
          <Card className="relative border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-primary mb-2">
                {sellerPlan.title}
              </CardTitle>
              <p className="text-muted-foreground mb-4">
                {sellerPlan.description}
              </p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-foreground">{sellerPlan.price}</span>
                <span className="text-muted-foreground ml-1">/{sellerPlan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {sellerPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full h-12 text-lg font-semibold group-hover:scale-105 transition-transform duration-300"
                variant="primary"
                onClick={() => {
                  // Handle sell now action
                  console.log('Seller plan selected');
                }}
              >
                Sell Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Why Choose Premium?
            </h3>
            <p className="text-muted-foreground">
              Premium plans give you exclusive access to verified properties, direct owner contacts, 
              and professional support to make your property journey smooth and successful.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans;