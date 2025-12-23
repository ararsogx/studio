import { learningMaterials } from "@/lib/data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Book, FileText, Presentation } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const typeIcons = {
    PDF: <FileText className="h-4 w-4" />,
    PPT: <Presentation className="h-4 w-4" />,
    DOCX: <FileText className="h-4 w-4" />,
    Video: <FileText className="h-4 w-4" />,
};

export default function ModuleDetailPage({ params }: { params: { id: string } }) {
  const module = learningMaterials.find((m) => m.id === params.id);

  if (!module) {
    notFound();
  }
  
  const thumbnail = PlaceHolderImages.find(p => p.id.startsWith('module-thumbnail'));

  return (
    <div className="grid gap-6">
       <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <h1 className="text-3xl font-bold font-headline">{module.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Badge variant="outline">{module.category}</Badge>
                <div className="flex items-center gap-1.5">
                    {typeIcons[module.type]}
                    <span>{module.type}</span>
                </div>
                <span>Added on {module.dateAdded}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button>
              <Book className="mr-2 h-4 w-4" />
              Generate Study Guide
            </Button>
          </div>
       </div>

      <Card>
        <CardContent className="p-6">
            <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                {thumbnail && (
                     <Image
                        src={thumbnail.imageUrl}
                        alt={thumbnail.description}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full"
                        data-ai-hint={thumbnail.imageHint}
                    />
                )}
            </div>
            <div className="mt-6 prose prose-stone dark:prose-invert max-w-none">
                <h2 className="font-headline">Module Content</h2>
                <p>The content for &quot;{module.title}&quot; would be displayed here. Depending on the file type ({module.type}), this could be an embedded PDF viewer, a presentation slideshow, or a document renderer.</p>
                <p>For now, this is a placeholder. In a real application, you would integrate a library or service to render these file formats securely within the browser.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
