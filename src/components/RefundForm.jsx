import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { FaUndo } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const schema = z.object({
  transactionId: z.string().min(1, 'Transaction ID is required'),
  reason: z.string().min(1, 'Reason is required'),
});

const RefundForm = () => {
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
      await addDoc(collection(db, 'refunds'), {
        ...data,
        createdAt: new Date(),
      });
      toast.success('Refund request submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit refund request');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label htmlFor="transactionId">Transaction ID</Label>
        <Input id="transactionId" {...register('transactionId')} />
        {errors.transactionId && <p className="text-red-500">{errors.transactionId.message}</p>}
      </div>
      <div className="mb-4">
        <Label htmlFor="reason">Reason</Label>
        <Input id="reason" {...register('reason')} />
        {errors.reason && <p className="text-red-500">{errors.reason.message}</p>}
      </div>
      <Button type="submit" disabled={loading}><FaUndo /> Submit Refund Request</Button>
    </form>
  );
};

export default RefundForm;