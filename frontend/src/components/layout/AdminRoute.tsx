import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface AdminRouteProps {
    children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
    const { user, loading } = useAuth();
    
    console.log('AdminRoute - User:', user, 'Loading:', loading);
    
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    // Check if user has admin role (adjust based on your user structure)
    if (user.role !== 'admin') {
        console.log('User is not admin, redirecting to courses');
        return <Navigate to="/courses" replace />;
    }
    
    console.log('Admin access granted');
    return <>{children}</>;
};
