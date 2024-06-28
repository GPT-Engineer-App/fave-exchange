import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().optional(),
});

const ServiceForm = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register('title')} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register('description')} />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>
      <div className="mb-4">
        <Label htmlFor="category">Category</Label>
        <Input id="category" {...register('category')} />
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
      </div>
      <div className="mb-4">
        <Label htmlFor="tags">Tags</Label>
        <Input id="tags" {...register('tags')} />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ServiceForm;