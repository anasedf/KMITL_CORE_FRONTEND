import React from 'react';
import { useParams , Link  } from 'react-router-dom';
import { mockCourses } from '../mocks/course';
import '../App.css';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = mockCourses.find((c) => c.id === Number(courseId));

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
        {/* แสดงรูปภาพ */}
        <img src={course.image} alt={course.name} />
        <p>{course.description}</p>

        <h2>Reviews</h2>
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
    </div>
  );
};

export default CourseDetail;