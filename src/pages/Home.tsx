import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SpaceCard } from "@/components/SpaceCard";
import { SPACES, AMENITIES, LOCATIONS } from "@/lib/spaces";
import { Search, MapPin, Calendar } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/coworking-hero.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const filteredSpaces = SPACES.filter((space) => {
    const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         space.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || space.location === selectedLocation;
    const matchesAmenities = selectedAmenities.length === 0 || 
                            selectedAmenities.every(amenity => space.amenities.includes(amenity));
    
    return matchesSearch && matchesLocation && matchesAmenities;
  });

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Co-working space"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Find Your Perfect Workspace
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Book flexible co-working spaces by the hour, day, or month. Premium amenities, prime locations.
          </p>
          <div className="flex gap-4">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white"
              onClick={() => document.getElementById('spaces')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Spaces
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20"
              onClick={() => navigate('/my-bookings')}
            >
              <Calendar className="mr-2 h-5 w-5" />
              My Bookings
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-card shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search spaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-[200px]">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {LOCATIONS.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Amenities</h3>
              <div className="space-y-3">
                {AMENITIES.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity.id}
                      checked={selectedAmenities.includes(amenity.id)}
                      onCheckedChange={() => toggleAmenity(amenity.id)}
                    />
                    <Label htmlFor={amenity.id} className="text-sm cursor-pointer">
                      {amenity.label}
                    </Label>
                  </div>
                ))}
              </div>
              {selectedAmenities.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAmenities([])}
                  className="mt-4 w-full"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </aside>

          {/* Spaces Grid */}
          <div className="lg:col-span-3" id="spaces">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                Available Spaces
                <span className="text-muted-foreground font-normal text-lg ml-2">
                  ({filteredSpaces.length})
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSpaces.map((space) => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </div>
            {filteredSpaces.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No spaces found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
