import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/Button";
import {
  AlertTriangle,
  ShieldAlert,
  Flame,
  Pill,
  Droplets,
  Banknote,
  FileWarning,
  Skull,
  Snowflake,
  Bomb,
  Zap,
  Package,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ProhibitedItemsPage() {
  return (
    <div className="container max-w-4xl py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Prohibited Items
          </h1>
          <p className="text-muted-foreground mt-2">
            Items that cannot be transported through the GoBag platform
          </p>
        </div>
        <Link to="/packages/request">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Request
          </Button>
        </Link>
      </div>

      <Alert
        variant="destructive"
        className="border-red-300 bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900"
      >
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Important Safety Information</AlertTitle>
        <AlertDescription>
          Attempting to ship prohibited items may result in account suspension,
          legal consequences, and potential safety hazards. Always disclose
          package contents accurately.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-primary/10 p-2">
              <ShieldAlert className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Why We Have Restrictions</CardTitle>
          </div>
          <CardDescription>
            GoBag connects travelers with senders, and our restrictions exist
            to:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc list-inside">
            <li className="text-sm">
              Ensure the safety of all travelers and handlers
            </li>
            <li className="text-sm">
              Comply with international shipping regulations
            </li>
            <li className="text-sm">Prevent illegal cross-border activities</li>
            <li className="text-sm">
              Protect travelers from unwitting legal violations
            </li>
            <li className="text-sm">Maintain the integrity of our community</li>
            <li className="text-sm">Prevent damage to other luggage items</li>
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2 text-primary" />
              Categories of Prohibited Items
            </CardTitle>
            <CardDescription>
              The following categories of items are strictly prohibited from
              being transported through GoBag
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Dangerous Goods */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg flex items-center">
                <Flame className="h-5 w-5 mr-2 text-red-500" />
                Dangerous Goods
              </CardTitle>
              <Badge variant="destructive">High Risk</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-3">
              Items that pose a risk of fire, explosion, or other hazards during
              transport.
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Flammable liquids and gases</li>
              <li>Explosives and fireworks</li>
              <li>Compressed gases and aerosols</li>
              <li>Matches and lighters</li>
              <li>Corrosive materials</li>
              <li>Oxidizers and organic peroxides</li>
            </ul>
          </CardContent>
        </Card>

        {/* Illegal Substances */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg flex items-center">
                <Pill className="h-5 w-5 mr-2 text-red-500" />
                Illegal Substances
              </CardTitle>
              <Badge variant="destructive">Illegal</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-3">
              Items that are illegal in either the origin or destination
              country.
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Narcotics and illegal drugs</li>
              <li>Psychotropic substances</li>
              <li>Counterfeit goods</li>
              <li>Illegal wildlife products</li>
              <li>Prescription drugs without proper documentation</li>
              <li>Drug paraphernalia</li>
            </ul>
          </CardContent>
        </Card>

        {/* Weapons and Ammunition */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg flex items-center">
                <Bomb className="h-5 w-5 mr-2 text-red-500" />
                Weapons & Ammunition
              </CardTitle>
              <Badge variant="destructive">Illegal</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-3">
              Any items designed or modified to cause injury or harm.
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Firearms and ammunition</li>
              <li>Replica or imitation firearms</li>
              <li>Knives and bladed weapons</li>
              <li>Martial arts equipment</li>
              <li>Stun guns and tasers</li>
              <li>Tear gas and pepper spray</li>
            </ul>
          </CardContent>
        </Card>

        {/* Perishable Items */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg flex items-center">
                <Snowflake className="h-5 w-5 mr-2 text-blue-500" />
                Perishable Items
              </CardTitle>
              <Badge variant="secondary">Restricted</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-3">
              Items that may spoil, rot, or degrade during transit.
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Fresh fruits and vegetables</li>
              <li>Meat, fish, and dairy products</li>
              <li>Cut flowers and plants</li>
              <li>Frozen foods</li>
              <li>Items requiring refrigeration</li>
              <li>Biological materials</li>
            </ul>
          </CardContent>
        </Card>

        {/* Liquids */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg flex items-center">
                <Droplets className="h-5 w-5 mr-2 text-blue-500" />
                Liquids (Over 100ml)
              </CardTitle>
              <Badge variant="secondary">Restricted</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-3">
              Liquids that exceed carry-on restrictions or may leak during
              transport.
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Beverages over 100ml</li>
              <li>Oils and sauces</li>
              <li>Perfumes and colognes (large bottles)</li>
              <li>Liquid cosmetics and toiletries</li>
              <li>Soups and liquid foods</li>
              <li>Paints and varnishes</li>
            </ul>
          </CardContent>
        </Card>

        {/* High-Value Items */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg flex items-center">
                <Banknote className="h-5 w-5 mr-2 text-green-500" />
                High-Value Items
              </CardTitle>
              <Badge variant="secondary">Restricted</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-3">
              Items with significant monetary value that exceed insurance
              limits.
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Cash and currency over $1,000</li>
              <li>Jewelry and precious gems</li>
              <li>Collectibles and rare items</li>
              <li>Expensive electronics</li>
              <li>Luxury watches</li>
              <li>Fine art and antiques</li>
            </ul>
          </CardContent>
        </Card>

        {/* Restricted Documents */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg flex items-center">
                <FileWarning className="h-5 w-5 mr-2 text-amber-500" />
                Restricted Documents
              </CardTitle>
              <Badge variant="outline">Caution</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-3">
              Documents that may be illegal to transport across borders.
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Falsified or forged documents</li>
              <li>Stolen passports or IDs</li>
              <li>Classified or government-restricted documents</li>
              <li>Certain intellectual property</li>
              <li>Uncertified academic credentials</li>
              <li>Unauthorized business documents</li>
            </ul>
          </CardContent>
        </Card>

        {/* Hazardous Materials */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg flex items-center">
                <Skull className="h-5 w-5 mr-2 text-red-500" />
                Hazardous Materials
              </CardTitle>
              <Badge variant="destructive">High Risk</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-3">
              Materials that pose health, safety, or environmental risks.
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Toxic substances</li>
              <li>Radioactive materials</li>
              <li>Infectious substances</li>
              <li>Biohazards</li>
              <li>Chemicals and pesticides</li>
              <li>Mercury and asbestos</li>
            </ul>
          </CardContent>
        </Card>

        {/* Electronic Devices with Lithium Batteries */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg flex items-center">
                <Zap className="h-5 w-5 mr-2 text-amber-500" />
                Lithium Batteries
              </CardTitle>
              <Badge variant="outline">Caution</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-3">
              Loose lithium batteries or devices with damaged batteries.
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Loose lithium-ion batteries</li>
              <li>Damaged electronic devices</li>
              <li>Recalled battery products</li>
              <li>E-cigarettes and vaping devices</li>
              <li>Power banks over 100Wh</li>
              <li>Devices with exposed batteries</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What if I'm unsure if my item is prohibited?
              </AccordionTrigger>
              <AccordionContent>
                If you're unsure whether your item is prohibited, it's best to
                contact our support team before creating a shipping request.
                Provide detailed information about the item, and we'll advise
                you on whether it can be transported through our platform. When
                in doubt, assume the item is prohibited until confirmed
                otherwise.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                Are there exceptions to these prohibitions?
              </AccordionTrigger>
              <AccordionContent>
                Generally, no. These prohibitions exist for legal and safety
                reasons. In very rare cases, certain items may be allowed with
                proper documentation and advance approval from our team. This
                typically applies only to specialized medical supplies or
                certain regulated items with proper permits. Contact support for
                specific inquiries.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                What happens if prohibited items are discovered?
              </AccordionTrigger>
              <AccordionContent>
                If prohibited items are discovered before transport, the
                shipping request will be canceled and the sender may face
                account restrictions. If discovered during transport, the
                traveler should refuse to carry the package and report it
                immediately. Intentionally shipping prohibited items may result
                in permanent account termination and potential legal
                consequences.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I ship food items?</AccordionTrigger>
              <AccordionContent>
                Non-perishable, commercially packaged food items are generally
                allowed, but they must comply with customs regulations of both
                origin and destination countries. Fresh foods, homemade foods,
                and items requiring refrigeration are prohibited. Many countries
                have strict regulations about importing food, so check
                destination country restrictions before shipping.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Are medications allowed?</AccordionTrigger>
              <AccordionContent>
                Over-the-counter medications in original, sealed packaging are
                generally allowed in reasonable quantities for personal use.
                Prescription medications require proper documentation including
                prescriptions and may be subject to quantity limitations.
                Controlled substances and narcotics are strictly prohibited,
                even with a prescription. Always check destination country
                regulations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          This list is not exhaustive. When in doubt, please contact our support
          team.
        </p>
        <Link to="/packages/request">
          <Button>
            <Package className="mr-2 h-4 w-4" />
            Create Package Request
          </Button>
        </Link>
      </div>
    </div>
  );
}
