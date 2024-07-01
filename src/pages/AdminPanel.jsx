import React, { useState, useEffect } from 'react';
import { FaUserShield, FaServicestack, FaMoneyCheckAlt, FaStarHalfAlt } from 'react-icons/fa';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'react-toastify';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();

      const usersSnapshot = await getDocs(collection(db, 'users'));
      setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const servicesSnapshot = await getDocs(collection(db, 'services'));
      setServices(servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const transactionsSnapshot = await getDocs(collection(db, 'transactions'));
      setTransactions(transactionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const reviewsSnapshot = await getDocs(collection(db, 'reviews'));
      setReviews(reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  const handleDelete = async (collectionName, id) => {
    const db = getFirestore();
    await deleteDoc(doc(db, collectionName, id));
    toast.success('Deleted successfully!');
    // Refresh data
    const fetchData = async () => {
      const db = getFirestore();

      const usersSnapshot = await getDocs(collection(db, 'users'));
      setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const servicesSnapshot = await getDocs(collection(db, 'services'));
      setServices(servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const transactionsSnapshot = await getDocs(collection(db, 'transactions'));
      setTransactions(transactionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const reviewsSnapshot = await getDocs(collection(db, 'reviews'));
      setReviews(reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  };

  return (
    <div className="spacing-md">
      <h1 className="text-3xl mb-4">Admin Panel</h1>
      <Tabs defaultValue="users">
        <TabsList className="spacing-y-sm">
          <TabsTrigger value="users" className="spacing-y-xs"><FaUserShield /> Users</TabsTrigger>
          <TabsTrigger value="services" className="spacing-y-xs"><FaServicestack /> Services</TabsTrigger>
          <TabsTrigger value="transactions" className="spacing-y-xs"><FaMoneyCheckAlt /> Transactions</TabsTrigger>
          <TabsTrigger value="reviews" className="spacing-y-xs"><FaStarHalfAlt /> Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Table className="spacing-y-sm">
            <TableHeader>
              <TableRow className="spacing-y-xs">
                <TableHead>ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id} className="spacing-y-xs">
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleDelete('users', user.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="services">
          <Table className="spacing-y-sm">
            <TableHeader>
              <TableRow className="spacing-y-xs">
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map(service => (
                <TableRow key={service.id} className="spacing-y-xs">
                  <TableCell>{service.id}</TableCell>
                  <TableCell>{service.title}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleDelete('services', service.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="transactions">
          <Table className="spacing-y-sm">
            <TableHeader>
              <TableRow className="spacing-y-xs">
                <TableHead>ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map(transaction => (
                <TableRow key={transaction.id} className="spacing-y-xs">
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="reviews">
          <Table className="spacing-y-sm">
            <TableHeader>
              <TableRow className="spacing-y-xs">
                <TableHead>ID</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map(review => (
                <TableRow key={review.id} className="spacing-y-xs">
                  <TableCell>{review.id}</TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>{review.comment}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleDelete('reviews', review.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;