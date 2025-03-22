import React from 'react';
import { ReviewDetailProps } from '../../mocks/types';
import '../../Styles/Coursereview.css';

const ReviewDetail: React.FC<ReviewDetailProps> = ({
  reviews,
  expandedReviewId,
  handleExpandReview,
  handleDeleteReview,
}) => {
  return (
    <div className="reviews-section">
      <div className="reviews-header"></div>
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-text-container">
                <p className="review-text">{review.reviewText}</p>
              </div>
              <p className="reviewer-info">
                โดย {review.reviewerName} ({review.grade})
              </p>
              <p className="reviewer-info">
                ปีการศึกษา {review.academicYear} section {review.section}
              </p>

              <button
                className="delete-review-button"
                onClick={() => {
                  const passcode_pin = prompt('กรุณาใส่รหัสผ่าน (passcode_pin) เพื่อลบรีวิว');
                  if (passcode_pin) {
                    handleDeleteReview(review.id, passcode_pin);
                  }
                }}
              >
                ลบรีวิว
              </button>
            </div>
          ))
        ) : (
          <p className="no-reviews-message">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewDetail;