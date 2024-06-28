import React, { useState } from 'react';
import ServiceForm from '../components/ServiceForm';
import ServiceList from '../components/ServiceList';
import { v4 as uuidv4 } from 'uuid';

const ServiceListings = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);

  const handleAddService = (data) => {
    setServices([...services, { ...data, id: uuidv4() }]);
  };

  const handleEditService = (data) => {
    setServices(services.map((service) => (service.id === data.id ? data : service)));
    setEditingService(null);
  };

  const handleDeleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl mb-4">Service Listings</h1>
      <ServiceForm
        onSubmit={editingService ? handleEditService : handleAddService}
        defaultValues={editingService || { title: '', description: '', category: '', tags: '' }}
      />
      <ServiceList
        services={services}
        onEdit={(service) => setEditingService(service)}
        onDelete={handleDeleteService}
      />
    </div>
  );
};

export default ServiceListings;