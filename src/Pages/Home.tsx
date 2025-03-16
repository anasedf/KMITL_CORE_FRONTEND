import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockCourses, Review } from '../mocks/course';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import '../Styles/Home.css';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allReviews, setAllReviews] = useState<Review[]>([]);

  useEffect(() => {
    // ดึงรีวิวทั้งหมดจาก mockCourses
    const reviews: Review[] = mockCourses.flatMap((course) => course.reviews);
    setAllReviews(reviews);
  }, []);

  const filteredReviews = allReviews.filter((review) => {
    const course = mockCourses.find((c) => c.reviews.some((r) => r.id === review.id));
    if (!course) return false;

    return (
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_id.toString().includes(searchTerm)
    );
  });

  return (
    <div>
      <Header />
      <main className="home">
        <h2>Courses and Reviews</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by course name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-box"
          />
        </div>

        <div className="course-list">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => {
              const course = mockCourses.find((c) => c.reviews.some((r) => r.id === review.id));
              if (!course) return null;

              return (
                <div key={review.id} className="course-card">
                  <h3>
                    <Link to={`/course/${course.id}`}>
                      {course.course_id} | {course.name}
                    </Link>
                  </h3>
                  <p>{review.reviewText}</p>
                  <p>By: {review.reviewerName}</p>
                </div>
              );
            })
          ) : (
            <p>No reviews found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;