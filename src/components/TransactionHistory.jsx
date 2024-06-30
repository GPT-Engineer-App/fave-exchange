import React, { useEffect, useState } from 'react';
import { FaHistory } from 'react-icons/fa';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthProvider';

const TransactionHistory = () => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const db = getFirestore();
      const q = query(collection(db, 'transactions'), where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const transactionsData = querySnapshot.docs.map(doc => doc.data());
      setTransactions(transactionsData);
    };

    fetchTransactions();
  }, [currentUser]);

  return (
    <div>
      <h2 className="text-2xl mb-4"><FaHistory /> Transaction History</h2>
      {transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <p><strong>Amount:</strong> {transaction.amount}</p>
            <p><strong>Date:</strong> {new Date(transaction.createdAt.seconds * 1000).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {transaction.status}</p>
          </div>
        ))
      ) : (
        <p>No transactions yet.</p>
      )}
    </div>
  );
};

export default TransactionHistory;