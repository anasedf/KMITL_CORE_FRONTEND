import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockCourses, Review } from '../mocks/course';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import '../Styles/Home.css';

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const course = mockCourses.find((c) => c.reviews.some((r) => r.id === review.id));
  if (!course) return null;

  return (
    <div className="review-card">
      <h3>
        <Link to={`/course/${course.id}`}>
          {course.course_id} | {course.name}
        </Link>
      </h3>
      <p className="review-text">{review.reviewText}</p>
      <p className="reviewer-name">By: {review.reviewerName}</p>
    </div>
  );
};

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allReviews, setAllReviews] = useState<Review[]>([]);

  useEffect(() => {
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
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by course name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-box"
          />
        </div>

        <nav>
          <ul>
            <li><Link to="/">รีวิวทั้งหมด</Link></li>
            <li><Link to="/questions">คำถามทั้งหมด</Link></li>
          </ul>
        </nav>

        <div className="review-list">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <p className="no-reviews">No reviews found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;