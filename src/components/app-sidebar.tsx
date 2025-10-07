'use client';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  BarChart3,
  BookCopy,
  MessageSquareWarning,
  Trophy,
  Calendar,
  Atom,
  Settings,
  Database,
} from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/homework', label: 'Homework', icon: BookCopy },
  { href: '/dashboard/complaints', label: 'Complaints', icon: MessageSquareWarning },
  { href: '/dashboard/rankings', label: 'Rankings', icon: Trophy },
  { href: '/dashboard/calendar', label: 'Calendar', icon: Calendar },
  { href: '/dashboard/seed', label: 'Seed Data', icon: Database },
];

export default function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="p-2">
                 <div className="flex items-center gap-2" data-sidebar="logo">
                     <Atom className="w-8 h-8 text-primary" />
                     <div className="flex flex-col">
                        <h2 className="font-headline text-lg font-semibold">Classroom CC</h2>
                        <p className="text-xs text-muted-foreground">Teacher Portal</p>
                     </div>
                 </div>
            </SidebarHeader>
            <SidebarContent className="p-2">
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                             <SidebarMenuButton
                                asChild
                                isActive={pathname === item.href}
                                tooltip={item.label}
                            >
                                <Link href={item.href}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-2">
                <SidebarMenu>
                     <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Settings">
                            <Settings />
                            <span>Settings</span>
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
