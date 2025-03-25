import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<'reviews' | 'questions' | 'courses'>('reviews');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredDropdownCourses, setFilteredDropdownCourses] = useState<Course[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesData, reviewsData, questionsData] = await Promise.all([
          fetchCourses(),
          fetchReviews(),
          fetchQuestions(),
        ]);

        const sortedReviews = reviewsData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const sortedQuestions = questionsData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        setAllCourses(coursesData);
        setAllReviews(sortedReviews);
        setAllQuestions(sortedQuestions);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDropdownCourses(allCourses);
      return;
    }

    const filtered = allCourses.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.nameTH.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_id.toString().includes(searchTerm)
    );

    setFilteredDropdownCourses(filtered);
  }, [searchTerm, allCourses]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterData = useCallback((items: any[]) => {
    return items.filter((item) => {
      const course = allCourses.find((c) => c.course_id === item.courseId);
      return course
        ? course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.nameTH.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.courseId.toString().includes(searchTerm)
        : false;
    });
  }, [allCourses, searchTerm]);

  const filteredReviews = useMemo(() => {
    return filterData(allReviews).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [allReviews, filterData]);

  const filteredQuestions = useMemo(() => {
    return filterData(allQuestions).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [allQuestions, filterData]);

  const filteredCourses = useMemo(() => {
    return allCourses.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.nameTH.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_id.toString().includes(searchTerm)
    );
  }, [allCourses, searchTerm]);

  return (
    <div>
      <Header />
      <main className="home">
        <div className="search-container" ref={searchRef}>
          <input
            type="text"
            placeholder="Search by course name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            className="search-box"
          />
          {showDropdown && filteredDropdownCourses.length > 0 && (
            <ul className="search-dropdown">
              {filteredDropdownCourses.map(course => (
                <li key={course.course_id} onClick={() => navigate(`/course/${course.course_id}`)}>
                  ({course.course_id}) {course.name} {course.nameTH}
                </li>
              ))}
            </ul>
          )}
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
                    {tab === 'reviews' ? 'รีวิว' : tab === 'questions' ? 'คำถาม' : 'วิชา'}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="content-list">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error-message">Error: {error}</p>
          ) : (
            <>
              {activeTab === 'reviews' && (
                <div className="review-list">
                  {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => {
                      const course = allCourses.find((c) => c.course_id === review.courseId);
                      return course ? <ReviewCard key={review.id} review={review} course={course} /> : null;
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