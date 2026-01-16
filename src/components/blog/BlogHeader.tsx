import { useCurrentUser } from '@/hooks/useCurrentUser';
import { usePublishBlogArticle } from '@/hooks/usePublishBlogArticle';
import { Button } from '@/components/ui/button';
import { LoginArea } from '@/components/auth/LoginArea';
import { PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BlogHeader() {
  const { user } = useCurrentUser();
  const { isAuthorized } = usePublishBlogArticle();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-4">
          {/* Header Content */}
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Derek & Me Chronicles
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Chronicles of things we're building and talking about
            </p>
          </div>

          {/* Auth Section */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4">
              {isAuthorized && user && (
                <>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {user.metadata?.name || 'Anonymous'} (Editor)
                  </div>
                  <Link to="/publish">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                      <PenTool className="w-4 h-4" />
                      Write Article
                    </Button>
                  </Link>
                </>
              )}
            </div>
            {!user && <LoginArea className="max-w-xs" />}
          </div>
        </div>
      </div>
    </header>
  );
}
