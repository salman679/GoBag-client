import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Building,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <>
      <div className="flex flex-col space-y-6 p-4 md:p-8">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Contact Us</h2>
          <p className="text-muted-foreground">
            Get in touch with our team for any questions or support
          </p>
        </div>

        <Tabs defaultValue="contact-form" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger
              value="contact-form"
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Contact Form</span>
            </TabsTrigger>
            <TabsTrigger
              value="contact-info"
              className="flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Contact Info</span>
            </TabsTrigger>
            <TabsTrigger value="offices" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Our Offices</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact-form">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="partnership">
                        Partnership Opportunity
                      </SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message here"
                    rows={6}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="privacy"
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="privacy" className="text-sm">
                    I agree to the{" "}
                    <Link
                      to="/privacy-policy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and consent to being contacted regarding my inquiry.
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full md:w-auto">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="contact-info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Reach out to us through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-muted-foreground">
                        For general inquiries:
                      </p>
                      <a
                        href="mailto:info@luggageshare.com"
                        className="text-primary hover:underline"
                      >
                        info@luggageshare.com
                      </a>
                      <p className="text-sm text-muted-foreground mt-2">
                        For support:
                      </p>
                      <a
                        href="mailto:support@luggageshare.com"
                        className="text-primary hover:underline"
                      >
                        support@luggageshare.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-sm text-muted-foreground">
                        Customer Support:
                      </p>
                      <a
                        href="tel:+18001234567"
                        className="text-primary hover:underline"
                      >
                        +1 (800) 123-4567
                      </a>
                      <p className="text-sm text-muted-foreground mt-2">
                        Business Inquiries:
                      </p>
                      <a
                        href="tel:+18009876543"
                        className="text-primary hover:underline"
                      >
                        +1 (800) 987-6543
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Hours of Operation</h3>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday:
                      </p>
                      <p>9:00 AM - 6:00 PM EST</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Saturday:
                      </p>
                      <p>10:00 AM - 4:00 PM EST</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Sunday:
                      </p>
                      <p>Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Connect With Us</CardTitle>
                  <CardDescription>
                    Follow us on social media or visit our help center
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Social Media</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <a
                          href="https://twitter.com/luggageshare"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-primary hover:underline"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-twitter"
                          >
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          </svg>
                          <span>Twitter</span>
                        </a>
                        <a
                          href="https://facebook.com/luggageshare"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-primary hover:underline"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-facebook"
                          >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                          <span>Facebook</span>
                        </a>
                        <a
                          href="https://instagram.com/luggageshare"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-primary hover:underline"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-instagram"
                          >
                            <rect
                              x="2"
                              y="2"
                              width="20"
                              height="20"
                              rx="5"
                              ry="5"
                            ></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                          <span>Instagram</span>
                        </a>
                        <a
                          href="https://linkedin.com/company/luggageshare"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-primary hover:underline"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-linkedin"
                          >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Help Center</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Visit our help center for FAQs and detailed guides on
                        using our platform.
                      </p>
                      <Button variant="outline" className="mt-2">
                        <Link to="/help">Visit Help Center</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Live Chat</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Chat with our support team in real-time during business
                        hours.
                      </p>
                      <Button className="mt-2">Start Live Chat</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="offices">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>New York</CardTitle>
                  <CardDescription>Headquarters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm">123 Broadway</p>
                      <p className="text-sm">Suite 500</p>
                      <p className="text-sm">New York, NY 10001</p>
                      <p className="text-sm">United States</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm">+1 (212) 555-1234</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm">nyc@luggageshare.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>London</CardTitle>
                  <CardDescription>European Office</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm">45 Oxford Street</p>
                      <p className="text-sm">Floor 3</p>
                      <p className="text-sm">London, W1D 2DZ</p>
                      <p className="text-sm">United Kingdom</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm">+44 20 7123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm">london@luggageshare.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Singapore</CardTitle>
                  <CardDescription>Asia-Pacific Office</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm">78 Shenton Way</p>
                      <p className="text-sm">#15-02</p>
                      <p className="text-sm">Singapore 079120</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm">+65 6123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm">singapore@luggageshare.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="bg-muted/40">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Frequently Asked Questions
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find quick answers to common questions about our service.
                </p>
                <Button variant="outline">
                  <Link to="/help">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Visit FAQ Page
                  </Link>
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Partnership Inquiries
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Interested in partnering with LuggageShare? We'd love to hear
                  from you.
                </p>
                <Button variant="outline">
                  <a href="mailto:partnerships@luggageshare.com">
                    <Users className="mr-2 h-4 w-4" />
                    Contact Partnerships Team
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
