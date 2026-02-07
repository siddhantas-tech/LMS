import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { generateDevToken } from '@/api/auth';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleDevLogin = async (role: string) => {
        setLoading(true);
        try {
            const response = await generateDevToken(role);
            const token = response.data.token;
            const userData = {
                username: `dev-${role}`,
                role: role,
                name: `Dev ${role.charAt(0).toUpperCase() + role.slice(1)}`
            };
            login(token, userData);
            window.location.href = role === 'admin' ? '/admin' : '/courses';
        } catch (error) {
            console.error('Dev login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6">Development Login</h2>
                <div className="space-y-4">
                    <button
                        onClick={() => handleDevLogin('admin')}
                        disabled={loading}
                        className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login as Admin'}
                    </button>
                    <button
                        onClick={() => handleDevLogin('user')}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login as User'}
                    </button>
                </div>
                <p className="mt-6 text-sm text-gray-600 text-center">
                    This is a development environment. Use these buttons to test different user roles.
                </p>
            </div>
        </div>
    );
};

export default Login;
