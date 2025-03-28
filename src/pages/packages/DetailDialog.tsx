import { Button } from "@/components/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { AlertCircle, ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function DetailDialog({
  selectedPackage,
  setSelectedPackage,
  packageDetail,
}) {
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBookPackage = () => {
    console.log("Booking package:", selectedPackage);
    console.log("Message:", bookingMessage);

    setShowBookingDialog(false);
    setBookingConfirmed(true);
  };

  return (
    <Dialog
      open={selectedPackage !== null}
      onOpenChange={(open) => !open && setSelectedPackage(null)}
    >
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Package Details</DialogTitle>
          <DialogDescription>
            Review all information about this package request
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-medium flex flex-wrap items-center gap-2">
                {packageDetail.departureCountry} to{" "}
                {packageDetail.destinationCountry}
                {packageDetail.urgency === "urgent" && (
                  <Badge variant="destructive">Urgent</Badge>
                )}
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <p className="text-sm font-medium">Delivery Date</p>
                  <p className="text-sm text-muted-foreground">
                    {format(packageDetail.deliveryDate, "PP")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Compensation</p>
                  <p className="text-sm text-primary font-bold">
                    ${packageDetail.budget}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Package Size</p>
                  <p className="text-sm text-muted-foreground">
                    {packageDetail.packageSize}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Weight</p>
                  <p className="text-sm text-muted-foreground">
                    {packageDetail.weight}
                  </p>
                </div>
                {/* <div>
              <p className="text-sm font-medium">Category</p>
              <p className="text-sm text-muted-foreground">
                {packageDetail.category}
              </p>
            </div> */}
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Badge variant="outline">{packageDetail.status}</Badge>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm text-muted-foreground">
                  {packageDetail.description}
                </p>
              </div>

              <div className="mt-4 bg-amber-50 dark:bg-amber-950/20 p-3 rounded-md flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium text-amber-800 dark:text-amber-300">
                    Important Information
                  </p>
                  <p className="text-amber-700 dark:text-amber-400">
                    By accepting to deliver this package, you agree to our
                    delivery terms and confirm that you will handle the package
                    with care.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-64 space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={packageDetail.senderProfilePic}
                      alt={packageDetail.senderName}
                    />
                    <AvatarFallback>
                      {packageDetail.senderName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {packageDetail.senderName}
                    </p>
                    {/* <div className="flex items-center">
                  <span className="text-xs text-yellow-500">★</span>
                  <span className="text-xs ml-1">
                    {packageDetail.sender.rating} (
                    {packageDetail.sender.reviews} reviews)
                  </span>
                </div> */}
                  </div>
                </div>

                <div className="mt-4">
                  <Button className="w-full" onClick={handleExpressInterest}>
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    I'll Deliver This
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="text-sm font-medium mb-2">Delivery Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex flex-col items-center mr-2">
                      <div className="rounded-full w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center text-xs">
                        1
                      </div>
                      <div className="w-0.5 h-8 bg-border mt-1"></div>
                    </div>
                    <div>
                      <p className="text-xs font-medium">Express Interest</p>
                      <p className="text-xs text-muted-foreground">
                        Let the sender know you can deliver
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex flex-col items-center mr-2">
                      <div className="rounded-full w-6 h-6 bg-muted text-muted-foreground flex items-center justify-center text-xs">
                        2
                      </div>
                      <div className="w-0.5 h-8 bg-border mt-1"></div>
                    </div>
                    <div>
                      <p className="text-xs font-medium">Confirm Details</p>
                      <p className="text-xs text-muted-foreground">
                        Agree on pickup and delivery
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex flex-col items-center mr-2">
                      <div className="rounded-full w-6 h-6 bg-muted text-muted-foreground flex items-center justify-center text-xs">
                        3
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium">Deliver & Get Paid</p>
                      <p className="text-xs text-muted-foreground">
                        Complete delivery and receive payment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => setSelectedPackage(null)}
            className="sm:order-1"
          >
            Close
          </Button>
          <Button onClick={handleExpressInterest} className="sm:order-2">
            <ThumbsUp className="h-4 w-4 mr-2" />
            I'll Deliver This
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
