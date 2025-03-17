import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
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

interface Question {
  id: number;
  questionText: string;
  answers?: { id: number; answerText: string }[];
}

interface Course {
  id: number;
  course_id: number;
  name: string;
  description: string;
  image: string | null;
  reviews: Review[];
  questions: Question[];
}

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
  const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);
  const [showReviews, setShowReviews] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);

  // ดึงข้อมูลเฉพาะ course ที่ตรงกับ courseId
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://fabe-203-150-171-252.ngrok-free.app/api/courses/${courseId}`, {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        });
        setCourse(response.data);  // เก็บข้อมูล course ที่ตรงกับ courseId
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

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
          <p className="course-description">{course.description}</p>
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

        {showReviews && (
          <ReviewDetail
            reviews={course.reviews}
            expandedReviewId={expandedReviewId}
            handleExpandReview={handleExpandReview}
            openReviewModal={() => setIsModalOpen(true)}
          />
        )}

        {showQuestions && <QuestionDetail questions={course.questions} />}
      </main>
      <Footer />

      {isModalOpen && (
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
          handleAddReview={(e: React.FormEvent) => {
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
              setCourse(updatedCourse);
            }
            setIsModalOpen(false);
          }}
          closeReviewModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CourseDetail;
