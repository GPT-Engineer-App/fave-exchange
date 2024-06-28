import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
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

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const db = getFirestore();
      await addDoc(collection(db, 'messages'), {
        ...data,
        sender: currentUser.email,
        createdAt: new Date(),
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
      <Button type="submit" disabled={loading}>Send Message</Button>
    </form>
  );
};

export default MessageForm;