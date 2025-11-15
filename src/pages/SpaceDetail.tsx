import { useParams, useNavigate } from "react-router-dom";
import { SPACES } from "@/lib/spaces";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingForm } from "@/components/BookingForm";
import { ArrowLeft, MapPin, Users, Wifi, Coffee, Projector } from "lucide-react";

const SpaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const space = SPACES.find((s) => s.id === id);

  if (!space) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Space not found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'coffee':
        return <Coffee className="h-4 w-4" />;
      case 'projector':
        return <Projector className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Spaces
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src={space.image}
                alt={space.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{space.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-5 w-5" />
                      <span>{space.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-5 w-5" />
                      <span>Capacity: {space.capacity}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="text-base px-4 py-2">
                  {space.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </Badge>
              </div>

              <p className="text-lg text-foreground/90 mb-6">
                {space.description}
              </p>

              <div>
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {space.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 p-3 rounded-lg bg-secondary"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="text-sm capitalize">
                        {amenity.replace('-', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingForm
                spaceId={space.id}
                spaceType={space.type}
                spaceName={space.name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetail;
