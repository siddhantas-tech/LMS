import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Settings,
    PlusCircle,
    ArrowLeft,
    BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/themeToggle";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"

const sidebarLinks = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const location = useLocation();

    return (
        <Sidebar className="border-r-2 border-foreground/20" collapsible="icon">
            <SidebarHeader className="p-4 border-b-2 border-foreground/10 bg-card">
                <div className="flex items-center gap-3">
                    <SidebarTrigger className="h-8 w-8 border-2 border-foreground rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:scale-105" />

                    <Link to="/" className="flex items-center gap-2 group-data-[collapsible=icon]:hidden overflow-hidden">
                        <div className="h-8 w-8 shrink-0 rounded-4xl bg-primary flex items-center justify-center text-primary-foreground font-black border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            R
                        </div>
                        <span className="font-black uppercase tracking-tighter text-lg whitespace-nowrap">RIIDL</span>
                    </Link>

                    <div className="ml-auto group-data-[collapsible=icon]:hidden">
                        <ThemeToggle />
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="p-3 space-y-6 bg-background">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 group-data-[collapsible=icon]:hidden">
                        Platform
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1.5">
                            {sidebarLinks.map((link) => {
                                const isActive = location.pathname === link.href;
                                return (
                                    <SidebarMenuItem key={link.href}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={link.name}
                                            className={cn(
                                                "h-12 rounded-xl border-2 transition-all",
                                                isActive
                                                    ? "bg-primary text-primary-foreground border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5"
                                                    : "hover:bg-muted border-transparent hover:border-foreground/20"
                                            )}
                                        >
                                            <Link to={link.href}>
                                                <link.icon className={cn("size-5!", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                                                <span className="font-bold uppercase tracking-tight text-xs group-data-[collapsible=icon]:hidden">{link.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        Actions
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    className="h-12 rounded-xl border-2 border-dashed border-foreground/10 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                                >
                                    <Link to="/admin/courses/new">
                                        <PlusCircle className="size-5! text-muted-foreground group-hover:text-primary" />
                                        <span className="font-bold uppercase tracking-tight text-xs">New Course</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t-2 border-foreground/5 bg-muted/20">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            tooltip="Exit Admin"
                            className="h-12 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all"
                        >
                            <Link to="/">
                                <ArrowLeft className="size-5!" />
                                <span className="font-bold uppercase tracking-tight text-xs group-data-[collapsible=icon]:hidden">Exit Portal</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
