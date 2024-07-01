import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaComments } from 'react-icons/fa';

const Forum = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'forumPosts'));
      const postsData = querySnapshot.docs.map(doc => doc.data());
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    await addDoc(collection(db, 'forumPosts'), {
      title,
      content,
      author: currentUser.email,
      createdAt: new Date(),
    });
    setTitle('');
    setContent('');
    const querySnapshot = await getDocs(collection(db, 'forumPosts'));
    const postsData = querySnapshot.docs.map(doc => doc.data());
    setPosts(postsData);
  };

  return (
    <div className="spacing-md">
      <h2 className="text-2xl mb-4"><FaComments /> Forum</h2>
      <form onSubmit={handleSubmit} className="spacing-y-sm">
        <div className="mb-4 spacing-y-xs">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-4 spacing-y-xs">
          <Label htmlFor="content">Content</Label>
          <ReactQuill value={content} onChange={setContent} />
        </div>
        <Button type="submit">Post</Button>
      </form>
      <div className="mt-8 spacing-y-sm">
        <h3 className="text-xl mb-4">Posts</h3>
        {posts.map((post, index) => (
          <div key={index} className="mb-4 p-4 border rounded spacing-y-xs">
            <h4 className="text-lg">{post.title}</h4>
            <p>{post.content}</p>
            <p><strong>Author:</strong> {post.author}</p>
            <p><strong>Date:</strong> {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;