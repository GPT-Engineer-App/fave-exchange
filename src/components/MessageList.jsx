import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthProvider';

const MessageList = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const db = getFirestore();
      const q = query(collection(db, 'messages'), where('recipient', '==', currentUser.email));
      const querySnapshot = await getDocs(q);
      const messagesData = querySnapshot.docs.map(doc => doc.data());
      setMessages(messagesData);
    };

    fetchMessages();
  }, [currentUser]);

  return (
    <div>
      <h2 className="text-2xl mb-4">Messages</h2>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <p><strong>From:</strong> {message.sender}</p>
            <p><strong>Message:</strong> {message.message}</p>
            <p><strong>Date:</strong> {new Date(message.createdAt.seconds * 1000).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
};

export default MessageList;