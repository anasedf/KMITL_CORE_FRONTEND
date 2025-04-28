import React from 'react';
import { ReviewDetailProps } from '../../mocks/types';
import '../../Styles/course/ReviewDetail.css';

const ReviewDetail: React.FC<ReviewDetailProps> = ({
  reviews,
  expandedReviewId,
  handleExpandReview,
  handleDeleteReview,
}) => {

  const sortedReviews = [...reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="re-list">
      {sortedReviews.length > 0 ? ( 
        sortedReviews.map((review) => {
          const createdAtDate = new Date(review.createdAt);
          const localCreatedAt = createdAtDate.toLocaleDateString();
          const averageScore = (review.homeScore + review.interestScore) / 2;

          return (
            <div key={review.id} className="re-card">

              <div className="top">
                <div className='name-grade'>
                  <p>{review.reviewerName}</p>
                  <div className='grade'>
                    <p>{review.grade}</p>
                  </div>
                </div>

                <div className='rate-delete'>
                  <div className="average-score-container">
                    <span className="average-score-icon">★</span>
                    <span className="average-score-value">{averageScore.toFixed(1)}</span>/5
                  </div>
                  <div
                    className="delete-button"
                    onClick={() => {
                      const passcode_pin = prompt('กรุณาใส่รหัสผ่าน (passcode_pin) เพื่อลบรีวิว');
                      if (passcode_pin) {
                        handleDeleteReview(review.id, passcode_pin);
                      }
                    }}
                  >
                    🗙
                  </div>
                </div>
              </div>

              <div className="mid">
                <p>{review.reviewText}</p>
              </div>

              <div className="bot">
                <p>{localCreatedAt}</p>
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