import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaQuoteLeft } from 'react-icons/fa';

export const TestimonialCard = ({ name, testimonial }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <FaQuoteLeft /> <p>{testimonial}</p>
      </CardContent>
    </Card>
  );
};