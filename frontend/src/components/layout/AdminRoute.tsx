interface AdminRouteProps {
    children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
    // Access is now open since login/signup were removed
    return <>{children}</>;
};
