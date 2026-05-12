import { useAuth } from './AuthProvider';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';

export function LoginButton() {
  const { user, loading, signIn, logout } = useAuth();

  if (loading) {
    return (
      <div className="h-10 w-32 bg-gray-100 animate-pulse rounded-lg"></div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName || 'User'} 
              className="w-6 h-6 rounded-full"
              referrerPolicy="no-referrer"
            />
          ) : (
            <UserIcon size={16} className="text-white/60" />
          )}
          <span className="text-sm font-medium text-white/80 hidden sm:inline">
            {user.displayName?.split(' ')[0]}
          </span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white/50 hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={signIn}
      className="flex items-center gap-2 px-6 py-2 bg-blue-600/90 backdrop-blur-sm text-white rounded-lg font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
    >
      <LogIn size={18} />
      Entrar com Google
    </button>
  );
}
