import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";

export default function ReferralsPage() {
    const referralCode = "LEARN-A3B8C";

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Refer a Friend</CardTitle>
          <CardDescription>
            Share your love for learning and earn rewards!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <Label htmlFor="referral-code">Your Unique Referral Code</Label>
                <div className="flex items-center space-x-2">
                    <Input id="referral-code" value={referralCode} readOnly />
                    <Button variant="outline" size="icon">
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
             <form className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="friend-email">Friend&apos;s Email</Label>
                    <Input id="friend-email" type="email" placeholder="friend@example.com" />
                </div>
                <Button className="w-full">Send Invite</Button>
            </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Your Rewards</CardTitle>
            <CardDescription>
                Track your referrals and rewards here.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-8">
                <p>You haven&apos;t referred anyone yet.</p>
                <p className="text-sm">Start sharing to earn rewards!</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
