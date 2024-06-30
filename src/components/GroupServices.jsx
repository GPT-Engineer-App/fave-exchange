import React, { useState, useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const GroupServices = () => {
  const { currentUser } = useAuth();
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'groupServices'));
      const servicesData = querySnapshot.docs.map(doc => doc.data());
      setServices(servicesData);
    };

    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    await addDoc(collection(db, 'groupServices'), {
      title,
      description,
      date,
      time,
      organizer: currentUser.email,
      createdAt: new Date(),
    });
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    const querySnapshot = await getDocs(collection(db, 'groupServices'));
    const servicesData = querySnapshot.docs.map(doc => doc.data());
    setServices(servicesData);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4"><FaUsers /> Group Services</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="time">Time</Label>
          <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <Button type="submit">Create Service</Button>
      </form>
      <div className="mt-8">
        <h3 className="text-xl mb-4">Upcoming Services</h3>
        {services.map((service, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <h4 className="text-lg">{service.title}</h4>
            <p>{service.description}</p>
            <p><strong>Date:</strong> {service.date}</p>
            <p><strong>Time:</strong> {service.time}</p>
            <p><strong>Organizer:</strong> {service.organizer}</p>
            <p><strong>Date Created:</strong> {new Date(service.createdAt.seconds * 1000).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupServices;