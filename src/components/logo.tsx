import { Rocket } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Rocket className="h-6 w-6 text-primary" />
      <h1 className="font-headline text-xl font-bold text-foreground">
        Learniverse Hub
      </h1>
    </div>
  );
}
