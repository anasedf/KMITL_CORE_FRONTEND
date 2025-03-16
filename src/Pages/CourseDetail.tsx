import React, { useState } from 'react';
import { useParams , Link } from 'react-router-dom';
import ReviewModal from '../Component/AddReviewForm';
import { mockCourses } from '../mocks/course';
import '../App.css';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = mockCourses.find((c) => c.id === Number(courseId));
  const [isLoggedIn, setIsLoggedIn] = useState(false); // สถานะการล็อกอิน
  const [isModalOpen, setIsModalOpen] = useState(false); // ควบคุมการแสดง modal

  // ฟังก์ชันล็อกอิน/ล็อกเอาท์
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // เปิด modal สำหรับรีวิว
  const openReviewModal = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      alert('Please login to review this course.');
    }
  };

  // เพิ่มรีวิว
  const handleAddReview = (review: { rating: number; comment: string }) => {
    if (course) {
      const updatedCourse = {
        ...course,
        reviews: [
          ...course.reviews,
          {
            id: course.reviews.length + 1, // สร้าง ID ใหม่
            ...review,
          },
        ],
      };
      // อัปเดตข้อมูลวิชาใน mockCourses (หรือส่งไปยัง backend)
      const updatedCourses = mockCourses.map((c) =>
        c.id === updatedCourse.id ? updatedCourse : c
      );
      // อัปเดต state หรือส่งข้อมูลไปยัง backend
      console.log('Updated Courses:', updatedCourses);
      setIsModalOpen(false); // ปิด modal หลังจากเพิ่มรีวิว
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
              <Link to="/"> Home </Link>
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
        <h1>{course.name}</h1>
        <img src={course.image} alt={course.name} />
        <p>{course.description}</p>

        <h2>Reviews</h2>
        <button onClick={openReviewModal}>Add Review</button>
        <div className="reviews">
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
      </main>

      <footer>
        <p>Contact us: info@kmitlclap.com</p>
        <p>&copy; 2023 KMITLCLAP. All rights reserved.</p>
      </footer>

      {/* Modal สำหรับรีวิว */}
      {isModalOpen && (
        <ReviewModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddReview}
        />
      )}
    </div>
  );
};

export default CourseDetail;