import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Building, Mic, TrendingUp } from "lucide-react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("buy");
  const searchRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    { type: "locality", name: "Gurgaon Sector 47", icon: MapPin },
    { type: "locality", name: "Whitefield, Bangalore", icon: MapPin },
    { type: "project", name: "DLF Cyber City", icon: Building },
    { type: "landmark", name: "Near Metro Station", icon: TrendingUp },
    { type: "locality", name: "Andheri West, Mumbai", icon: MapPin },
    { type: "project", name: "Brigade Cornerstone", icon: Building },
  ];

  const popularLocalities = [
    "Gurgaon", "Noida", "Pune", "Hyderabad", "Bangalore", "Chennai",
    "Mumbai", "Delhi", "Kolkata", "Ahmedabad", "Jaipur", "Chandigarh"
  ];

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
      };
      
      recognition.start();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto" ref={searchRef}>
      {/* Search Tabs */}
      <div className="flex bg-white rounded-t-lg border border-b-0 overflow-hidden shadow-sm">
        {[
          { id: "buy", label: "Buy" },
          { id: "rent", label: "Rent" },
          { id: "pg", label: "PG/Co-living" },
          { id: "plot", label: "Plot" },
          { id: "commercial", label: "Commercial" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`flex-1 px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium transition-colors touch-target focus-visible ${
              selectedTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted text-foreground"
            }`}
            aria-label={`Search for ${tab.label.toLowerCase()}`}
          >
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split('/')[0]}</span>
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="flex bg-white border rounded-b-lg shadow-lg">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search for locality, landmark, project..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              className="border-0 rounded-none text-sm sm:text-base h-12 sm:h-14 pl-4 pr-12 focus-visible:ring-0 touch-target"
              aria-label="Search for properties"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 touch-target focus-visible"
              onClick={handleVoiceSearch}
              aria-label="Voice search"
            >
              <Mic className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
          <Button variant="hero" size="lg" className="rounded-l-none h-12 sm:h-14 px-4 sm:px-8 btn-remax focus-visible">
            <Search className="w-4 sm:w-5 h-4 sm:h-5 sm:mr-2" />
            <span className="hidden sm:inline">Search</span>
          </Button>
        </div>

        {/* Suggestions Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border border-t-0 rounded-b-lg shadow-lg z-50 max-h-80 overflow-y-auto">
            {searchTerm && filteredSuggestions.length > 0 && (
              <div className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Search Results</h3>
                {filteredSuggestions.map((suggestion, index) => {
                  const Icon = suggestion.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchTerm(suggestion.name);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-2 hover:bg-muted rounded-md text-left"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <span className="text-foreground">{suggestion.name}</span>
                        <span className="text-xs text-muted-foreground ml-2 capitalize">
                          {suggestion.type}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Popular Localities */}
            <div className="p-4 border-t">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Popular Localities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {popularLocalities.map((locality) => (
                  <button
                    key={locality}
                    onClick={() => {
                      setSearchTerm(locality);
                      setIsOpen(false);
                    }}
                    className="text-left p-2 hover:bg-muted rounded-md text-sm text-foreground"
                  >
                    {locality}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;