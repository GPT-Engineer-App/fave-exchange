import React from 'react';
import { Button } from '@/components/ui/button';
import { FaTasks } from 'react-icons/fa';

const ServiceRequestList = ({ requests, onAccept, onDecline }) => {
  return (
    <div>
      <h2 className="text-2xl mb-4"><FaTasks /> Service Requests</h2>
      {requests.map((request) => (
        <div key={request.id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl"><FaTasks /> Service Request</h2>
          <p><strong>Date:</strong> {request.date}</p>
          <p><strong>Time:</strong> {request.time}</p>
          <p><strong>Details:</strong> {request.details}</p>
          <Button onClick={() => onAccept(request.id)}>Accept</Button>
          <Button variant="destructive" onClick={() => onDecline(request.id)}>Decline</Button>
        </div>
      ))}
    </div>
  );
};

export default ServiceRequestList;