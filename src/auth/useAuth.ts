// auth/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Import AuthContext from its file

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};