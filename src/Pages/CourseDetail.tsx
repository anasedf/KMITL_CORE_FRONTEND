import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Component/Nav/Header';
import Footer from '../Component/Nav/Footer';
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

  const handleDeleteQuestion = async (questionId: number, passcodePin:string) => {
    try {
      await deleteQuestionById(questionId, passcodePin);
      await fetchCourse();
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('เกิดข้อผิดพลาดในการลบคำถาม กรุณาตรวจสอบ passcode และลองอีกครั้ง');
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <main className="course-detail">
        <div className="course-header">
          <h1>{course.name}</h1>
          <p className="course-description">{course.description}</p>
          {course.image && <img src={course.image} alt={course.name} className="course-image" />}
        </div>

        <div className="score-summary">
          <Link to="/" className="home-button">
            Home
          </Link>
          <h2>คะแนนภาพรวม</h2>
          <div className="score-bars">
            <div className="score-bar">
              <label>จำนวนงานและการบ้าน</label>
              <div className="bar">
                <div className="fill" style={{ width: `${homeScoreAverage}%` }}></div>
              </div>
              <span className="score">{homeScoreAverage}%</span>
            </div>
            <div className="score-bar">
              <label>ความน่าสนใจของเนื้อหา</label>
              <div className="bar">
                <div className="fill" style={{ width: `${interestScoreAverage}%` }}></div>
              </div>
              <span className="score">{interestScoreAverage}%</span>
            </div>
            <div className="score-bar">
              <label>การสอนของอาจารย์</label>
              <div className="bar">
                <div className="fill" style={{ width: `${(homeScoreAverage + interestScoreAverage) / 2}%` }}></div>
              </div>
              <span className="score">{(homeScoreAverage + interestScoreAverage) / 2}%</span>
            </div>
          </div>
        </div>

        <div className="toggle-sections">
          <button
            className={`toggle-button ${showReviews ? 'active' : ''}`}
            onClick={() => {
              setShowReviews(true);
              setShowQuestions(false);
            }}
          >
            รีวิวทั้งหมด
          </button>
          <button
            className={`toggle-button ${showQuestions ? 'active' : ''}`}
            onClick={() => {
              setShowReviews(false);
              setShowQuestions(true);
            }}
          >
            คำถามทั้งหมด
          </button>
        </div>

        {showReviews && (
          <div className="reviews-section">
            <div className="reviews-header">
              <h2>รีวิวทั้งหมด</h2>
              <button className="add-review-button" onClick={() => setIsModalOpen(true)}>
                รีวิววิชานี้
              </button>
            </div>
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
            <div className="questions-header">
              <h2>คำถามทั้งหมด</h2>
              <button className="add-question-button" onClick={() => setIsQuestionModalOpen(true)}>
                เพิ่มคำถาม
              </button>
            </div>
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