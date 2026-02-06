import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/Card";

// Mock Data
const MOCK_COURSES = [
    { id: "1", title: "Advanced Thermodynamics", category: "Mechanical", students: 124, status: "active" },
    { id: "2", title: "Digital Signal Processing", category: "Electronics", students: 85, status: "active" },
    { id: "3", title: "CNC Machining Basics", category: "Manufacturing", students: 210, status: "draft" },
    { id: "4", title: "Embedded Systems 101", category: "Electronics", students: 156, status: "active" },
    { id: "5", title: "Fluid Dynamics", category: "Mechanical", students: 98, status: "archived" },
];

export default function AdminCoursesList() {
    return (
        <main className="w-full max-w-7xl mx-auto px-8 py-8">
            {/* Header */}
            <div className="flex items-end justify-between mb-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">Course Management</h1>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-70">Curriculum & Content</p>
                </div>
                <Button asChild className="h-10 px-6 rounded-xl font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-foreground bg-primary text-primary-foreground hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                    <Link to="/admin/courses/new">
                        <Plus className="mr-2 h-3.5 w-3.5" /> CREATE COURSE
                    </Link>
                </Button>
            </div>

            {/* Toolbar */}
            <div className="relative max-w-md mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search courses..."
                    className="h-10 pl-9 border-2 border-foreground/10 rounded-xl font-bold bg-card text-sm focus-visible:ring-primary/20"
                />
            </div>

            {/* Courses Table */}
            <Card className="border-2 border-foreground rounded-3xl bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/5 border-b-2 border-foreground/10">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="h-10 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Course</TableHead>
                                <TableHead className="h-10 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</TableHead>
                                <TableHead className="h-10 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Students</TableHead>
                                <TableHead className="h-10 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {MOCK_COURSES.map((course) => (
                                <TableRow key={course.id} className="hover:bg-muted/5 border-b border-foreground/5 last:border-0 group">
                                    <TableCell className="px-6 py-2.5 font-bold">
                                        <div className="flex items-center gap-3">
                                            <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center font-black text-[10px] border border-primary/20 text-primary">
                                                <BookOpen className="h-3.5 w-3.5" />
                                            </div>
                                            <span className="text-sm">{course.title}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-2.5">
                                        <Badge variant="outline" className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide border-foreground/10 bg-muted/10 text-muted-foreground">
                                            {course.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-6 py-2.5 text-center text-xs font-bold text-muted-foreground font-mono">
                                        {course.students}
                                    </TableCell>
                                    <TableCell className="px-6 py-2.5 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-muted rounded-full">
                                                <Pencil className="h-3.5 w-3.5" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive rounded-full">
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
    );
}
