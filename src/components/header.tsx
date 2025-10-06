'use client';
import { Bell, ChevronDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { SidebarTrigger } from "./ui/sidebar";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useTeacher } from "@/hooks/use-teacher";

export default function Header() {
    const { user } = useUser();
    const auth = useAuth();
    const { teacher, isLoading } = useTeacher(user?.uid);

    const handleLogout = () => {
        if(auth) {
            signOut(auth);
        }
    }

    if (isLoading) {
        return <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8"><div>Loading...</div></header>
    }

    return (
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
                <h1 className="font-headline text-xl font-semibold hidden md:block">Welcome back, {teacher?.name.split(' ')[0]} 👋</h1>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={teacher?.avatarUrl} alt={teacher?.name || ''} />
                                <AvatarFallback>{teacher?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="hidden text-left md:block">
                                <p className="text-sm font-medium">{teacher?.name}</p>
                                <p className="text-xs text-muted-foreground">{teacher?.email}</p>
                            </div>
                            <ChevronDown className="h-4 w-4 hidden md:block" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
