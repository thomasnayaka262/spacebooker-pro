import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Wifi, Coffee } from "lucide-react";
import { Space } from "@/lib/spaces";
import { useNavigate } from "react-router-dom";

interface SpaceCardProps {
  space: Space;
}

export const SpaceCard = ({ space }: SpaceCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={space.image}
          alt={space.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur">
            {space.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{space.name}</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{space.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Up to {space.capacity}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {space.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {space.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity === 'wifi' && <Wifi className="h-3 w-3 mr-1" />}
              {amenity === 'coffee' && <Coffee className="h-3 w-3 mr-1" />}
              {amenity}
            </Badge>
          ))}
          {space.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{space.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg transition-all"
          onClick={() => navigate(`/space/${space.id}`)}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};
