import React, { useEffect, useState } from 'react';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { getFirestore, collection, query, where, getDocs, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from './AuthProvider';

const MessageList = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const db = getFirestore();
      const q = query(collection(db, 'messages'), where('recipient', '==', currentUser.email));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(messagesData);
      });

      return unsubscribe;
    };

    fetchMessages();
  }, [currentUser]);

  useEffect(() => {
    const handleTyping = async () => {
      const db = getFirestore();
      const userDoc = doc(db, 'users', currentUser.uid);
      await updateDoc(userDoc, { typing });
    };

    handleTyping();
  }, [typing, currentUser]);

  const handleReadReceipt = async (messageId) => {
    const db = getFirestore();
    const messageDoc = doc(db, 'messages', messageId);
    await updateDoc(messageDoc, { read: true });
  };

  return (
    <div>
      <h2 className="text-2xl mb-4"><FaEnvelopeOpenText /> Messages</h2>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index} className="mb-4 p-4 border rounded" onClick={() => handleReadReceipt(message.id)}>
            <p><strong>From:</strong> {message.sender}</p>
            <p><strong>Message:</strong> {message.message}</p>
            {message.files && message.files.map((file, idx) => (
              <div key={idx}>
                <p><strong>File:</strong> {file.name}</p>
                <p><strong>Type:</strong> {file.type}</p>
                <p><strong>Size:</strong> {file.size} bytes</p>
              </div>
            ))}
            <p><strong>Date:</strong> {new Date(message.createdAt.seconds * 1000).toLocaleDateString()}</p>
            {message.read ? <p className="text-green-500">Read</p> : <p className="text-red-500">Unread</p>}
          </div>
        ))
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
};

export default MessageList;