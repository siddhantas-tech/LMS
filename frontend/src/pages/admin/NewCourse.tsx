import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Image as ImageIcon, Layout, ListChecks, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminSidebar } from "@/components/layout/Sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { MOCK_CATEGORIES } from "@/api/mockData";
import { cn } from "@/lib/utils";

export default function NewCoursePage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        thumbnail: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock save
        console.log("Saving course:", formData);
        navigate("/admin");
    };

    return (
        <SidebarProvider>
            <div className="min-h-screen bg-background text-foreground flex w-full">
                <AdminSidebar />

                <SidebarInset className="flex flex-col flex-1">
                    <header className="h-16 border-b-2 border-foreground/10 bg-card sticky top-0 z-30 flex items-center px-8">
                        <div className="flex items-center gap-4 w-full max-w-7xl mx-auto">
                            <h2 className="font-black uppercase tracking-tighter text-lg text-primary/80">Protocol: Asset Deployment</h2>
                            <div className="ml-auto">
                                <Button asChild variant="ghost" className="h-10 px-4 rounded-xl font-bold gap-2">
                                    <Link to="/admin"><ArrowLeft className="h-4 w-4" /> Cancel Operation</Link>
                                </Button>
                            </div>
                        </div>
                    </header>

                    <main className="w-full max-w-4xl mx-auto px-8 py-12">
                        <form onSubmit={handleSubmit} className="space-y-12">
                            {/* Header Section */}
                            <div className="space-y-2">
                                <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-none">Asset Creation</h1>
                                <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-70">Configure training module for laboratory integration.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {/* Left Side: Primary Config */}
                                <div className="md:col-span-2 space-y-10">
                                    <Card className="border-2 border-foreground rounded-4xl bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                                        <CardHeader className="p-8 border-b-2 border-foreground/10 bg-muted/5">
                                            <div className="flex items-center gap-3">
                                                <Layout className="h-5 w-5 text-primary" />
                                                <CardTitle className="text-lg font-black uppercase tracking-tight">Core Metadata</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-8 space-y-8">
                                            <div className="space-y-2">
                                                <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Resource ID (Title)</Label>
                                                <Input
                                                    id="title"
                                                    placeholder="Module Designation..."
                                                    className="h-12 border-2 border-foreground/20 rounded-xl font-bold bg-muted/5 focus-visible:ring-primary/20"
                                                    value={formData.title}
                                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Functional Spec (Description)</Label>
                                                <Textarea
                                                    id="description"
                                                    placeholder="Technical details..."
                                                    className="min-h-[160px] border-2 border-foreground/20 rounded-2xl font-bold p-6 bg-muted/5 focus-visible:ring-primary/20"
                                                    value={formData.description}
                                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-2 border-foreground rounded-4xl bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                                        <CardHeader className="p-8 border-b-2 border-foreground/10 bg-muted/5">
                                            <div className="flex items-center gap-3">
                                                <ListChecks className="h-5 w-5 text-primary" />
                                                <CardTitle className="text-lg font-black uppercase tracking-tight">System Classification</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-8">
                                            <div className="grid grid-cols-2 gap-3">
                                                {MOCK_CATEGORIES.map((cat) => (
                                                    <button
                                                        key={cat.id}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, category: cat.id })}
                                                        className={cn(
                                                            "p-4 rounded-2xl border-2 text-left transition-all",
                                                            formData.category === cat.id
                                                                ? "border-primary bg-primary/5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                                                : "border-foreground/5 hover:border-foreground/20 hover:bg-muted/30"
                                                        )}
                                                    >
                                                        <p className="font-black uppercase tracking-tight text-xs">{cat.name}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Right Side: Visuals & Actions */}
                                <div className="space-y-10">
                                    <Card className="border-2 border-foreground rounded-4xl bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                                        <CardHeader className="p-8 border-b-2 border-foreground/10 bg-muted/5">
                                            <div className="flex items-center gap-3">
                                                <ImageIcon className="h-5 w-5 text-primary" />
                                                <CardTitle className="text-lg font-black uppercase tracking-tight">Interface Visual</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-8 space-y-4">
                                            <div className="aspect-video bg-muted/30 border-2 border-dashed border-foreground/10 rounded-2xl flex flex-col items-center justify-center text-muted-foreground p-4 group hover:border-primary/40 transition-all cursor-pointer">
                                                <PlusCircle className="h-8 w-8 group-hover:text-primary mb-2" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-center">Protocol: Upload Thumbnail</p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="space-y-3">
                                        <Button type="submit" className="w-full h-20 rounded-2xl font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-foreground bg-primary text-primary-foreground hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                                            <Save className="mr-2 h-6 w-6" /> COMMIT TO SYSTEM
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
