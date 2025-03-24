import React from 'react';
import { ReviewDetailProps } from '../../mocks/types';
import '../../Styles/ReviewDetail.css';

const ReviewDetail: React.FC<ReviewDetailProps> = ({
  reviews,
  expandedReviewId,
  handleExpandReview,
  handleDeleteReview,
}) => {
  return (
    <div className="re-list">
      {reviews.length > 0 ? (
        reviews.map((review) => {
          const createdAtDate = new Date(review.createdAt);
          const localCreatedAt = createdAtDate.toLocaleDateString();
          const averageScore = (review.homeScore + review.interestScore) / 2;

          return (
            <div key={review.id} className="re-card">
              <div className="top">
                <p>{localCreatedAt}</p>
                <div className="average-score-container">
                  <span className="average-score-icon">★</span>
                  <span className="average-score-value">{averageScore.toFixed(1)}</span>
                </div>
              </div>

              <div className="mid">
                <p>{review.reviewText}</p>
              </div>

              <div className="bot">
                <div className='name-grade'>
                  <p>{review.reviewerName}</p>
                  <p className="grade">{review.grade}</p>
                </div>

                <div
                  className="delete-review-button"
                  onClick={() => {
                    const passcode_pin = prompt('กรุณาใส่รหัสผ่าน (passcode_pin) เพื่อลบรีวิว');
                    if (passcode_pin) {
                      handleDeleteReview(review.id, passcode_pin);
                    }
                  }}
                >
                  🗑
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="no-reviews-message">No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewDetail;