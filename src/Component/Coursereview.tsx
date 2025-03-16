import React from 'react';
import { mockReviews } from '../mocks/course';

// กำหนด interface สำหรับ Review
interface Review {
  id: number;
  rating: number;
  comment: string;
}

const CourseReview: React.FC = () => {
  return (
    <div>
      <h1>Reviews</h1>
      <ul>
        {mockReviews.map((review: Review) => ( // ระบุประเภทของ review
          <li key={review.id}>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseReview;