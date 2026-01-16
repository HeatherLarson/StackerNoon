import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Button } from '@/components/ui/button';
import { LoginArea } from '@/components/auth/LoginArea';
import { Search, Bell, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BlogHeader() {
  const { user } = useCurrentUser();

  return (
    <>
      {/* Top Bar - Search and Auth */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-xs">
            <div className="relative">
              <input
                type="text"
                placeholder="Discover Anything"
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="ml-4 flex items-center gap-3">
            {user ? (
              <>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" className="text-sm font-medium">
                  Login
                </Button>
                <Button variant="ghost" className="text-sm font-medium">
                  Signup
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header - Logo and Navigation */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="text-3xl font-black">🤖</div>
              <div className="text-2xl font-black">STACKERNOON</div>
            </Link>

            {/* Auth */}
            {!user ? (
              <LoginArea className="max-w-xs" />
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{user.metadata?.name || 'User'}</span>
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center gap-6 text-sm font-bold uppercase tracking-wide">
            <Link to="/" className="hover:opacity-80 transition">
              READ
            </Link>
            <a href="#" className="hover:opacity-80 transition">
              TOP BLOGS
            </a>
            <button className="hover:opacity-80 transition">
              WRITE NOW
            </button>
            <a href="#" className="hover:opacity-80 transition">
              BUSINESS BLOGGING
            </a>
            <a href="#" className="hover:opacity-80 transition">
              COURSES
            </a>
            <a href="#" className="hover:opacity-80 transition">
              ABOUT
            </a>
            <a href="#" className="hover:opacity-80 transition">
              MORE +
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
