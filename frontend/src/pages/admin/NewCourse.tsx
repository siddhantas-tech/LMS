import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_CATEGORIES } from "@/api/mockData";
import { ArrowLeft } from "lucide-react";

export default function NewCoursePage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Saving course:", formData);
        navigate("/admin/courses");
    };

    return (
        <main className="w-full max-w-2xl mx-auto px-8 py-12">
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Header with Back Button */}
                <div className="flex items-start gap-4 mb-8">
                    <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 shrink-0 rounded-xl border-2 border-transparent hover:border-foreground/10 hover:bg-muted"
                    >
                        <Link to="/admin/courses">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div className="flex flex-col gap-1 pt-1">
                        <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">Create New Course</h1>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-70">Add a new curriculum module</p>
                    </div>
                </div>

                <Card className="border-2 border-foreground rounded-3xl bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <CardHeader className="p-8 pb-4">
                        <CardTitle className="text-lg font-black uppercase tracking-tight">Course Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-2 space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Course Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Advanced Robotics"
                                className="h-12 border-2 border-foreground/10 rounded-xl font-bold bg-muted/5 focus-visible:ring-primary/20"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Course overview and objectives..."
                                className="min-h-[120px] border-2 border-foreground/10 rounded-xl font-bold p-4 bg-muted/5 focus-visible:ring-primary/20 resize-none"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</Label>
                            <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                <SelectTrigger className="h-12 border-2 border-foreground/10 rounded-xl font-bold bg-muted/5 focus:ring-primary/20">
                                    <SelectValue placeholder="Select a Category" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    {MOCK_CATEGORIES.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id} className="font-bold focus:bg-muted/10 cursor-pointer">
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>

                    {/* Footer with Actions inside the Card */}
                    <CardFooter className="p-8 pt-0 flex gap-4">
                        <Button
                            asChild
                            variant="outline"
                            className="h-12 flex-1 rounded-xl font-bold border-2 hover:bg-muted/10"
                        >
                            <Link to="/admin/courses">Cancel</Link>
                        </Button>
                        <Button
                            type="submit"
                            className="h-12 flex-[2] rounded-xl font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-foreground bg-primary text-primary-foreground hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                        >
                            CREATE COURSE
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </main>
    );
}
