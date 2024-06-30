import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { FaStarHalfAlt } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const schema = z.object({
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
  comment: z.string().min(1, 'Comment is required'),
});

const ReviewForm = ({ serviceId }) => {
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
      await addDoc(collection(db, 'reviews'), {
        ...data,
        serviceId,
        createdAt: new Date(),
      });
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit review');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label htmlFor="rating">Rating</Label>
        <Input id="rating" type="number" {...register('rating')} />
        {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
      </div>
      <div className="mb-4">
        <Label htmlFor="comment">Comment</Label>
        <Textarea id="comment" {...register('comment')} />
        {errors.comment && <p className="text-red-500">{errors.comment.message}</p>}
      </div>
      <Button type="submit" disabled={loading}><FaStarHalfAlt /> Submit Review</Button>
    </form>
  );
};

export default ReviewForm;