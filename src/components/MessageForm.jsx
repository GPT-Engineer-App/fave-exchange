import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { FaPaperPlane } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useDropzone } from 'react-dropzone';
import { useAuth } from './AuthProvider';

const schema = z.object({
  recipient: z.string().min(1, 'Recipient is required'),
  message: z.string().min(1, 'Message is required'),
});

const MessageForm = () => {
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const db = getFirestore();
      await addDoc(collection(db, 'messages'), {
        ...data,
        sender: currentUser.email,
        createdAt: serverTimestamp(),
        files: files.map(file => ({
          name: file.name,
          type: file.type,
          size: file.size,
        })),
      });
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label htmlFor="recipient">Recipient</Label>
        <Input id="recipient" {...register('recipient')} />
        {errors.recipient && <p className="text-red-500">{errors.recipient.message}</p>}
      </div>
      <div className="mb-4">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" {...register('message')} />
        {errors.message && <p className="text-red-500">{errors.message.message}</p>}
      </div>
      <div {...getRootProps()} className="mb-4 border-dashed border-2 p-4">
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
      </div>
      <Button type="submit" disabled={loading}><FaPaperPlane /> Send Message</Button>
    </form>
  );
};

export default MessageForm;