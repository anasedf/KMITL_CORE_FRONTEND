import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Review, Course, Question } from '../mocks/types';
import Header from '../Component/Nav/Header';
import Footer from '../Component/Nav/Footer';
import Bar from '../Component/Nav/Bar';
import ReviewCard from '../Component/Home/ReviewCard';
import QuestionCard from '../Component/Home/QuestionCard';
import CourseCard from '../Component/Home/CourseCard';
import '../Styles/Home.css';
import { fetchCourses, fetchReviews, fetchQuestions } from '../services/api';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<'reviews' | 'questions' | 'courses'>('reviews');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesData, reviewsData, questionsData] = await Promise.all([
          fetchCourses(),
          fetchReviews(),
          fetchQuestions(),
        ]);

        setAllCourses(coursesData);
        setAllReviews(reviewsData);
        setAllQuestions(questionsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterData = useCallback((items: any[], key: string) => {
    return items.filter((item) => {
      const course = allCourses.find((c) => c.course_id === item.courseId);
      return course 
        ? course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.nameTH.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.courseId.toString().includes(searchTerm)
        : false;
    });
  }, [allCourses, searchTerm]);

  const filteredReviews = useMemo(() => filterData(allReviews, 'review'), [allReviews, filterData]);
  const filteredQuestions = useMemo(() => filterData(allQuestions, 'question'), [allQuestions, filterData]);
  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.nameTH.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_id.toString().includes(searchTerm)
    );
  }, [allCourses, searchTerm]);

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

        <div className="Nav-con">
          <nav>
            <ul>
              {['reviews', 'questions', 'courses'].map((tab) => (
                <li key={tab}>
                  <button 
                    onClick={() => setActiveTab(tab as any)}
                    className={activeTab === tab ? 'active' : ''}
                  >
                    {tab === 'reviews' ? 'รีวิว' : tab === 'questions' ? 'คำถาม' : 'วิชาทั้งหมด'}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="content-list">
          {loading ? <p></p> : error ? <p className="error-message">Error: {error}</p> : (
            <>
              {activeTab === 'reviews' && (
                <div className="review-list">
                  {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => {
                      const course = allCourses.find((c) => c.course_id === review.courseId);
                      return course ? <ReviewCard key={review.courseId} review={review} course={course} /> : null;
                    })
                  ) : <p className="no-reviews">No reviews found.</p>}
                </div>
              )}

              {activeTab === 'questions' && (
                <div className="question-list">
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question) => (
                      <QuestionCard key={question.id} question={question} courses={allCourses} />
                    ))
                  ) : <p className="no-questions">No questions found.</p>}
                </div>
              )}

              {activeTab === 'courses' && (
                <div className="course-list">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <CourseCard key={course.course_id} course={course} />
                    ))
                  ) : <p className="no-courses">No courses found.</p>}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
