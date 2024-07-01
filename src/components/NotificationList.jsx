import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthProvider';
import { FaBell } from 'react-icons/fa';

const NotificationList = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const db = getFirestore();
      const q = query(collection(db, 'notifications'), where('recipient', '==', currentUser.email));
      const querySnapshot = await getDocs(q);
      const notificationsData = querySnapshot.docs.map(doc => doc.data());
      setNotifications(notificationsData);
    };

    fetchNotifications();
  }, [currentUser]);

  return (
    <div className="spacing-md">
      <h2 className="text-2xl mb-4"><FaBell /> Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className="mb-4 p-4 border rounded spacing-y-xs">
            <p><strong>Type:</strong> {notification.type}</p>
            <p><strong>Message:</strong> {notification.message}</p>
            <p><strong>Date:</strong> {new Date(notification.createdAt.seconds * 1000).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No notifications yet.</p>
      )}
    </div>
  );
};

export default NotificationList;