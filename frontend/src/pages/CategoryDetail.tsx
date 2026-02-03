import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { MOCK_CATEGORIES, MOCK_COURSES } from '@/api/mockData';

export default function CategoryDetailPage() {
    const { slug } = useParams();
    const category = MOCK_CATEGORIES.find(c => c.slug === slug);
    const courses = MOCK_COURSES.filter(c => c.category_id === category?.id);

    if (!category) return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-black mb-4">Category not found</h1>
            <Button asChild>
                <Link to="/categories">Back to Categories</Link>
            </Button>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="bg-primary/5 border-b-4 border-foreground py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <Button variant="ghost" asChild className="mb-8 -ml-4 font-black hover:bg-muted rounded-xl">
                        <Link to="/categories">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Categories
                        </Link>
                    </Button>
                    <h1 className="text-5xl sm:text-7xl font-black text-foreground mb-6 underline decoration-primary underline-offset-8">
                        {category.name}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl font-bold leading-relaxed">
                        {category.description}
                    </p>
                </div>
            </div>

            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <div key={course.id} className="group flex flex-col overflow-hidden rounded-3xl bg-card border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                <div className="aspect-video w-full relative bg-muted/20 border-b-4 border-foreground">
                                    <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="flex flex-1 flex-col p-8">
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-black mb-3">{course.title}</h3>
                                        <p className="text-sm font-bold text-muted-foreground line-clamp-2">{course.description}</p>
                                    </div>
                                    <Button asChild className="w-full h-14 rounded-2xl font-black text-lg border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                                        <Link to={`/courses/${course.id}`}>
                                            Start Learning <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-2xl font-black text-muted-foreground italic">No courses available in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}