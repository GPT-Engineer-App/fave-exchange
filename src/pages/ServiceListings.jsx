import React, { useState, useEffect } from 'react';
import ServiceForm from '../components/ServiceForm';
import ServiceList from '../components/ServiceList';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const ServiceListings = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [featuredServices, setFeaturedServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  useEffect(() => {
    // Fetch or set featured services here
    setFeaturedServices([
      // Example featured services
      { id: uuidv4(), title: 'Featured Service 1', description: 'Description 1', category: 'Category1', tags: 'tag1, tag2' },
      { id: uuidv4(), title: 'Featured Service 2', description: 'Description 2', category: 'Category2', tags: 'tag3, tag4' },
    ]);
  }, []);

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

  const filteredServices = services
    .filter(service => 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(service => 
      filterCategory ? service.category === filterCategory : true
    )
    .sort((a, b) => {
      if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

  return (
    <div>
      <h1 className="text-3xl mb-4">Service Listings</h1>
      <div className="mb-4">
        <Label htmlFor="search">Search</Label>
        <Input id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="mb-4">
        <Label htmlFor="filter">Filter by Category</Label>
        <Select id="filter" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Category1">Category1</option>
          <option value="Category2">Category2</option>
          {/* Add more categories as needed */}
        </Select>
      </div>
      <div className="mb-4">
        <Label htmlFor="sort">Sort by</Label>
        <Select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">None</option>
          <option value="title">Title</option>
          <option value="category">Category</option>
        </Select>
      </div>
      <ServiceForm
        onSubmit={editingService ? handleEditService : handleAddService}
        defaultValues={editingService || { title: '', description: '', category: '', tags: '' }}
      />
      <ServiceList
        services={filteredServices}
        onEdit={(service) => {
          setEditingService(service);
          setSelectedServiceId(service.id);
        }}
        onDelete={handleDeleteService}
        featuredServices={featuredServices}
      />
      <ReviewForm serviceId={selectedServiceId} />
      <ReviewList serviceId={selectedServiceId} />
    </div>
  );
};

export default ServiceListings;