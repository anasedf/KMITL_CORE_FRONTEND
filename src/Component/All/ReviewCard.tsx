import React from 'react';
import { Link } from 'react-router-dom';
import { Review, Course } from '../../mocks/types';

interface ReviewCardProps {
  review: Review;
  course: Course;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, course }) => {
  const createdAtDate = new Date(review.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString();
  const averageScore = (review.homeScore + review.interestScore) / 2;

  return (
    <div className="course-card">
      <h3>
        <Link to={`/course/${review.courseId}`}>
          {review.courseId} | {course.name}
          <br /> {/* เพิ่มบรรทัดใหม่หากต้องการให้อยู่คนละบรรทัดชัดเจน */}
          <span>{course.nameTH}</span>
        </Link>
        <div className="average-score-container">
          <span className="average-score-icon">★</span>
          <span className="average-score-value">{averageScore.toFixed(1)}</span>
        </div>
      </h3>
      <p className="review-detail">{review.reviewText}</p>
      <div className='review-buttom'>
        <span>โดย : {review.reviewerName}</span>
        <span>วันที่ : {formattedDate}</span>
      </div>
    </div>
  );
};

export default ReviewCard;