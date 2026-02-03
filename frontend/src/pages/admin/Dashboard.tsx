import { Link } from "react-router-dom";
import { Plus, Settings, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AdminSidebar } from "@/components/layout/Sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function AdminDashboardPage() {
    return (
        <SidebarProvider>
            <div className="min-h-screen bg-background text-foreground flex w-full">
                <AdminSidebar />

                <SidebarInset className="flex flex-col flex-1">
                    {/* Admin Header - Minimalist & Professional */}
                    <header className="h-16 border-b-2 border-foreground/10 bg-card sticky top-0 z-30 flex items-center px-8">
                        <div className="flex items-center gap-4 w-full max-w-7xl mx-auto">
                            <h2 className="font-black uppercase tracking-tighter text-lg text-primary/80">Operational Intelligence</h2>
                            <div className="ml-auto flex items-center gap-6">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase text-green-600 tracking-widest">System Online</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main Content Area */}
                    <main className="w-full max-w-7xl mx-auto px-8 py-10">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
                            <div className="space-y-2">
                                <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-none">Admin Console</h1>
                                <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-70">Laboratory & Training Oversight Protocol</p>
                            </div>
                            <Button asChild className="h-16 px-8 rounded-2xl font-black text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-foreground bg-primary hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                                <Link to="/admin/courses/new">
                                    <Plus className="mr-2 h-6 w-6" /> NEW DEPLOYMENT
                                </Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <Card className="border-2 border-foreground rounded-4xl p-8 bg-primary/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">
                                <CardContent className="p-0">
                                    <div className="flex items-center gap-6">
                                        <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                                            <BookOpen className="h-7 w-7 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-black text-4xl leading-none">24</p>
                                            <p className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest mt-1">Active Resources</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-2 border-foreground rounded-4xl p-8 bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">
                                <CardContent className="p-0">
                                    <div className="flex items-center gap-6">
                                        <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center border-2 border-green-500/20">
                                            <Users className="h-7 w-7 text-green-500" />
                                        </div>
                                        <div>
                                            <p className="font-black text-4xl leading-none">1,240</p>
                                            <p className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest mt-1">Personnel Active</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-2 border-foreground rounded-4xl p-8 bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">
                                <CardContent className="p-0">
                                    <div className="flex items-center gap-6">
                                        <div className="h-14 w-14 rounded-2xl bg-orange-500/10 flex items-center justify-center border-2 border-orange-500/20">
                                            <Settings className="h-7 w-7 text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="font-black text-4xl leading-none">12</p>
                                            <p className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest mt-1">Certified Units</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Additional operational logs or quick stats could go here */}
                        <div className="rounded-5xl border-2 border-foreground/10 bg-muted/20 p-10 text-center">
                            <p className="font-black uppercase tracking-widest text-muted-foreground text-sm">System Diagnostics Pending... No Anomalies Detected.</p>
                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
