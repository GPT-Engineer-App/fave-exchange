import React from 'react';
import { Button } from '@/components/ui/button';

const ServiceList = ({ services, onEdit, onDelete, featuredServices }) => {
  return (
    <div>
      {featuredServices && featuredServices.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl mb-4">Featured Services</h2>
          {featuredServices.map((service) => (
            <div key={service.id} className="mb-4 p-4 border rounded">
              <h2 className="text-xl">{service.title}</h2>
              <p>{service.description}</p>
              <p><strong>Category:</strong> {service.category}</p>
              <p><strong>Tags:</strong> {service.tags}</p>
              <Button onClick={() => onEdit(service)}>Edit</Button>
              <Button variant="destructive" onClick={() => onDelete(service.id)}>Delete</Button>
            </div>
          ))}
        </div>
      )}
      <div>
        {services.map((service) => (
          <div key={service.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl">{service.title}</h2>
            <p>{service.description}</p>
            <p><strong>Category:</strong> {service.category}</p>
            <p><strong>Tags:</strong> {service.tags}</p>
            <Button onClick={() => onEdit(service)}>Edit</Button>
            <Button variant="destructive" onClick={() => onDelete(service.id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;