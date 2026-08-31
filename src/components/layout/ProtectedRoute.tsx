import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { hasPermission, hasRole } from '../../utils/permissions';
import type { Permission } from '../../types';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: Permission;
  requiredRoles?: string[];
}

export function ProtectedRoute({
  children,
  requiredPermission,
  requiredRoles,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-gov-gold-light">
        Caricamento in corso...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (requiredPermission && !hasPermission(user, requiredPermission)) {
    return <Navigate to="/" replace />;
  }

  if (requiredRoles && !hasRole(user, ...requiredRoles)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
