import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockCourses, Review, Question, Course } from '../mocks/course';
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

const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  const course = mockCourses.find((c) => c.questions.some((q) => q.id === question.id));
  if (!course) return null;

  return (
    <div className="question-card">
      <h3>
        <Link to={`/course/${course.id}`}>
          {course.course_id} | {course.name}
        </Link>
      </h3>
      <p className="question-text">{question.questionText}</p>
      {question.answers && question.answers.map((answer) => (
        <p key={answer.id} className="answer">Answer: {answer.answerText}</p>
      ))}
    </div>
  );
};

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="course-card">
      <h3>
        <Link to={`/course/${course.id}`}>
          {course.course_id} | {course.name}
        </Link>
      </h3>
      <p className="course-description">{course.description}</p>
    </div>
  );
};

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<'reviews' | 'questions' | 'courses'>('reviews');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const reviews: Review[] = mockCourses.flatMap((course) => course.reviews);
    const questions: Question[] = mockCourses.flatMap((course) => course.questions);
    setAllReviews(reviews);
    setAllQuestions(questions);

    fetch('https://fabe-203-150-171-252.ngrok-free.app/api/courses/', {
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType) {
          throw new Error('Response has no Content-Type header');
        } else if (!contentType.includes('application/json')) {
          return response.text().then((text) => {
            throw new Error(`Response is not JSON, Content-Type: ${contentType}, Body: ${text}`);
          });
        }
        return response.json();
      })
      .then((data: Course[]) => {
        setAllCourses(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const filteredReviews = allReviews.filter((review) => {
    const course = mockCourses.find((c) => c.reviews.some((r) => r.id === review.id));
    if (!course) return false;

    return (
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_id.toString().includes(searchTerm)
    );
  });

  const filteredQuestions = allQuestions.filter((question) => {
    const course = mockCourses.find((c) => c.questions.some((q) => q.id === question.id));
    if (!course) return false;

    return (
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_id.toString().includes(searchTerm) ||
      question.questionText.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredCourses = allCourses.filter((course) => {
    return (
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_id.toString().includes(searchTerm)
    );
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
            <li>
              <button onClick={() => setActiveTab('reviews')}>รีวิวทั้งหมด</button>
            </li>
            <li>
              <button onClick={() => setActiveTab('questions')}>คำถามทั้งหมด</button>
            </li>
            <li>
              <button onClick={() => setActiveTab('courses')}>Courses</button>
            </li>
          </ul>
        </nav>

        <div className="content-list">
          {activeTab === 'reviews' && (
            <div className="review-list">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <p className="no-reviews">No reviews found.</p>
              )}
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="question-list">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))
              ) : (
                <p className="no-questions">No questions found.</p>
              )}
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="course-list">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <CourseCard key={course.course_id} course={course} />
                ))
              ) : (
                <p className="no-courses">No courses found.</p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;