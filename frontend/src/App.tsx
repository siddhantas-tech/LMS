import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CoursesPage from './pages/Courses';
import CoursePlayer from './pages/CoursePlayer';
import DashboardPage from './pages/Dashboard';
import CategoriesPage from './pages/Categories';
import CategoryDetailPage from './pages/CategoryDetail';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import './styles/index.css';

const PagePlaceholder = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <h1 className="text-4xl font-bold">{title} Page Coming Soon</h1>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <UserProvider user={null}> {/* You can pass the actual user object here later */}
        <Router>
          <Routes>
            {/* Redirect home to courses, just like your Next.js project did */}
            <Route path="/" element={<Navigate to="/courses" replace />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CoursePlayer />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:slug" element={<CategoryDetailPage />} />
            <Route path="/login" element={<PagePlaceholder title="Login" />} />
            <Route path="/signup" element={<PagePlaceholder title="Signup" />} />
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}
export default App;