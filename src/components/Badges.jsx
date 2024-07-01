import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthProvider';
import { FaMedal } from 'react-icons/fa';

const Badges = () => {
  const { currentUser } = useAuth();
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchUserBadges(currentUser.uid);
    }
  }, [currentUser]);

  const fetchUserBadges = async (uid) => {
    const db = getFirestore();
    const userDoc = doc(db, 'users', uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      setBadges(docSnap.data().badges || []);
    }
  };

  return (
    <div className="spacing-md">
      <h2 className="text-2xl mb-4">Your Badges</h2>
      <ul className="spacing-y-sm">
        {badges.map((badge, index) => (
          <li key={index} className="spacing-y-xs"><FaMedal /> {badge}</li>
        ))}
      </ul>
    </div>
  );
};

export default Badges;