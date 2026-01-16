import { useSeoMeta } from '@unhead/react';
import { PublishArticleForm } from '@/components/blog/PublishArticleForm';
import { useNavigate } from 'react-router-dom';

const PublishPage = () => {
  const navigate = useNavigate();

  useSeoMeta({
    title: 'Publish Article - Derek & Me Chronicles',
    description: 'Publish a new article to the Derek & Me Chronicles blog.',
  });

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Publish Article</h1>
          <p className="text-gray-400">
            Share your thoughts and chronicles with the world
          </p>
        </div>

        <PublishArticleForm onSuccess={() => navigate('/')} />
      </div>
    </div>
  );
};

export default PublishPage;
