import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EarningsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>
          <p className="text-muted-foreground">
            Track your earnings and manage payments
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select defaultValue="march2025">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="march2025">March 2025</SelectItem>
              <SelectItem value="february2025">February 2025</SelectItem>
              <SelectItem value="january2025">January 2025</SelectItem>
              <SelectItem value="q12025">Q1 2025</SelectItem>
              <SelectItem value="2024">All of 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,550.32</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+20.1% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,250.00</div>
            <div className="pt-2">
              <Button size="sm" className="w-full">
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$350.00</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <span>Expected in 3-5 days</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Per Trip
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$189.60</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+5.2% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Your recent earnings and payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          transaction.type === "earning"
                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {transaction.type === "earning" ? (
                          <ArrowUpRight className="h-5 w-5" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium ${
                          transaction.type === "earning"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {transaction.type === "earning" ? "+" : "-"}
                        {transaction.amount}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="withdrawals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal History</CardTitle>
              <CardDescription>
                Your recent withdrawals to payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {withdrawals.map((withdrawal) => (
                  <div
                    key={withdrawal.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">
                          Withdrawal to {withdrawal.method}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {withdrawal.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{withdrawal.amount}</p>
                      <Badge
                        variant={
                          withdrawal.status === "Completed"
                            ? "outline"
                            : "secondary"
                        }
                      >
                        {withdrawal.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payment-methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods for withdrawals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {method.details}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button>Edit</Button>
                      {method.default ? (
                        <Badge>Default</Badge>
                      ) : (
                        <Button variant="outline" size="sm">
                          Set Default
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button className="w-full">Add Payment Method</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const transactions = [
  {
    id: "1",
    description: "Package delivery from Alice Smith",
    date: "Mar 5, 2025",
    amount: "$120.00",
    status: "Completed",
    type: "earning",
  },
  {
    id: "2",
    description: "Package delivery from Bob Johnson",
    date: "Mar 2, 2025",
    amount: "$85.00",
    status: "Completed",
    type: "earning",
  },
  {
    id: "3",
    description: "Withdrawal to Bank Account",
    date: "Feb 28, 2025",
    amount: "$200.00",
    status: "Completed",
    type: "withdrawal",
  },
  {
    id: "4",
    description: "Package delivery from Carol Williams",
    date: "Feb 25, 2025",
    amount: "$95.00",
    status: "Completed",
    type: "earning",
  },
  {
    id: "5",
    description: "Service fee",
    date: "Feb 25, 2025",
    amount: "$9.50",
    status: "Completed",
    type: "withdrawal",
  },
];

const withdrawals = [
  {
    id: "1",
    method: "Bank Account (****1234)",
    date: "Feb 28, 2025",
    amount: "$200.00",
    status: "Completed",
  },
  {
    id: "2",
    method: "PayPal (john.doe@example.com)",
    date: "Feb 15, 2025",
    amount: "$350.00",
    status: "Completed",
  },
  {
    id: "3",
    method: "Bank Account (****1234)",
    date: "Jan 30, 2025",
    amount: "$175.00",
    status: "Completed",
  },
  {
    id: "4",
    method: "Bank Account (****1234)",
    date: "Mar 7, 2025",
    amount: "$300.00",
    status: "Processing",
  },
];

const paymentMethods = [
  {
    id: "1",
    name: "Bank Account",
    details: "****1234 • Chase Bank",
    default: true,
  },
  {
    id: "2",
    name: "PayPal",
    details: "john.doe@example.com",
    default: false,
  },
];
