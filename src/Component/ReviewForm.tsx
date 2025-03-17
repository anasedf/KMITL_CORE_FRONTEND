import React from 'react';

interface ReviewFormProps {
  reviewerName: string;
  setReviewerName: (name: string) => void;
  reviewText: string;
  setReviewText: (text: string) => void;
  homeScore: number;
  setHomeScore: (score: number) => void;
  interestScore: number;
  setInterestScore: (score: number) => void;
  grade: string;
  setGrade: (grade: string) => void;
  academicYear: string;
  setAcademicYear: (year: string) => void;
  section: string;
  setSection: (section: string) => void;
  handleAddReview: (e: React.FormEvent) => void;
  closeReviewModal: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  reviewerName,
  setReviewerName,
  reviewText,
  setReviewText,
  homeScore,
  setHomeScore,
  interestScore,
  setInterestScore,
  grade,
  setGrade,
  academicYear,
  setAcademicYear,
  section,
  setSection,
  handleAddReview,
  closeReviewModal,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Review</h2>
        <form onSubmit={handleAddReview}>
          <div className="form-group">
            <label>Reviewer Name:</label>
            <input
              type="text"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Review Text:</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Home Score:</label>
            <input
              type="number"
              value={homeScore}
              onChange={(e) => setHomeScore(Number(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label>Interest Score:</label>
            <input
              type="number"
              value={interestScore}
              onChange={(e) => setInterestScore(Number(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label>Grade:</label>
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Academic Year:</label>
            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Section:</label>
            <input
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit Review</button>
          <button type="button" onClick={closeReviewModal}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;