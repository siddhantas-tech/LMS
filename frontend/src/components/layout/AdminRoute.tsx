import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface AdminRouteProps {
    children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    
    // Development bypass - allow access without authentication
    if (import.meta.env.DEV) {
        return <>{children}</>;
    }
    
    // Production bypass - allow admin access when backend is down
    // This is a temporary solution for when backend is not responding
    if (!user && import.meta.env.PROD) {
        // Check URL parameter for bypass (temporary)
        const urlParams = new URLSearchParams(window.location.search);
        const bypass = urlParams.get('bypass');
        if (bypass === 'admin') {
            return <>{children}</>;
        }
    }
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    // Check if user has admin role
    if (user.role !== 'admin') {
        return <Navigate to="/courses" replace />;
    }
    
    return <>{children}</>;
};
