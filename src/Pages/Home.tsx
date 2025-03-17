import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockCourses, Question } from '../mocks/course';
import { Review, Course } from './types';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import '../Styles/Home.css';

const ReviewCard: React.FC<{ review: Review, course: Course }> = ({ review, course }) => {
  return (
    <div className="course-card">
      <h3>
        <Link to={`/course/${review.courseId}`}>
          {review.courseId} | {course.name}
        </Link>
      </h3>
      <p className="course-description">{review.reviewText}</p>
    </div>
  );
};

const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  const course = mockCourses.find((c) => c.questions.some((q) => q.id === question.id));
  if (!course) return null;

  return (
    <div className="question-card">
      <h3>
        <Link to={`/course/${course.course_id}`}>
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
        <Link to={`/course/${course.course_id}`}>
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
    const fetchData = async () => {
      try {
        const questions: Question[] = mockCourses.flatMap((course) => course.questions);
        setAllQuestions(questions);

        const [coursesResponse, reviewsResponse] = await Promise.all([
          fetch('https://92f7-203-150-171-252.ngrok-free.app/api/courses/', {
            headers: new Headers({ "ngrok-skip-browser-warning": "69420" }),
          }),
          fetch('https://92f7-203-150-171-252.ngrok-free.app/api/reviews/', {
            headers: new Headers({ "ngrok-skip-browser-warning": "69420" }),
          }),
        ]);

        if (!coursesResponse.ok) throw new Error(`Courses API error: ${coursesResponse.status}`);
        if (!reviewsResponse.ok) throw new Error(`Reviews API error: ${reviewsResponse.status}`);

        const coursesData: Course[] = await coursesResponse.json();
        const reviewsData: Review[] = await reviewsResponse.json();

        setAllCourses(coursesData);
        setAllReviews(reviewsData);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredReviews = allReviews.filter((review) => {
    const course = allCourses.find((c) => c.course_id === review.courseId);
    if (!course) return false;
    return course.name.toLowerCase().includes(searchTerm.toLowerCase()) || review.courseId.toString().includes(searchTerm);
  });

  const filteredQuestions = allQuestions.filter((question) => {
/*     const course = allCourses.find((c) => c.course_id === question.courseId);
    if (!course) return false;
 */
    return (
/*       course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_id.toString().includes(searchTerm) || */
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
                filteredReviews.map((review) => {
                  const course = allCourses.find((c) => c.course_id === review.courseId);
                  if (!course) return null;
                  return <ReviewCard key={review.courseId} review={review} course={course} />;
                })
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