import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { FaStar } from 'react-icons/fa';

const ReviewList = ({ serviceId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const db = getFirestore();
      const q = query(collection(db, 'reviews'), where('serviceId', '==', serviceId));
      const querySnapshot = await getDocs(q);
      const reviewsData = querySnapshot.docs.map(doc => doc.data());
      setReviews(reviewsData);
    };

    fetchReviews();
  }, [serviceId]);

  return (
    <div className="spacing-md">
      <h2 className="text-2xl mb-4"><FaStar /> Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="mb-4 p-4 border rounded spacing-y-xs">
            <p><strong>Rating:</strong> {review.rating}</p>
            <p><strong>Comment:</strong> {review.comment}</p>
            <p><strong>Date:</strong> {new Date(review.createdAt.seconds * 1000).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewList;