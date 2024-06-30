import React, { useEffect, useState } from 'react';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthProvider';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

const PointsSystem = () => {
  const { currentUser } = useAuth();
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (currentUser) {
      fetchUserPoints(currentUser.uid);
    }
  }, [currentUser]);

  const fetchUserPoints = async (uid) => {
    const db = getFirestore();
    const userDoc = doc(db, 'users', uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      setPoints(docSnap.data().points || 0);
    }
  };

  const addPoints = async (uid, pointsToAdd) => {
    const db = getFirestore();
    const userDoc = doc(db, 'users', uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      const newPoints = (docSnap.data().points || 0) + pointsToAdd;
      await updateDoc(userDoc, { points: newPoints });
      setPoints(newPoints);
      toast.success(`You've earned ${pointsToAdd} points!`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4"><FaStar /> Your Points: {points}</h2>
      <button onClick={() => addPoints(currentUser.uid, 10)}>Add 10 Points</button>
    </div>
  );
};

export default PointsSystem;