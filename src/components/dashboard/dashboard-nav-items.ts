import { Calculator, BookCopy, FileText, PencilRuler, Sparkles, Users, Download, CreditCard, LayoutDashboard } from "lucide-react";

export type NavItem = {
    path: string;
    title: string;
    icon: React.ElementType;
    role?: ('Admin' | 'Premium' | 'Standard')[];
};

export const navItems: NavItem[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        icon: LayoutDashboard,
    },
    {
        path: '/dashboard/modules',
        title: 'Modules',
        icon: BookCopy,
    },
    {
        path: '/dashboard/notes',
        title: 'Short Notes',
        icon: FileText,
    },
    {
        path: '/dashboard/exams',
        title: 'Exams',
        icon: PencilRuler,
    },
    {
        path: '/dashboard/assistant',
        title: 'AI Assistant',
        icon: Sparkles,
    },
    {
        path: '/dashboard/calculator',
        title: 'Grade Calculator',
        icon: Calculator,
    },
    {
        path: '/dashboard/referrals',
        title: 'Referrals',
        icon: Users,
    },
    {
        path: '/dashboard/downloads',
        title: 'Downloads',
        icon: Download,
        role: ['Premium', 'Admin'],
    },
    {
        path: '/dashboard/admin/payments',
        title: 'Payments',
        icon: CreditCard,
        role: ['Admin'],
    },
];
