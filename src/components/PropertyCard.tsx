import { Heart, MapPin, Bed, Bath, Square, Calendar, Eye, Camera, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  type: string;
  image: string;
  isVerified?: boolean;
  isPremium?: boolean;
  isFeatured?: boolean;
  views?: number;
  photos?: number;
  videos?: number;
  daysListed?: number;
  className?: string;
}

const PropertyCard = ({
  id,
  title,
  price,
  originalPrice,
  location,
  bedrooms,
  bathrooms,
  area,
  type,
  image,
  isVerified = false,
  isPremium = false,
  isFeatured = false,
  views = 0,
  photos = 5,
  videos = 0,
  daysListed = 1,
  className = ""
}: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className={`bg-card rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 ${className}`}>
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 sm:gap-2">
          {isFeatured && (
            <Badge className="bg-accent text-accent-foreground text-xs">Featured</Badge>
          )}
          {isPremium && (
            <Badge className="bg-warning text-warning-foreground text-xs">Premium</Badge>
          )}
          {isVerified && (
            <Badge className="bg-success text-success-foreground text-xs">Verified</Badge>
          )}
        </div>

        {/* Media Info */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {photos > 0 && (
            <div className="flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded text-xs">
              <Camera className="w-3 h-3" />
              {photos}
            </div>
          )}
          {videos > 0 && (
            <div className="flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded text-xs">
              <Video className="w-3 h-3" />
              {videos}
            </div>
          )}
        </div>

        {/* Like Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 bg-white/80 hover:bg-white ${
            isLiked ? "text-primary" : "text-muted-foreground"
          }`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price and Type */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">{price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
            )}
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
            {type}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{bedrooms} Bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{bathrooms} Bath</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span>{area}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{views} views</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{daysListed} day{daysListed !== 1 ? 's' : ''} ago</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="sm" className="flex-1 focus-visible text-xs sm:text-sm">
            View Details
          </Button>
          <Button variant="primary" size="sm" className="flex-1 focus-visible text-xs sm:text-sm">
            Contact Owner
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;