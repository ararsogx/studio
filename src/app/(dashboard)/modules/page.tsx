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
import { modules } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { FileText, Presentation, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const typeIcons = {
    PDF: <FileText className="h-4 w-4 text-muted-foreground" />,
    PPT: <Presentation className="h-4 w-4 text-muted-foreground" />,
    DOCX: <FileText className="h-4 w-4 text-muted-foreground" />,
    Video: <FileText className="h-4 w-4 text-muted-foreground" />,
};

export default function ModulesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Modules</CardTitle>
        <CardDescription>
          Browse and access all available course modules.
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
            {modules.map((module) => (
              <TableRow key={module.id}>
                <TableCell className="font-medium">{module.title}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline">{module.category}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                        {typeIcons[module.type]}
                        <span>{module.type}</span>
                    </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{module.dateAdded}</TableCell>
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
                        <Link href={`/dashboard/modules/${module.id}`}>View Details</Link>
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
