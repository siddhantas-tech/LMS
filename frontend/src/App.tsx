import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CoursesPage from './pages/Courses';
import CoursePlayer from './pages/CoursePlayer';
import { AuthProvider } from './context/AuthContext';
import './styles/index.css';

const PagePlaceholder = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <h1 className="text-4xl font-bold">{title} Page Coming Soon</h1>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirect home to courses, just like your Next.js project did */}
          <Route path="/" element={<Navigate to="/courses" replace />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CoursePlayer />} />
          <Route path="/dashboard" element={<PagePlaceholder title="Dashboard" />} />
          <Route path="/categories" element={<PagePlaceholder title="Categories" />} />
          <Route path="/login" element={<PagePlaceholder title="Login" />} />
          <Route path="/signup" element={<PagePlaceholder title="Signup" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;