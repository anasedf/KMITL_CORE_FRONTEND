import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockCourses } from '../mocks/course';
import ReviewModal from '../Component/AddReviewForm'; 
import '../App.css';

const Home: React.FC = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // สถานะการล็อกอิน
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null); // เก็บ ID ของวิชาที่จะรีวิว
  const [isModalOpen, setIsModalOpen] = useState(false); // ควบคุมการแสดง modal

  // ฟังก์ชันล็อกอิน/ล็อกเอาท์
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // เปิด modal และตั้งค่า ID ของวิชาที่จะรีวิว
  const openReviewModal = (courseId: number) => {
    if (isLoggedIn) {
      setSelectedCourseId(courseId);
      setIsModalOpen(true);
    } else {
      alert('Please login to review this course.');
    }
  };

  // เพิ่มรีวิว
  const handleAddReview = (review: { rating: number; comment: string }) => {
    if (selectedCourseId !== null) {
      const updatedCourses = courses.map((course) => {
        if (course.id === selectedCourseId) {
          return {
            ...course,
            reviews: [
              ...course.reviews,
              {
                id: course.reviews.length + 1, // สร้าง ID ใหม่
                ...review,
              },
            ],
          };
        }
        return course;
      });
      setCourses(updatedCourses);
      setIsModalOpen(false); // ปิด modal หลังจากเพิ่มรีวิว
    }
  };

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
              <button onClick={handleLogin}>
                {isLoggedIn ? 'Logout' : 'Login'}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <h2>Courses</h2>
        <div className="course-list">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <img src={course.image} alt={course.name} />
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <button onClick={() => openReviewModal(course.id)}>Review</button>
              <Link to={`/course/${course.id}`}>View Details</Link>
              {/* แสดงรีวิวของวิชา */}
              <div className="reviews">
                <h4>Reviews:</h4>
                {course.reviews.length > 0 ? (
                  course.reviews.map((review) => (
                    <div key={review.id} className="review">
                      <p>Rating: {review.rating}</p>
                      <p>Comment: {review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>Contact us: info@kmitlclap.com</p>
        <p>&copy; 2023 KMITLCLAP. All rights reserved.</p>
      </footer>

      {/* Modal สำหรับรีวิว */}
      {isModalOpen && selectedCourseId !== null && (
        <ReviewModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddReview}
        />
      )}
    </div>
  );
};

export default Home;