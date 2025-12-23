import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset } from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import DashboardNav from '@/components/dashboard/dashboard-nav';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import { users } from '@/lib/data';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    // This is a mock user. In a real app, you'd get this from your auth context.
    const user = users.find(u => u.role === 'Admin')!; 

    return (
        <SidebarProvider>
            <Sidebar variant="sidebar" collapsible="icon">
                <SidebarHeader>
                    <Logo />
                </SidebarHeader>
                <SidebarContent>
                    <DashboardNav userRole={user.role} />
                </SidebarContent>
            </Sidebar>
            <div className="flex-1">
                <DashboardHeader />
                <main className="p-4 sm:p-6">{children}</main>
            </div>
        </SidebarProvider>
    );
}
