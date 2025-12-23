import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { notes } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { FileText, Presentation, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const typeIcons = {
    PDF: <FileText className="h-4 w-4 text-muted-foreground" />,
    PPT: <Presentation className="h-4 w-4 text-muted-foreground" />,
    DOCX: <FileText className="h-4 w-4 text-muted-foreground" />,
    Video: <FileText className="h-4 w-4 text-muted-foreground" />,
};

export default function NotesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Short Notes</CardTitle>
        <CardDescription>
          Quick summaries and key points for your revision.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden sm:table-cell">Date Added</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes.map((note) => (
              <TableRow key={note.id}>
                <TableCell className="font-medium">{note.title}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline">{note.category}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                        {typeIcons[note.type]}
                        <span>{note.type}</span>
                    </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{note.dateAdded}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/modules/${note.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
