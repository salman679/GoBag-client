import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  Clock,
  FileText,
  Lock,
  Shield,
  ShieldCheck,
  Star,
  Upload,
  User,
  XCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function TrustPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trust & Safety</h1>
        <p className="text-muted-foreground">
          Manage your verification status and build trust with senders
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Verification Status
            </CardTitle>
            <CardDescription>
              Complete verification steps to build trust with senders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email Verification</p>
                    <p className="text-sm text-muted-foreground">
                      Your email has been verified
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                >
                  Verified
                </Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Phone Verification</p>
                    <p className="text-sm text-muted-foreground">
                      Your phone number has been verified
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                >
                  Verified
                </Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">ID Verification</p>
                    <p className="text-sm text-muted-foreground">
                      Your government ID has been verified
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                >
                  Verified
                </Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Address Verification</p>
                    <p className="text-sm text-muted-foreground">
                      We need to verify your address
                    </p>
                  </div>
                </div>
                <Button size="sm">Verify Now</Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Background Check</p>
                    <p className="text-sm text-muted-foreground">
                      Optional for premium travelers
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Start Check
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Security Settings
            </CardTitle>
            <CardDescription>Enhance your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Login History</p>
                  <p className="text-sm text-muted-foreground">
                    View your recent login activity
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-muted-foreground">
                    Last updated 3 months ago
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reviews" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reviews">Reviews & Ratings</TabsTrigger>
          <TabsTrigger value="documents">Verification Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Reviews from Senders
              </CardTitle>
              <CardDescription>
                See what senders have said about your service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-2xl font-bold">4.8</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current text-muted" />
                    <span className="ml-2 text-sm text-muted-foreground">
                      Based on 42 reviews
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-5 gap-2">
                    <div className="col-span-1 text-sm">5 stars</div>
                    <div className="col-span-3">
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="col-span-1 text-right text-sm">36</div>

                    <div className="col-span-1 text-sm">4 stars</div>
                    <div className="col-span-3">
                      <Progress value={10} className="h-2" />
                    </div>
                    <div className="col-span-1 text-right text-sm">4</div>

                    <div className="col-span-1 text-sm">3 stars</div>
                    <div className="col-span-3">
                      <Progress value={5} className="h-2" />
                    </div>
                    <div className="col-span-1 text-right text-sm">2</div>

                    <div className="col-span-1 text-sm">2 stars</div>
                    <div className="col-span-3">
                      <Progress value={0} className="h-2" />
                    </div>
                    <div className="col-span-1 text-right text-sm">0</div>

                    <div className="col-span-1 text-sm">1 star</div>
                    <div className="col-span-3">
                      <Progress value={0} className="h-2" />
                    </div>
                    <div className="col-span-1 text-right text-sm">0</div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage
                            src={review.sender.image}
                            alt={review.sender.name}
                          />
                          <AvatarFallback>
                            {review.sender.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{review.sender.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {review.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-current" : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                    <Separator className="my-4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Verification Documents
              </CardTitle>
              <CardDescription>
                Manage your verification documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Government ID</p>
                      <p className="text-sm text-muted-foreground">
                        Passport • Verified on Jan 15, 2025
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Selfie Verification</p>
                      <p className="text-sm text-muted-foreground">
                        Verified on Jan 15, 2025
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Proof of Address</p>
                      <p className="text-sm text-muted-foreground">
                        Upload a utility bill or bank statement
                      </p>
                    </div>
                  </div>
                  <Button className="gap-2" size="sm">
                    <Upload className="h-4 w-4" />
                    Upload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const reviews = [
  {
    id: "1",
    sender: {
      name: "David Brown",
      image: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    date: "Feb 20, 2025",
    comment:
      "John was extremely professional and took great care of my package. It arrived safely and on time. Would definitely use his services again!",
  },
  {
    id: "2",
    sender: {
      name: "Emma Davis",
      image: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    date: "Feb 26, 2025",
    comment:
      "Excellent service! John communicated clearly throughout the process and delivered my documents safely. Very reliable and trustworthy.",
  },
  {
    id: "3",
    sender: {
      name: "Alice Smith",
      image: "/placeholder.svg?height=40&width=40",
    },
    rating: 4,
    date: "Mar 5, 2025",
    comment:
      "Good experience overall. The package arrived in good condition, though a day later than expected. John kept me updated about the delay.",
  },
];
