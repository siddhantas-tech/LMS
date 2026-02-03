const Sidebar = () => {
    return (
        <aside className="w-64 border-r h-[calc(100-4rem)] p-4 bg-gray-50">
            <nav className="space-y-1">
                <a href="#" className="block p-2 rounded hover:bg-white hover:shadow-sm transition-all font-medium">
                    Dashboard
                </a>
                <a href="#" className="block p-2 rounded hover:bg-white hover:shadow-sm transition-all font-medium">
                    My Courses
                </a>
                <a href="#" className="block p-2 rounded hover:bg-white hover:shadow-sm transition-all font-medium">
                    Settings
                </a>
            </nav>
        </aside>
    );
};

export default Sidebar;
