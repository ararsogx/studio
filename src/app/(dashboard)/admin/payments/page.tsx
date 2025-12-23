'use client'

import { useState } from 'react';
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
import { paymentRequests as initialPaymentRequests } from "@/lib/data";
import type { PaymentRequest } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle } from "lucide-react";

export default function AdminPaymentsPage() {
    const [requests, setRequests] = useState<PaymentRequest[]>(initialPaymentRequests);
    const { toast } = useToast();

    const handleApproval = (requestId: string, approve: boolean) => {
        const request = requests.find(r => r.id === requestId);
        if (!request) return;

        setRequests(requests.filter(r => r.id !== requestId));
        
        toast({
            title: approve ? "Payment Approved" : "Payment Rejected",
            description: `The request for ${request.userName} has been ${approve ? 'approved' : 'rejected'}.`,
            variant: approve ? 'default' : 'destructive',
        });
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Payment Approvals</CardTitle>
        <CardDescription>
          Review and approve pending requests for Premium access.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Request Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                        No pending requests.
                    </TableCell>
                </TableRow>
            )}
            {requests.map((request) => {
              const userAvatar = PlaceHolderImages.find((img) => img.id === request.avatar);
              return (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src={userAvatar?.imageUrl} alt={request.userName} />
                            <AvatarFallback>{request.userName.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{request.userName}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{request.userEmail}</TableCell>
                  <TableCell className="hidden md:table-cell">{request.requestDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleApproval(request.id, false)}>
                           <XCircle className="mr-2 h-4 w-4" /> Reject
                        </Button>
                        <Button size="sm" onClick={() => handleApproval(request.id, true)}>
                           <CheckCircle className="mr-2 h-4 w-4" /> Approve
                        </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
