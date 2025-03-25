import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Component/Nav/Header';
import Footer from '../Component/Nav/Footer';
import Bar from '../Component/Nav/Bar';
import ReviewDetail from '../Component/Course/ReviewDetail';
import QuestionDetail from '../Component/Course/QuestionDetail';
import ReviewModal from '../Component/Course/ReviewModal';
import QuestionModal from '../Component/Course/QuestionModal';
import { Review, Course, Question } from '../mocks/types';
import '../Styles/Coursedetail.css';
import {
  fetchCourseById,
  postReview,
  postQuestion,
  deleteReviewById,
  deleteQuestionById,
} from '../services/api';
import { FaHome, FaPencilAlt, FaQuestionCircle } from 'react-icons/fa';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [homeScore, setHomeScore] = useState(0);
  const [interestScore, setInterestScore] = useState(0);
  const [grade, setGrade] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [section, setSection] = useState('');
  const [passcodePin, setPasscodePin] = useState('');
  const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);
  const [showReviews, setShowReviews] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);

  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [questionerName, setQuestionerName] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [questionPasscodePin, setQuestionPasscodePin] = useState('');

  const fetchCourse = async () => {
    try {
      const data = await fetchCourseById(courseId);
      setCourse(data);
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const calculateAverageScore = (scoreType: 'homeScore' | 'interestScore') => {
    if (!course?.reviews.length) return 0;
    const totalScore = course.reviews.reduce((sum, review) => sum + review[scoreType], 0);
    const averageScore = totalScore / course.reviews.length;
    return Math.round((averageScore / 5) * 100);
  };

  const homeScoreAverage = calculateAverageScore('homeScore');
  const interestScoreAverage = calculateAverageScore('interestScore');

  const calculateOverall = () => {
    if (!course?.reviews.length) return 0;
    const totalHomeScore = course.reviews.reduce((sum, review) => sum + review.homeScore, 0);
    const totalInterestScore = course.reviews.reduce((sum, review) => sum + review.interestScore, 0);
    const averageHomeScore = totalHomeScore / course.reviews.length;
    const averageInterestScore = totalInterestScore / course.reviews.length;
    const overallAverage = (averageHomeScore + averageInterestScore) / 2;
    return overallAverage.toFixed(1);
  };

  const overallRating = calculateOverall();

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const newReview = {
      courseId: course?.course_id,
      reviewerName,
      reviewText,
      homeScore,
      interestScore,
      grade,
      academicYear,
      section,
      passcode_pin: passcodePin,
    };

    try {
      await postReview(newReview);
      await fetchCourse();
      setIsModalOpen(false);
      setReviewerName('');
      setReviewText('');
      setHomeScore(0);
      setInterestScore(0);
      setGrade('');
      setAcademicYear('');
      setSection('');
      setPasscodePin('');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('เกิดข้อผิดพลาดในการส่งรีวิว กรุณาลองอีกครั้ง');
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    const newQuestion = {
      courseId: course?.course_id,
      questionerName,
      questionText,
      passcode_pin: questionPasscodePin,
    };

    try {
      await postQuestion(newQuestion);
      await fetchCourse();
      setIsQuestionModalOpen(false);
      setQuestionerName('');
      setQuestionText('');
      setQuestionPasscodePin('');
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('เกิดข้อผิดพลาดในการส่งคำถาม กรุณาลองอีกครั้ง');
    }
  };

  const handleDeleteReview = async (reviewId: number, passcodePin: string) => {
    try {
      await deleteReviewById(reviewId, passcodePin);
      await fetchCourse();
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('เกิดข้อผิดพลาดในการลบรีวิว กรุณาตรวจสอบ passcode และลองอีกครั้ง');
    }
  };

  const handleDeleteQuestion = async (questionId: number, passcodePin: string) => {
    try {
      await deleteQuestionById(questionId, passcodePin);
      await fetchCourse();
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('เกิดข้อผิดพลาดในการลบคำถาม กรุณาตรวจสอบ passcode และลองอีกครั้ง');
    }
  };

  if (!course) {
    return <div></div>;
  }

  return (
    <div>
      <Bar />
      <main className="course-detail">

        <div className='Tab'>
          <Link to="/" className="home-button">
            <span className="button-text">Home</span>
            <div className="icon">🏠︎</div>
          </Link>
          <div className='add'>
            <div className="home-button" onClick={() => setIsModalOpen(true)}>
              <span className="button-text">เขียนรีวิว</span>
              <div className="icon">✎</div>
            </div>
            <div className="home-button" onClick={() => setIsQuestionModalOpen(true)}>
              <span className="button-text">เขียนคำถาม</span>
              <div className="icon">?</div>
            </div>
          </div>
        </div>

        <div className='course-info'>

          <div className="course-header">
            <div className='info'>
              <a>{course.course_id} | {course.nameTH}</a>
              <h1>{course.name}</h1>
              <p className="course-description">{course.description}</p>
            </div>
            <div className='rate'>
              {overallRating} ★
              <span>OVERALL</span>
            </div>
          </div>

          <div className="score-summary">
            <h2>คะแนนภาพรวม</h2>
            <div className="score-bars">
              <div className="score-bar">
                <label>จำนวนงานและการบ้าน</label>
                <div className="scale">
                  <div className="fill" style={{ width: `${homeScoreAverage}%` }}></div>
                </div>
                <span className="score">{homeScoreAverage}%</span>
              </div>
              <div className="score-bar">
                <label>ความน่าสนใจของเนื้อหา</label>
                <div className="scale">
                  <div className="fill" style={{ width: `${interestScoreAverage}%` }}></div>
                </div>
                <span className="score">{interestScoreAverage}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="toggle-sections">
          <div
            className={`toggle-button ${showReviews ? 'active' : ''}`}
            onClick={() => {
              setShowReviews(true);
              setShowQuestions(false);
            }}
          >
            รีวิวทั้งหมด
          </div>
          <div
            className={`toggle-button ${showQuestions ? 'active' : ''}`}
            onClick={() => {
              setShowReviews(false);
              setShowQuestions(true);
            }}
          >
            คำถามทั้งหมด
          </div>
        </div>

        {showReviews && (
          <div className="reviews-section">
            {course.reviews.length > 0 ? (
              <ReviewDetail
                reviews={course.reviews}
                expandedReviewId={expandedReviewId}
                handleExpandReview={(reviewId) => setExpandedReviewId(expandedReviewId === reviewId ? null : reviewId)}
                handleDeleteReview={handleDeleteReview}
              />
            ) : (
              <p>ไม่มีรีวิวสำหรับคอร์สนี้</p>
            )}
          </div>
        )}

        {showQuestions && (
          <div className="questions-section">
            {course.questions.length > 0 ? (
              <QuestionDetail questions={course.questions} courseId={course.course_id} fetchCourse={fetchCourse} handleDeleteQuestion={handleDeleteQuestion} />
            ) : (
              <p>ไม่มีคำถามสำหรับคอร์สนี้</p>
            )}
          </div>
        )}
      </main>
      <Footer />

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddReview}
        reviewerName={reviewerName}
        setReviewerName={setReviewerName}
        reviewText={reviewText}
        setReviewText={setReviewText}
        homeScore={homeScore}
        setHomeScore={setHomeScore}
        interestScore={interestScore}
        setInterestScore={setInterestScore}
        grade={grade}
        setGrade={setGrade}
        academicYear={academicYear}
        setAcademicYear={setAcademicYear}
        section={section}
        setSection={setSection}
        passcodePin={passcodePin}
        setPasscodePin={setPasscodePin}
      />

      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        onSubmit={handleAddQuestion}
        questionerName={questionerName}
        setQuestionerName={setQuestionerName}
        questionText={questionText}
        setQuestionText={setQuestionText}
        questionPasscodePin={questionPasscodePin}
        setQuestionPasscodePin={setQuestionPasscodePin}
      />
    </div>
  );
};

export default CourseDetail;