import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, QrCode } from "lucide-react";
import { format } from "date-fns";

interface Booking {
  bookingId: string;
  spaceName: string;
  duration: string;
  date: string;
  hours: number;
  startHour: number;
  resources: string[];
  totalPrice: number;
  userName: string;
}

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(storedBookings);
  }, []);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">
            View and manage all your workspace reservations
          </p>
        </div>

        {bookings.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">You haven't made any bookings yet</p>
              <Button onClick={() => navigate('/')}>Browse Spaces</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.bookingId} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{booking.spaceName}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Booked by {booking.userName}
                      </p>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {booking.duration}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="font-semibold">
                          {format(new Date(booking.date), 'PPP')}
                        </p>
                      </div>
                    </div>
                    {booking.duration === 'hourly' && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Time</p>
                          <p className="font-semibold">
                            {booking.startHour}:00 ({booking.hours}h)
                          </p>
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground">Total Price</p>
                      <p className="font-semibold text-primary text-lg">
                        ${booking.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {booking.resources.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Resources</p>
                      <div className="flex flex-wrap gap-2">
                        {booking.resources.map((resource) => (
                          <Badge key={resource} variant="outline" className="text-xs">
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/booking-confirmation/${booking.bookingId}`)}
                      className="flex-1"
                      variant="outline"
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      View QR Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
