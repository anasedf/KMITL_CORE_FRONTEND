import React, { useState, useEffect } from 'react';
import { Review, Course, Question } from '../mocks/types';
import Header from '../Component/Nav/Header';
import Footer from '../Component/Nav/Footer';
import ReviewCard from '../Component/All/ReviewCard';
import QuestionCard from '../Component/All/QuestionCard';
import CourseCard from '../Component/All/CourseCard';
import '../Styles/Home.css';


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
        const [coursesResponse, reviewsResponse, questionsResponse] = await Promise.all([
          fetch('https://92f7-203-150-171-252.ngrok-free.app/api/courses/', {
            headers: new Headers({ "ngrok-skip-browser-warning": "69420" }),
          }),
          fetch('https://92f7-203-150-171-252.ngrok-free.app/api/reviews/', {
            headers: new Headers({ "ngrok-skip-browser-warning": "69420" }),
          }),
          fetch('https://92f7-203-150-171-252.ngrok-free.app/api/questions/', {
            headers: new Headers({ "ngrok-skip-browser-warning": "69420" }),
          }),
        ]);

        if (!coursesResponse.ok) {
          throw new Error(`Courses API error: ${coursesResponse.status}`);
        }
        if (!reviewsResponse.ok) {
          throw new Error(`Reviews API error: ${reviewsResponse.status}`);
        }
        if (!questionsResponse.ok) {
          throw new Error(`Questions API error: ${questionsResponse.status}`);
        }

        const coursesData: Course[] = await coursesResponse.json();
        const reviewsData: Review[] = await reviewsResponse.json();
        const questionsData: Question[] = await questionsResponse.json();

        setAllCourses(coursesData);
        setAllReviews(reviewsData);
        setAllQuestions(questionsData);
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
    const course = allCourses.find((c) => c.course_id === question.courseId);
    if (!course) return false;
    return course.name.toLowerCase().includes(searchTerm.toLowerCase()) || question.courseId.toString().includes(searchTerm);
  });

  const filteredCourses = allCourses.filter((course) => {
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

        <div className='Nav-con'>
          <nav>
            <ul>
              <li>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={activeTab === 'reviews' ? 'active' : ''}
                >
                  รีวิวทั้งหมด
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('questions')}
                  className={activeTab === 'questions' ? 'active' : ''}
                >
                  คำถามทั้งหมด
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('courses')}
                  className={activeTab === 'courses' ? 'active' : ''}
                >
                  Courses
                </button>
              </li>
            </ul>
          </nav>
        </div>


        <div className="content-list">
          {loading && <p>Loading...</p>}
          {error && <p className="error-message">Error: {error.message}</p>}

          {!loading && !error && activeTab === 'reviews' && (
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

          {!loading && !error && activeTab === 'questions' && (
            <div className="question-list">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question) => (
                  <QuestionCard key={question.id} question={question} courses={allCourses} />
                ))
              ) : (
                <p className="no-questions">No questions found.</p>
              )}
            </div>
          )}

          {!loading && !error && activeTab === 'courses' && (
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