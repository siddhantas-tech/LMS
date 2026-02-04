import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Plus,
    Video,
    FileQuestion,
    MoreVertical,
    GripVertical,
    Trash2,
    Check,
    ChevronsUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MOCK_CATEGORIES } from "@/api/mockData";

// Mock Data for Labs
const MOCK_LABS = [
    { id: "1", name: "Thermodynamics Lab", code: "ME-201" },
    { id: "2", name: "Circuit Analysis", code: "EE-104" },
    { id: "3", name: "Fluid Mechanics", code: "ME-305" },
    { id: "4", name: "Digital Logic", code: "CS-202" },
];

export default function EditCoursePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Course State
    const [course, setCourse] = useState({
        title: "Advanced Thermodynamics",
        description: "Comprehensive study of heat, energy, and work interactions in engineering systems.",
        category: "Mechanical"
    });

    // Topics State
    const [topics, setTopics] = useState([
        { id: 1, title: "Laws of Thermodynamics", video: true, quiz: true },
        { id: 2, title: "Entropy and Disorder", video: true, quiz: false },
        { id: 3, title: "Steam Tables & Charts", video: false, quiz: true },
    ]);

    // Labs State
    const [selectedLabs, setSelectedLabs] = useState<string[]>(["1"]);
    const [labOpen, setLabOpen] = useState(false);

    // Handlers
    const handleAddTopic = () => {
        const newId = Math.max(...topics.map(t => t.id), 0) + 1;
        setTopics([...topics, { id: newId, title: "New Topic", video: false, quiz: false }]);
    };

    const toggleTopicItem = (id: number, type: 'video' | 'quiz') => {
        setTopics(topics.map(t => t.id === id ? { ...t, [type]: !t[type] } : t));
    };

    const removeTopic = (id: number) => {
        setTopics(topics.filter(t => t.id !== id));
    };

    const toggleLab = (labId: string) => {
        setSelectedLabs(prev =>
            prev.includes(labId) ? prev.filter(id => id !== labId) : [...prev, labId]
        );
    };

    const handleSave = () => {
        console.log("Saving course:", { ...course, topics, selectedLabs });
        navigate("/admin/courses");
    };

    return (
        <main className="w-full max-w-7xl mx-auto px-8 py-8">
            {/* Header */}
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
                    <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">Edit Course</h1>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-70">Curriculum & Configuration</p>
                </div>
                <div className="ml-auto">
                    <Button
                        onClick={handleSave}
                        className="h-10 px-6 rounded-xl font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-foreground bg-primary text-primary-foreground hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                    >
                        SAVE CHANGES
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Course Details & Topics */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Course Details */}
                    <Card className="border-2 border-foreground rounded-3xl bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <CardHeader className="p-8 pb-4">
                            <CardTitle className="text-lg font-black uppercase tracking-tight">Core Metadata</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-2 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Course Title</Label>
                                <Input
                                    value={course.title}
                                    onChange={e => setCourse({ ...course, title: e.target.value })}
                                    className="h-12 border-2 border-foreground/10 rounded-xl font-bold bg-muted/5 focus-visible:ring-primary/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Description</Label>
                                <Textarea
                                    value={course.description}
                                    onChange={e => setCourse({ ...course, description: e.target.value })}
                                    className="min-h-[120px] border-2 border-foreground/10 rounded-xl font-bold p-4 bg-muted/5 focus-visible:ring-primary/20 resize-none"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Topics List */}
                    <Card className="border-2 border-foreground rounded-3xl bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between border-b-2 border-foreground/5 bg-muted/5">
                            <CardTitle className="text-lg font-black uppercase tracking-tight">Curriculum Topics</CardTitle>
                            <Button
                                onClick={handleAddTopic}
                                size="sm"
                                className="h-8 rounded-lg font-bold text-xs border-2 border-foreground bg-white text-foreground hover:bg-muted shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <Plus className="mr-1 h-3 w-3" /> ADD TOPIC
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y-2 divide-foreground/5">
                                {topics.map((topic) => (
                                    <div key={topic.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-muted/5 transition-colors group">
                                        <div className="p-2 cursor-grab active:cursor-grabbing text-muted-foreground/30 hover:text-foreground">
                                            <GripVertical className="h-4 w-4" />
                                        </div>

                                        <div className="flex-1 w-full space-y-2">
                                            <Input
                                                value={topic.title}
                                                onChange={(e) => setTopics(topics.map(t => t.id === topic.id ? { ...t, title: e.target.value } : t))}
                                                className="h-8 border-transparent hover:border-foreground/10 focus:border-primary/20 bg-transparent px-0 font-bold text-sm"
                                            />
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => toggleTopicItem(topic.id, 'video')}
                                                    className={cn(
                                                        "h-7 text-[10px] font-bold uppercase tracking-wide gap-1.5 rounded-md border-2",
                                                        topic.video
                                                            ? "border-primary/20 bg-primary/10 text-primary hover:bg-primary/20"
                                                            : "border-dotted text-muted-foreground hover:text-foreground"
                                                    )}
                                                >
                                                    <Video className="h-3 w-3" /> {topic.video ? "Video Linked" : "Add Video"}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => toggleTopicItem(topic.id, 'quiz')}
                                                    className={cn(
                                                        "h-7 text-[10px] font-bold uppercase tracking-wide gap-1.5 rounded-md border-2",
                                                        topic.quiz
                                                            ? "border-orange-500/20 bg-orange-500/10 text-orange-600 hover:bg-orange-500/20"
                                                            : "border-dotted text-muted-foreground hover:text-foreground"
                                                    )}
                                                >
                                                    <FileQuestion className="h-3 w-3" /> {topic.quiz ? "Quiz Active" : "Add Quiz"}
                                                </Button>
                                            </div>
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeTopic(topic.id)}
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                {topics.length === 0 && (
                                    <div className="p-12 text-center text-muted-foreground font-bold uppercase tracking-widest text-xs">
                                        No topics defined.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">

                    {/* Category Selector */}
                    <Card className="border-2 border-foreground rounded-3xl bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <CardHeader className="p-6 border-b-2 border-foreground/5 bg-muted/5">
                            <CardTitle className="text-sm font-black uppercase tracking-tight">Category</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <Select
                                value={course.category}
                                onValueChange={(val) => setCourse({ ...course, category: val })}
                            >
                                <SelectTrigger className="h-12 border-2 border-foreground/10 rounded-xl font-bold bg-muted/5 focus:ring-primary/20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    {MOCK_CATEGORIES.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.name} className="font-bold cursor-pointer">
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    {/* Lab Assignment */}
                    <Card className="border-2 border-foreground rounded-3xl bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <CardHeader className="p-6 border-b-2 border-foreground/5 bg-muted/5">
                            <CardTitle className="text-sm font-black uppercase tracking-tight">Lab Integration</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <Popover open={labOpen} onOpenChange={setLabOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={labOpen}
                                        className="w-full h-12 justify-between border-2 border-foreground/10 rounded-xl font-bold bg-muted/5 hover:bg-muted/10 text-left"
                                    >
                                        <span className="truncate">
                                            {selectedLabs.length > 0
                                                ? `${selectedLabs.length} labs selected`
                                                : "Select labs..."}
                                        </span>
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0 rounded-xl border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <Command>
                                        <CommandInput placeholder="Search labs..." className="font-bold" />
                                        <CommandList>
                                            <CommandEmpty>No labs found.</CommandEmpty>
                                            <CommandGroup>
                                                {MOCK_LABS.map((lab) => (
                                                    <CommandItem
                                                        key={lab.id}
                                                        value={lab.name}
                                                        onSelect={() => toggleLab(lab.id)}
                                                        className="cursor-pointer font-bold"
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                selectedLabs.includes(lab.id) ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {lab.name}
                                                        <span className="ml-auto text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">
                                                            {lab.code}
                                                        </span>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            {/* Selected Labs Tags */}
                            <div className="flex flex-wrap gap-2">
                                {selectedLabs.map(labId => {
                                    const lab = MOCK_LABS.find(l => l.id === labId);
                                    if (!lab) return null;
                                    return (
                                        <Badge
                                            key={labId}
                                            variant="secondary"
                                            className="px-2 py-1 h-auto rounded-lg border-2 border-foreground/5 bg-background font-bold text-[10px] uppercase tracking-wide gap-1 pr-1"
                                        >
                                            {lab.code}
                                            <button
                                                onClick={() => toggleLab(labId)}
                                                className="ml-1 hover:text-destructive focus:outline-none"
                                            >
                                                <div className="h-3 w-3 rounded-full bg-foreground/10 flex items-center justify-center">
                                                    <span className="sr-only">Remove</span>
                                                    <Check className="h-2 w-2 opacity-0 hover:opacity-100" />
                                                    {/* Using a simple x would be better, but re-using check logic for now or simple empty div */}
                                                    <Trash2 className="h-2 w-2" />
                                                </div>
                                            </button>
                                        </Badge>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </main>
    );
}
