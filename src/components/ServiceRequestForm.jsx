import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-toastify';

const schema = z.object({
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  details: z.string().min(1, 'Additional details are required'),
});

const ServiceRequestForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    toast.success('Service request submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mb-4">
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" {...register('date')} />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
      </div>
      <div className="mb-4">
        <Label htmlFor="time">Time</Label>
        <Input id="time" type="time" {...register('time')} />
        {errors.time && <p className="text-red-500">{errors.time.message}</p>}
      </div>
      <div className="mb-4">
        <Label htmlFor="details">Additional Details</Label>
        <Textarea id="details" {...register('details')} />
        {errors.details && <p className="text-red-500">{errors.details.message}</p>}
      </div>
      <Button type="submit">Submit Request</Button>
    </form>
  );
};

export default ServiceRequestForm;