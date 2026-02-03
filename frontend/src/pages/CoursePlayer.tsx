const CoursePlayer = () => {
    return (
        <div className="flex h-screen bg-black text-white">
            <div className="flex-1 flex items-center justify-center bg-gray-900">
                <h2 className="text-2xl">Video Player Placeholder</h2>
            </div>
            <div className="w-80 bg-gray-800 p-4 overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">Course Content</h3>
                <ul>
                    <li className="p-2 border-b border-gray-700">Lesson 1: Introduction</li>
                    <li className="p-2 border-b border-gray-700">Lesson 2: Getting Started</li>
                </ul>
            </div>
        </div>
    );
};

export default CoursePlayer;
