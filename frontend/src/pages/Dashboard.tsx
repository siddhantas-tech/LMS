import { Navbar } from "@/components/layout/Navbar";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Award, Zap } from "lucide-react";

// Generate some fake activity data
const generateMockActivity = () => {
    const data = [];
    const today = new Date();
    for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        data.push({
            date: d.toISOString().split('T')[0],
            count: Math.floor(Math.random() * 8), // 0 to 7 activities
        });
    }
    return data;
};

export default function DashboardPage() {
    const activityData = generateMockActivity();

    const stats = [
        { title: "Courses Enrolled", value: "12", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Completed Topics", value: "48", icon: GraduationCap, color: "text-green-500", bg: "bg-green-500/10" },
        { title: "Certificates Earned", value: "3", icon: Award, color: "text-purple-500", bg: "bg-purple-500/10" },
        { title: "Learning Streak", value: "15 Days", icon: Zap, color: "text-orange-500", bg: "bg-orange-500/10" },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
                {/* Welcome Header */}
                <div className="space-y-4">
                    <h1 className="text-4xl sm:text-6xl font-black text-gradient tracking-tight">Student Dashboard</h1>
                    <p className="text-lg font-medium text-muted-foreground max-w-2xl">
                        Track your progress, manage your courses, and see your learning activity.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <Card key={i} className="border-border/5 bg-card overflow-hidden group hover:shadow-xl transition-all rounded-3xl">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                                        <stat.icon className="h-6 w-6" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-muted-foreground font-bold text-sm uppercase tracking-wider">{stat.title}</h3>
                                    <p className="text-3xl font-black mt-1">{stat.value}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Learning Activity Heatmap */}
                <Card className="border-border/5 bg-card rounded-[2.5rem] shadow-xl overflow-hidden">
                    <CardHeader className="p-10 pb-0 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-3xl font-black">Learning Activity</CardTitle>
                            <p className="text-muted-foreground font-bold italic">Your daily engagement over the past year</p>
                        </div>
                        <Badge variant="outline" className="h-10 px-4 rounded-xl border-2 border-primary/20 text-primary font-black">
                            LIVE DATA
                        </Badge>
                    </CardHeader>
                    <CardContent className="p-10 pt-6 overflow-x-auto">
                        <ActivityHeatmap data={activityData} />
                    </CardContent>
                </Card>

                {/* Recent Courses Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="rounded-[2rem] border-border/5 bg-card p-10">
                        <h3 className="text-2xl font-black mb-6">Continue Learning</h3>
                        <div className="space-y-4 text-center py-12">
                            <p className="text-muted-foreground font-bold">You are currently in the middle of "Advanced Electronics Design"</p>
                        </div>
                    </Card>
                    <Card className="rounded-[2rem] border-border/5 bg-card p-10">
                        <h3 className="text-2xl font-black mb-6">Upcoming Quizzes</h3>
                        <div className="space-y-4 text-center py-12">
                            <p className="text-muted-foreground font-bold">No quizzes scheduled for this week. Keep up the great work!</p>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}
