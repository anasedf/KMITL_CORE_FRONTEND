import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import ReviewDetail from '../Component/CourseReviews';
import QuestionDetail from '../Component/CourseQuestions';
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
  courseId: number;
}

interface Answer {
  id: number;
  answerText: string;
  AnswererName: string;
}

interface Question {
  id: number;
  questionText: string;
  questionerName: string;
  answers?: Answer[];
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

  // สำหรับการเพิ่มคำถาม
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [questionerName, setQuestionerName] = useState('');
  const [questionText, setQuestionText] = useState('');

  // Fetch course data from API
  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `https://92f7-203-150-171-252.ngrok-free.app/api/courses/${courseId}`,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      setCourse(response.data); // Update course state
    } catch (error) {
      console.error("Error fetching course:", error);
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
    return Math.round(totalScore / course.reviews.length);
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
    };

    try {
      await axios.post(
        `https://92f7-203-150-171-252.ngrok-free.app/api/reviews/`,
        newReview,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      await fetchCourse(); // Refresh course data after submitting review

      setIsModalOpen(false);
      setReviewerName('');
      setReviewText('');
      setHomeScore(0);
      setInterestScore(0);
      setGrade('');
      setAcademicYear('');
      setSection('');
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("เกิดข้อผิดพลาดในการส่งรีวิว กรุณาลองอีกครั้ง");
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    const newQuestion = {
      courseId: course?.course_id,
      questionerName,
      questionText,
    };

    try {
      await axios.post(
        `https://92f7-203-150-171-252.ngrok-free.app/api/questions/`,
        newQuestion,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      await fetchCourse(); // Refresh course data after submitting question

      setIsQuestionModalOpen(false);
      setQuestionerName('');
      setQuestionText('');
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("เกิดข้อผิดพลาดในการส่งคำถาม กรุณาลองอีกครั้ง");
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
          {course.image && (
            <img src={course.image} alt={course.name} className="course-image" />
          )}
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
              <button className="add-review-button" onClick={() => setIsModalOpen(true)}>รีวิววิชานี้</button>
            </div>
            {course.reviews.length > 0 ? (
              <ReviewDetail
                reviews={course.reviews}
                expandedReviewId={expandedReviewId}
                handleExpandReview={(reviewId: number) =>
                  setExpandedReviewId(expandedReviewId === reviewId ? null : reviewId)
                }
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
              <button
                className="add-question-button"
                onClick={() => setIsQuestionModalOpen(true)}
              >
                เพิ่มคำถาม
              </button>
            </div>
            {course.questions.length > 0 ? (
              <QuestionDetail
                questions={course.questions}
                courseId={course.course_id}
                fetchCourse={fetchCourse}
              />
            ) : (
              <p>ไม่มีคำถามสำหรับคอร์สนี้</p>
            )}
          </div>
        )}
      </main>
      <Footer />

      {/* Modal สำหรับเพิ่มรีวิว */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>เพิ่มรีวิว</h2>
            <form onSubmit={handleAddReview}>
              <div className="form-group">
                <label>ชื่อผู้รีวิว:</label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>รีวิว:</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>คะแนนงานและการบ้าน:</label>
                <input
                  type="number"
                  value={homeScore}
                  onChange={(e) => setHomeScore(Number(e.target.value))}
                  min="0"
                  max="10"
                  required
                />
              </div>
              <div className="form-group">
                <label>คะแนนความน่าสนใจ:</label>
                <input
                  type="number"
                  value={interestScore}
                  onChange={(e) => setInterestScore(Number(e.target.value))}
                  min="0"
                  max="10"
                  required
                />
              </div>
              <div className="form-group">
                <label>เกรดที่ได้:</label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>ปีการศึกษา:</label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Section:</label>
                <input
                  type="text"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  required
                />
              </div>
              <button type="submit">ส่งรีวิว</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                ยกเลิก
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal สำหรับเพิ่มคำถาม */}
      {isQuestionModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>เพิ่มคำถาม</h2>
            <form onSubmit={handleAddQuestion}>
              <div className="form-group">
                <label>ชื่อผู้ถาม:</label>
                <input
                  type="text"
                  value={questionerName}
                  onChange={(e) => setQuestionerName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>คำถาม:</label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                />
              </div>
              <button type="submit">ส่งคำถาม</button>
              <button type="button" onClick={() => setIsQuestionModalOpen(false)}>
                ยกเลิก
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;