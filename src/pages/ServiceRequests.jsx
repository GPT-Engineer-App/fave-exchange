import React, { useState } from 'react';
import ServiceRequestForm from '../components/ServiceRequestForm';
import ServiceRequestList from '../components/ServiceRequestList';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const ServiceRequests = () => {
  const [requests, setRequests] = useState([]);

  const handleAddRequest = (data) => {
    setRequests([...requests, { ...data, id: uuidv4() }]);
  };

  const handleAcceptRequest = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
    toast.success('Service request accepted!');
  };

  const handleDeclineRequest = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
    toast.error('Service request declined!');
  };

  return (
    <div>
      <h1 className="text-3xl mb-4">Service Requests</h1>
      <ServiceRequestForm onSubmit={handleAddRequest} />
      <ServiceRequestList requests={requests} onAccept={handleAcceptRequest} onDecline={handleDeclineRequest} />
    </div>
  );
};

export default ServiceRequests;