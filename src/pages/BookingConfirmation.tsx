import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle, Calendar, Clock, DollarSign, Home } from "lucide-react";
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

const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const foundBooking = bookings.find((b: Booking) => b.bookingId === bookingId);
    setBooking(foundBooking);
  }, [bookingId]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Booking not found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const qrData = JSON.stringify({
    bookingId: booking.bookingId,
    spaceName: booking.spaceName,
    userName: booking.userName,
    date: booking.date,
  });

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your workspace has been successfully reserved
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Guest Name</p>
                <p className="font-semibold">{booking.userName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Space</p>
                <p className="font-semibold">{booking.spaceName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <p className="font-semibold">
                    {format(new Date(booking.date), 'PPP')}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Duration</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <p className="font-semibold capitalize">{booking.duration}</p>
                </div>
              </div>
              {booking.duration === 'hourly' && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Hours</p>
                    <p className="font-semibold">{booking.hours} hour(s)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Start Time</p>
                    <p className="font-semibold">{booking.startHour}:00</p>
                  </div>
                </>
              )}
            </div>

            {booking.resources.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Additional Resources</p>
                <div className="flex flex-wrap gap-2">
                  {booking.resources.map((resource) => (
                    <Badge key={resource} variant="secondary">
                      {resource}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-lg">
                <span className="font-semibold">Total Amount Paid:</span>
                <div className="flex items-center gap-2 text-primary font-bold text-2xl">
                  <DollarSign className="h-6 w-6" />
                  {booking.totalPrice.toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Check-In QR Code</CardTitle>
            <p className="text-sm text-muted-foreground">
              Show this QR code at the reception to check in
            </p>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg">
              <QRCodeSVG value={qrData} size={256} level="H" />
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Booking ID: {booking.bookingId}
            </p>
          </CardContent>
        </Card>

        <div className="flex gap-4 mt-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="flex-1"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <Button
            onClick={() => navigate('/my-bookings')}
            className="flex-1 bg-gradient-to-r from-primary to-primary/90"
          >
            View All Bookings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
