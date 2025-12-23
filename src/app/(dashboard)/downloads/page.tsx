import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { learningMaterials, users } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { FileWarning, Download } from "lucide-react";

export default function DownloadsPage() {
    // This is a mock. In a real app, this would be based on the logged-in user.
    const user = users.find(u => u.role === 'Premium')!;

    // Mock downloaded items
    const downloadedItems = learningMaterials.slice(0,2);
    const isEmpty = downloadedItems.length === 0;

    return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Offline Resources</CardTitle>
        <CardDescription>
          Materials you have downloaded for offline access. These are only accessible within Learniverse Hub.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {user.role === 'Standard' && (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 p-12 text-center">
                <FileWarning className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">Premium Feature</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                    Offline access is only available for Premium users.
                </p>
                <Button>Upgrade to Premium</Button>
            </div>
        )}
        {user.role !== 'Standard' && isEmpty && (
             <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 p-12 text-center">
                <Download className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">No Downloads Yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    You can download materials from their respective pages.
                </p>
            </div>
        )}
        {user.role !== 'Standard' && !isEmpty && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {downloadedItems.map(item => (
                    <Card key={item.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-base">{item.title}</CardTitle>
                            <CardDescription>{item.category}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1"></CardContent>
                        <CardContent>
                            <Button className="w-full">Open</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )}
      </CardContent>
    </Card>
  );
}
