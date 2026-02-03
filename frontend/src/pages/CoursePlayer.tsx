import { useState, useRef, useEffect } from 'react'
import { Play, CheckCircle, Clock, Lock, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/layout/Navbar'
import { LessonQuizModal } from '@/components/course/lesson-quiz-modal'

// Mock data internal to this page for simulation
const MOCK_TOPICS = [
    {
        id: '1',
        title: 'Welcome to the Course',
        duration: 5,
        completed: false,
        isLocked: false,
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        description: 'A quick introduction to what you will learn in this module.',
        questions: [
            {
                id: 'q1',
                question: 'What is the main focus of this module?',
                options: [
                    'Introduction and Basics',
                    'Advanced Techniques',
                    'Final Project',
                ],
                correctAnswer: 0,
            }
        ]
    },
    {
        id: '2',
        title: 'Module 1: Fundamental Concepts',
        duration: 15,
        completed: false,
        isLocked: true,
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        description: 'Deep dive into the core principles and fundamental concepts.',
        questions: [
            {
                id: 'q2',
                question: 'Why is this concept important?',
                options: [
                    'It creates a solid foundation',
                    'It is just a theory',
                    'No reason',
                ],
                correctAnswer: 0,
            }
        ]
    }
]

export default function CoursePlayerPage() {
    const [topics, setTopics] = useState(MOCK_TOPICS)
    const [currentTopicId, setCurrentTopicId] = useState(MOCK_TOPICS[0].id)
    const [isVideoEnded, setIsVideoEnded] = useState(false)
    const [showQuizPrompt, setShowQuizPrompt] = useState(false)
    const [isQuizOpen, setIsQuizOpen] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const currentTopic = topics.find((t) => t.id === currentTopicId)

    // Enforce playback rules
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const enforcePlaybackRate = () => {
            if (video.playbackRate !== 1.0) {
                video.playbackRate = 1.0
            }
        }

        video.addEventListener('ratechange', enforcePlaybackRate)
        video.playbackRate = 1.0

        const preventSeek = (e: Event) => {
            // In a real app, you'd track the max time watched and prevent seeking beyond that
            // For this demo, we let users browse but the code provided wanted to enforce strictness
            // console.log("Seeking event triggered", e);
        }

        video.addEventListener('seeking', preventSeek)

        return () => {
            video.removeEventListener('ratechange', enforcePlaybackRate)
            video.removeEventListener('seeking', preventSeek)
        }
    }, [currentTopic])

    const handleVideoEnd = () => {
        setIsVideoEnded(true)
        if (currentTopic?.questions && currentTopic.questions.length > 0) {
            setIsQuizOpen(true)
        } else {
            setShowQuizPrompt(true)
        }
    }

    const handleTopicClick = (topicId: string) => {
        const topic = topics.find((t) => t.id === topicId)
        if (!topic?.isLocked) {
            setCurrentTopicId(topicId)
            setIsVideoEnded(false)
            setShowQuizPrompt(false)
        }
    }

    const handleQuizSubmit = async (score: number) => {
        if (score >= 70) {
            const currentIndex = topics.findIndex(t => t.id === currentTopicId)
            const newTopics = [...topics]

            newTopics[currentIndex] = { ...newTopics[currentIndex], completed: true }

            let nextTopicId = null
            if (currentIndex + 1 < newTopics.length) {
                newTopics[currentIndex + 1] = { ...newTopics[currentIndex + 1], isLocked: false }
                nextTopicId = newTopics[currentIndex + 1].id
            }

            setTopics(newTopics)
            setIsQuizOpen(false)

            if (nextTopicId) {
                setCurrentTopicId(nextTopicId)
            }
        } else {
            // Logic for failed quiz handled in modal UI usually, but we close it here
            setIsQuizOpen(false)
        }
    }

    return (
        <div className="bg-background min-h-screen">

            <div className="bg-card shadow-sm border-b border-border/5">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="flex items-center gap-4 mb-4">
                        <Link to="/courses" className="text-muted-foreground hover:text-foreground flex items-center gap-2 font-bold transition-colors">
                            <ArrowLeft className="h-4 w-4" /> Back to Courses
                        </Link>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">Introduction to Manufacturing</h1>
                    <p className="text-muted-foreground font-bold mt-4 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        Progress: {topics.filter(t => t.completed).length} of {topics.length} topics completed
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    <div className="lg:col-span-2 space-y-8">
                        <div className="overflow-hidden bg-black rounded-[2rem] shadow-2xl aspect-video flex items-center justify-center relative ring-1 ring-white/10">
                            {currentTopic ? (
                                <video
                                    key={currentTopic.id}
                                    ref={videoRef}
                                    src={currentTopic.videoUrl}
                                    controls
                                    className="w-full h-full object-cover"
                                    onEnded={handleVideoEnd}
                                    controlsList="nodownload noremoteplayback"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-white/50 gap-4">
                                    <Lock className="h-16 w-16" />
                                    <p className="font-bold text-lg">Select a lesson to start</p>
                                </div>
                            )}
                        </div>

                        {currentTopic && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-3xl font-black text-foreground">{currentTopic.title}</h2>
                                    <div className="flex items-center gap-4 mt-3">
                                        <div className="flex items-center gap-2 text-primary font-bold bg-primary/10 px-3 py-1 rounded-full text-sm">
                                            <Clock className="h-4 w-4" />
                                            <span>{currentTopic.duration} minutes</span>
                                        </div>
                                    </div>
                                </div>

                                {showQuizPrompt && (
                                    <div className="bg-primary/5 rounded-3xl p-8 border-2 border-primary/20 shadow-lg">
                                        <h3 className="font-black text-2xl mb-2">Topic Complete!</h3>
                                        <p className="font-bold text-muted-foreground mb-6">Take the quiz to unlock the next chapter.</p>
                                        <div className="flex gap-4">
                                            <Button onClick={() => setIsQuizOpen(true)} className="h-14 px-8 rounded-2xl font-black text-lg shadow-lg">
                                                Take Topic Quiz
                                            </Button>
                                            <Button variant="outline" onClick={() => setShowQuizPrompt(false)} className="h-14 px-8 rounded-2xl font-black border-2 border-border/10">
                                                Review Video
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                <div className="rounded-[2.5rem] p-10 bg-card border border-border/5 shadow-xl">
                                    <h3 className="text-xl font-black mb-4">About this topic</h3>
                                    <p className="text-muted-foreground leading-relaxed font-semibold text-lg">
                                        {currentTopic.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="rounded-[2.5rem] bg-card shadow-2xl overflow-hidden border border-border/5 sticky top-24">
                            <Tabs defaultValue="content" className="w-full">
                                <TabsList className="w-full h-16 bg-muted/20 p-2 gap-2 border-b border-border/5">
                                    <TabsTrigger value="content" className="flex-1 rounded-2xl font-bold h-full data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all">
                                        Content
                                    </TabsTrigger>
                                    <TabsTrigger value="notes" className="flex-1 rounded-2xl font-bold h-full data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all">
                                        Notes
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="content" className="p-4 space-y-3">
                                    {topics.map((topic, index) => (
                                        <button
                                            key={topic.id}
                                            onClick={() => handleTopicClick(topic.id)}
                                            disabled={topic.isLocked}
                                            className={`w-full text-left p-6 transition-all rounded-3xl group relative overflow-hidden ${currentTopicId === topic.id
                                                ? 'bg-primary text-primary-foreground shadow-xl'
                                                : 'bg-muted/10 hover:bg-muted/20 text-muted-foreground'
                                                } ${topic.isLocked ? 'opacity-40 grayscale' : 'cursor-pointer'}`}
                                        >
                                            <div className="flex items-start gap-4 z-10 relative">
                                                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border-2 ${currentTopicId === topic.id ? 'bg-white/10 border-white/20' : 'bg-background border-border/10'
                                                    }`}>
                                                    {topic.completed ? (
                                                        <CheckCircle className="h-6 w-6" />
                                                    ) : topic.isLocked ? (
                                                        <Lock className="h-6 w-6" />
                                                    ) : (
                                                        <Play className={`h-6 w-6 ${currentTopicId === topic.id ? 'fill-current' : ''}`} />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0 pt-1">
                                                    <p className="font-black text-base truncate">
                                                        {index + 1}. {topic.title}
                                                    </p>
                                                    <p className={`text-sm mt-1 font-bold ${currentTopicId === topic.id ? 'text-white/70' : 'text-muted-foreground'}`}>
                                                        {topic.duration} min
                                                    </p>
                                                </div>
                                            </div>
                                            {currentTopicId === topic.id && (
                                                <div className="absolute top-0 right-0 h-full w-24 bg-white/5 skew-x-[30deg] translate-x-12" />
                                            )}
                                        </button>
                                    ))}
                                </TabsContent>

                                <TabsContent value="notes" className="p-8 text-center">
                                    <div className="py-20 flex flex-col items-center gap-4">
                                        <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center">
                                            <Clock className="h-8 w-8 text-muted-foreground" />
                                        </div>
                                        <p className="font-bold text-muted-foreground">Notes feature coming soon!</p>
                                        <Button variant="outline" className="rounded-xl border-2">Add Note</Button>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>

            {currentTopic && (
                <LessonQuizModal
                    isOpen={isQuizOpen}
                    lessonTitle={currentTopic.title}
                    questions={currentTopic.questions || []}
                    onClose={() => setIsQuizOpen(false)}
                    onSubmit={handleQuizSubmit}
                />
            )}
        </div>
    )
}
