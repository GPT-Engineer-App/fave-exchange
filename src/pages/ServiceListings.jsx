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
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../components/AuthProvider';
import * as tf from '@tensorflow/tfjs';
import { FaListAlt, FaFilter, FaSort, FaMapMarkerAlt } from 'react-icons/fa';

const ServiceListings = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [featuredServices, setFeaturedServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [availability, setAvailability] = useState(false);
  const [location, setLocation] = useState([51.505, -0.09]);
  const [recommendedServices, setRecommendedServices] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Fetch or set featured services here
    setFeaturedServices([
      // Example featured services
      { id: uuidv4(), title: 'Featured Service 1', description: 'Description 1', category: 'Category1', tags: 'tag1, tag2', price: 50, available: true, location: [51.505, -0.09] },
      { id: uuidv4(), title: 'Featured Service 2', description: 'Description 2', category: 'Category2', tags: 'tag3, tag4', price: 75, available: false, location: [51.515, -0.1] },
    ]);
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchRecommendedServices(currentUser.uid);
    }
  }, [currentUser]);

  const fetchRecommendedServices = async (userId) => {
    const db = getFirestore();
    const userBehaviorRef = collection(db, 'userBehavior');
    const q = query(userBehaviorRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const userBehaviorData = querySnapshot.docs.map(doc => doc.data());

    // Assuming userBehaviorData contains an array of user interactions
    const recommendations = generateRecommendations(userBehaviorData);
    setRecommendedServices(recommendations);
  };

  const generateRecommendations = (userBehaviorData) => {
    // Placeholder for the recommendation algorithm
    // This is where you would use TensorFlow.js or another ML library to generate recommendations
    // For simplicity, we'll just return a subset of services as recommendations
    return services.slice(0, 3);
  };

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
    .filter(service => 
      service.price >= priceRange[0] && service.price <= priceRange[1]
    )
    .filter(service => 
      availability ? service.available === availability : true
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
      <h1 className="text-3xl mb-4"><FaListAlt /> Service Listings</h1>
      <div className="mb-4">
        <Label htmlFor="search">Search</Label>
        <Input id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="mb-4">
        <Label htmlFor="filter"><FaFilter /> Filter by Category</Label>
        <Select id="filter" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Category1">Category1</option>
          <option value="Category2">Category2</option>
          {/* Add more categories as needed */}
        </Select>
      </div>
      <div className="mb-4">
        <Label htmlFor="sort"><FaSort /> Sort by</Label>
        <Select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">None</option>
          <option value="title">Title</option>
          <option value="category">Category</option>
        </Select>
      </div>
      <div className="mb-4">
        <Label htmlFor="price-range">Price Range</Label>
        <Slider id="price-range" value={priceRange} onChange={setPriceRange} max={100} step={1} />
        <div>Price: {priceRange[0]} - {priceRange[1]}</div>
      </div>
      <div className="mb-4">
        <Label htmlFor="availability">Availability</Label>
        <Checkbox id="availability" checked={availability} onChange={(e) => setAvailability(e.target.checked)} />
      </div>
      <ServiceForm
        onSubmit={editingService ? handleEditService : handleAddService}
        defaultValues={editingService || { title: '', description: '', category: '', tags: '', price: 0, available: false, location: [51.505, -0.09] }}
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
      <div className="mt-4">
        <h2 className="text-2xl mb-4">Recommended Services</h2>
        <ServiceList
          services={recommendedServices}
          onEdit={(service) => {
            setEditingService(service);
            setSelectedServiceId(service.id);
          }}
          onDelete={handleDeleteService}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-2xl mb-4"><FaMapMarkerAlt /> Map View</h2>
        <MapContainer center={location} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredServices.map(service => (
            <Marker key={service.id} position={service.location}>
              <Popup>
                <strong>{service.title}</strong><br />
                {service.description}<br />
                Price: {service.price}<br />
                {service.available ? 'Available' : 'Not Available'}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ServiceListings;