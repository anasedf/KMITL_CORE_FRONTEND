import React, { useState } from 'react';
import { useParams ,Link } from 'react-router-dom';
import { mockCourses } from '../mocks/course';
import '../App.css';

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
  const [newReview, setNewReview] = useState<Review>({
    id: 0,
    reviewerName: '',
    reviewText: '',
    homeScore: 0,
    interestScore: 0,
    grade: '',
    academicYear: '',
    section: '',
  });

  // เปิด modal สำหรับรีวิว
  const openReviewModal = () => {
    setIsModalOpen(true);
  };

  // ปิด modal สำหรับรีวิว
  const closeReviewModal = () => {
    setIsModalOpen(false);
    setNewReview({
      id: 0,
      reviewerName: '',
      reviewText: '',
      homeScore: 0,
      interestScore: 0,
      grade: '',
      academicYear: '',
      section: '',
    });
  };

  // เพิ่มรีวิว
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (course) {
      const updatedCourse = {
        ...course,
        reviews: [
          ...course.reviews,
          {
            ...newReview,
            id: course.reviews.length + 1,
          },
        ],
      };
      // อัปเดตข้อมูลวิชา (หรือส่งไปยัง backend)
      console.log('Updated Course:', updatedCourse);
      closeReviewModal();
    }
  };

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <header>
        <h1>KMITLCLAP</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <h1>{course.name}</h1>
        <img src={course.image} alt={course.name} />
        <p>{course.description}</p>

        <h2>Reviews</h2>
        <button onClick={openReviewModal}>Add Review</button>

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

      <footer>
        <p>Contact us: info@kmitlclap.com</p>
        <p>&copy; 2023 KMITLCLAP. All rights reserved.</p>
      </footer>

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
                  value={newReview.reviewerName}
                  onChange={(e) => setNewReview({ ...newReview, reviewerName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Review Text:</label>
                <textarea
                  value={newReview.reviewText}
                  onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Home Score:</label>
                <input
                  type="number"
                  value={newReview.homeScore}
                  onChange={(e) => setNewReview({ ...newReview, homeScore: Number(e.target.value) })}
                  min="0"
                  max="10"
                  required
                />
              </div>
              <div>
                <label>Interest Score:</label>
                <input
                  type="number"
                  value={newReview.interestScore}
                  onChange={(e) => setNewReview({ ...newReview, interestScore: Number(e.target.value) })}
                  min="0"
                  max="10"
                  required
                />
              </div>
              <div>
                <label>Grade:</label>
                <select
                  value={newReview.grade}
                  onChange={(e) => setNewReview({ ...newReview, grade: e.target.value })}
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
                  value={newReview.academicYear}
                  onChange={(e) => setNewReview({ ...newReview, academicYear: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Section:</label>
                <input
                  type="text"
                  value={newReview.section}
                  onChange={(e) => setNewReview({ ...newReview, section: e.target.value })}
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