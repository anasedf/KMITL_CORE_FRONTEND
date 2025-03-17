import React from 'react';
import { Review } from '../mocks/course'; // ปรับ path ตามโครงสร้างไฟล์ของคุณ

interface ReviewDetailProps {
  reviews: Review[];
  expandedReviewId: number | null;
  handleExpandReview: (reviewId: number) => void;
}

const ReviewDetail: React.FC<ReviewDetailProps> = ({ reviews, expandedReviewId, handleExpandReview }) => {
  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h2>รีวิวทั้งหมด</h2>
      </div>
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <p className="review-text">{review.reviewText}</p>
              <p className="reviewer-info">โดย {review.reviewerName} ({review.grade})</p>
              <p className="reviewer-info">ปีการศึกษา {review.academicYear} section {review.section}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewDetail;