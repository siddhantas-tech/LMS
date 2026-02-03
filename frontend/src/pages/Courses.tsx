import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/ui/Button';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_COURSES } from '../api/mockData';

export default function CoursesPage() {
    const courses = MOCK_COURSES; // Later this becomes: const [courses, setCourses] = useState([])

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="space-y-10">
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-6xl font-black text-gradient tracking-tight">All Courses</h1>
                        <p className="text-lg font-medium text-muted-foreground max-w-2xl">
                            Browse our catalog and start your learning journey today.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <div key={course.id} className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                                <div className="aspect-video w-full relative bg-muted/20">
                                    <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="flex flex-1 flex-col p-8">
                                    <div className="mb-6">
                                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-black uppercase rounded-full border-2 border-primary mb-3">
                                            {course.categories.name}
                                        </span>
                                        <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                                    </div>
                                    <Button asChild className="w-full h-14 rounded-2xl font-bold">
                                        <Link to={`/courses/${course.id}`}>
                                            Start Learning <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}