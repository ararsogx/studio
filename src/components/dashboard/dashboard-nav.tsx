'use client';

import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { navItems } from './dashboard-nav-items';
import type { User } from '@/lib/types';

interface DashboardNavProps {
    userRole: User['role'];
}

export default function DashboardNav({ userRole }: DashboardNavProps) {
  const pathname = usePathname();

  const filteredNavItems = navItems.filter(item => {
    return !item.role || item.role.includes(userRole);
  });

  return (
    <SidebarMenu>
      {filteredNavItems.map((item) => (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton
            href={item.path}
            isActive={pathname === item.path}
            asChild
            tooltip={{children: item.title}}
          >
            <item.icon />
            <span>{item.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
