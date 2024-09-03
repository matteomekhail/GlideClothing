import React from 'react';
import { Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  published_at: string;
}

interface Props {
  posts: {
    data: BlogPost[];
  };
}

const BlogIndex: React.FC<Props> = ({ posts }) => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <div className="space-y-4">
          {posts.data.map((post) => (
            <div key={post.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  <Link href={route('blog.show', post.slug)}>{post.title}</Link>
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Pubblicato il {new Date(post.published_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BlogIndex;