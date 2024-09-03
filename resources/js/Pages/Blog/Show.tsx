import React from 'react';
import Layout from '@/Layouts/Layout';

interface BlogPost {
  title: string;
  content: string;
  published_at: string;
}

interface Props {
  post: BlogPost;
}

const BlogShow: React.FC<Props> = ({ post }) => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
        <p className="text-gray-500 mb-4">
          Pubblicato il {new Date(post.published_at).toLocaleDateString()}
        </p>
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </Layout>
  );
};

export default BlogShow;