import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockCourses } from '../mocks/course';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import '../Coursedetail.css';

interface Review {
  id: number;
  reviewerName: string;
  reviewText: string;
  homeScore: number;
  interestScore: number;
  grade: string;
  academicYear: string;
  section: string;
}

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = mockCourses.find((c) => c.id === Number(courseId));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [homeScore, setHomeScore] = useState(0);
  const [interestScore, setInterestScore] = useState(0);
  const [grade, setGrade] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [section, setSection] = useState('');

  // เปิด modal สำหรับรีวิว
  const openReviewModal = () => {
    setIsModalOpen(true);
  };

  // ปิด modal สำหรับรีวิว
  const closeReviewModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // รีเซ็ตฟอร์ม
  const resetForm = () => {
    setReviewerName('');
    setReviewText('');
    setHomeScore(0);
    setInterestScore(0);
    setGrade('');
    setAcademicYear('');
    setSection('');
  };

  // เพิ่มรีวิว
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (course) {
      const newReview = {
        id: course.reviews.length + 1,
        reviewerName,
        reviewText,
        homeScore,
        interestScore,
        grade,
        academicYear,
        section,
      };
      const updatedCourse = {
        ...course,
        reviews: [...course.reviews, newReview],
      };
      console.log('Updated Course:', updatedCourse);
      closeReviewModal();
    }
  };

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <Header />
      <main className="course-detail">
        <h1>{course.name}</h1>
        <img src={course.image} alt={course.name} />
        <p>{course.description}</p>

        <h2>Reviews</h2>
        <button className="add-review-button" onClick={openReviewModal}>
          Add Review
        </button>

        {/* แสดงรีวิวของวิชา */}
        <div className="reviews">
          {course.reviews.length > 0 ? (
            course.reviews.map((review) => (
              <div key={review.id} className="review">
                <p><strong>Reviewer:</strong> {review.reviewerName}</p>
                <p><strong>Review:</strong> {review.reviewText}</p>
                <p><strong>Home Score:</strong> {review.homeScore}</p>
                <p><strong>Interest Score:</strong> {review.interestScore}</p>
                <p><strong>Grade:</strong> {review.grade}</p>
                <p><strong>Academic Year:</strong> {review.academicYear}</p>
                <p><strong>Section:</strong> {review.section}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </main>
      <Footer />

      {/* Modal สำหรับรีวิว */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Review</h2>
            <form onSubmit={handleAddReview}>
              <div>
                <label>Reviewer Name:</label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Review Text:</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Home Score:</label>
                <input
                  type="number"
                  value={homeScore}
                  onChange={(e) => setHomeScore(Number(e.target.value))}
                  min="0"
                  max="10"
                  required
                />
              </div>
              <div>
                <label>Interest Score:</label>
                <input
                  type="number"
                  value={interestScore}
                  onChange={(e) => setInterestScore(Number(e.target.value))}
                  min="0"
                  max="10"
                  required
                />
              </div>
              <div>
                <label>Grade:</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                >
                  <option value="">Select Grade</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
              <div>
                <label>Academic Year:</label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Section:</label>
                <input
                  type="text"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Submit</button>
              <button type="button" onClick={closeReviewModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;