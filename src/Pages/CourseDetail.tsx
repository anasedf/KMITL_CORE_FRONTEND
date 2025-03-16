// CourseDetail.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockCourses } from '../mocks/course';
import { Link } from 'react-router-dom';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import ReviewDetail from '../Component/CourseReviews';
import QuestionDetail from '../Component/CourseQuestions';
import ReviewForm from '../Component/ReviewForm';
import '../Styles/Coursedetail.css';

interface Review {
  id: number;
  reviewerName: string;
  reviewText: string;
  homeScore: number;
  interestScore: number;
  grade: string;
  academicYear: string;
  section: string;
}

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = mockCourses.find((c) => c.id === Number(courseId));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [homeScore, setHomeScore] = useState(0);
  const [interestScore, setInterestScore] = useState(0);
  const [grade, setGrade] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [section, setSection] = useState('');
  const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);
  const [showReviews, setShowReviews] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);

  const openReviewModal = () => setIsModalOpen(true);
  const closeReviewModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setReviewerName('');
    setReviewText('');
    setHomeScore(0);
    setInterestScore(0);
    setGrade('');
    setAcademicYear('');
    setSection('');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (course) {
      const newReview = {
        id: course.reviews.length + 1,
        reviewerName,
        reviewText,
        homeScore,
        interestScore,
        grade,
        academicYear,
        section,
      };
      const updatedCourse = {
        ...course,
        reviews: [...course.reviews, newReview],
      };
      console.log('Updated Course:', updatedCourse);
      closeReviewModal();
    }
  };

  if (!course) {
    return <div>Course not found</div>;
  }

  const calculateAverageScore = (scoreType: 'homeScore' | 'interestScore') => {
    if (!course.reviews.length) return 0;
    const totalScore = course.reviews.reduce((sum, review) => sum + review[scoreType], 0);
    return Math.round((totalScore / course.reviews.length) * 10);
  };

  const homeScoreAverage = calculateAverageScore('homeScore');
  const interestScoreAverage = calculateAverageScore('interestScore');

  const handleExpandReview = (reviewId: number) => {
    if (expandedReviewId === reviewId) {
      setExpandedReviewId(null);
    } else {
      setExpandedReviewId(reviewId);
    }
  };

  const handleShowReviews = () => {
    setShowReviews(true);
    setShowQuestions(false);
  };

  const handleShowQuestions = () => {
    setShowReviews(false);
    setShowQuestions(true);
  };

  return (
    <div>
      <Header />
      <main className="course-detail">
        <div className="course-header">
          <h1>{course.name}</h1>
          {/*           <img src={course.image} alt={course.name} className="course-image" />
 */}          <p className="course-description">{course.description}</p>
        </div>

        <div className="score-summary">
          <Link to="/" className="home-button">Home</Link>
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
            onClick={handleShowReviews}
          >
            รีวิวทั้งหมด
          </button>
          <button
            className={`toggle-button ${showQuestions ? 'active' : ''}`}
            onClick={handleShowQuestions}
          >
            คำถามทั้งหมด
          </button>
        </div>

        {
          showReviews && (
            <ReviewDetail
              reviews={course.reviews}
              expandedReviewId={expandedReviewId}
              handleExpandReview={handleExpandReview}
              openReviewModal={openReviewModal} // ส่ง prop ไปยัง ReviewDetail
            />
          )
        }

        {showQuestions && <QuestionDetail questions={course.questions} />}
      </main >
      <Footer />

      {
        isModalOpen && (
          <ReviewForm
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
            handleAddReview={handleAddReview}
            closeReviewModal={closeReviewModal}
          />
        )
      }
    </div >
  );
};

export default CourseDetail;