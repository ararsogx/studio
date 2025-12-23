import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bell, Zap } from "lucide-react";
import { learningMaterials, notices, dailyMotivation, users } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  const user = users.find(u => u.role === 'Admin')!;
  const recentMaterials = learningMaterials.slice(0, 3);

  return (
    <div className="grid gap-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold font-headline tracking-tight">
          Welcome back, {user.name.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s a snapshot of your learning universe today.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Continue Learning</CardTitle>
            <CardDescription>
              Pick up where you left off.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMaterials.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <Zap className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  {item.progress !== undefined && (
                    <div className="w-24">
                       <Progress value={item.progress} className="h-2" />
                       <p className="text-xs text-right text-muted-foreground mt-1">{item.progress}%</p>
                    </div>
                  )}
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/dashboard/modules/${item.id}`}>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notice Board
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {notices.map((notice, index) => (
                <li key={notice.id} className="space-y-1">
                    <div className="flex items-baseline justify-between">
                        <p className="font-medium">{notice.title}</p>
                        <p className="text-xs text-muted-foreground">{notice.date}</p>
                    </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{notice.content}</p>
                  {index < notices.length - 1 && <Separator className="pt-4" />}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Your Status</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
                 <Badge variant={user.role === 'Premium' || user.role === 'Admin' ? 'default' : 'secondary'} className={user.role === 'Premium' || user.role === 'Admin' ? 'bg-accent text-accent-foreground' : ''}>
                    {user.role} User
                </Badge>
                <p className="text-muted-foreground">
                    {user.role === 'Standard' ? "Upgrade to Premium to unlock all features." : "You have access to all features."}
                </p>
                {user.role === 'Standard' && <Button>Upgrade Now</Button>}
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline">Daily Motivation</CardTitle>
            </CardHeader>
             <CardContent className="flex flex-col items-center justify-center space-y-2 text-center">
                <p className="text-lg italic text-foreground">"{dailyMotivation.quote}"</p>
                <p className="text-sm text-muted-foreground">- {dailyMotivation.author}</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
